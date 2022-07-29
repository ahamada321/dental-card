const { normalizeErrors } = require("./helpers/mongoose");
const Booking = require("./models/booking");
const Payment = require("./models/payment");
const Rental = require("./models/rental");
const User = require("./models/user");
const moment = require("moment-timezone");

const config = require("../../config");

exports.createBooking = function (req, res) {
  // Passed booking information from booking.component.ts
  const user = res.locals.user;
  const {
    startAt,
    courseType,
    courseTime,
    place,
    memo,
    rental, // Room
    status,
  } = req.body;

  const booking = new Booking({
    // startAt: moment(Object.assign(startAt, lessonDate)).subtract(1, 'months'),
    startAt: moment(startAt),
    courseType,
    courseTime,
    place,
    memo,
    user, // Patient
    rental, // Room
    status,
  });

  Rental.findById(rental._id)
    .populate("bookings")
    .populate("user", "id")
    .exec(function (err, foundRental) {
      if (err) {
        return res.status(422).send({ errors: normalizeErrors(err.errors) });
      }

      if (foundRental.user.id !== user.id) {
        return res.status(422).send({
          errors: [
            {
              title: "Invalid user!",
              detail: "Not allowed to create other teachers student report!",
            },
          ],
        });
      }

      if (!isValidBooking(booking, foundRental.bookings)) {
        return res.status(422).send({
          errors: [
            {
              title: "Invalid booking!",
              detail: "Chosed dates are already taken!",
            },
          ],
        });
      }

      if (booking.courseType === "対面レッスン（体験）") {
        booking.teacherRevenue = 3000;
      } else if (booking.courseType === "対面レッスン（60分）") {
        booking.teacherRevenue = user.hourlyPrice + receiptPrice + transportFee;
      } else if (booking.courseType === "対面レッスン（40分）") {
        booking.teacherRevenue =
          user.hourlyPrice * 0.7 + receiptPrice + transportFee;
      } else if (booking.courseType === "オンライン（体験）") {
        booking.teacherRevenue = 1500;
      } else if (booking.courseType === "オンライン（60分）") {
        booking.teacherRevenue =
          user.hourlyPrice + receiptPrice + transportFee - 500;
      } else if (booking.courseType === "オンライン（40分）") {
        booking.teacherRevenue =
          user.hourlyPrice * 0.7 + receiptPrice + transportFee - 500;
      } else {
        booking.teacherRevenue = receiptPrice + transportFee; // Expense only
      }

      booking.rental = foundRental;
      foundRental.bookings.push(booking); // This updates DB side.
      foundRental.user.bookings.push(booking); // This updates DB side.
      foundRental.save();
      User.updateOne({ _id: user.id }, { $push: { bookings: booking } });

      booking.save(function (err) {
        if (err) {
          return res.status(422).send({ errors: normalizeErrors(err.errors) });
        }

        foundRental.save();
        User.updateOne(
          { _id: user.id },
          { $push: { bookings: booking } },
          function () {}
        );
        return res.json({ startAt: booking.startAt, endAt: booking.endAt });
      });
    });
};

exports.getBookingById = function (req, res) {
  const user = res.locals.user;

  Booking.findById(req.params.id).exec(function (err, foundBooking) {
    if (err) {
      return res.status(422).send({
        errors: {
          title: "No Booking found!",
          detail: "Could not find Booking!",
        },
      });
    }
    return res.json(foundBooking);
  });
};

exports.deleteBooking = function (req, res) {
  const user = res.locals.user;

  Booking.findById(req.params.id)
    .populate("user")
    .populate("rental")
    // .populate('payment', '_id')
    // .populate('startAt')
    .exec(function (err, foundBooking) {
      if (err) {
        return res.status(422).send({ errors: normalizeErrors(err.errors) });
      }
      // if(foundBooking.user.id !== user.id) {
      //     return res.status(422).send({errors: [{title: "Invalid request!", detail: "You cannot delete other users booking!"}]})
      // }
      // if(foundBooking.status === 'active') {
      //     return res.status(422).send({errors: [{title: "Invalid request!", detail: "Cannot delete active booking!"}]})
      // }

      foundBooking.remove(function (err) {
        if (err) {
          return res.status(422).send({ errors: normalizeErrors(err.errors) });
        }
        Rental.updateOne(
          { _id: foundBooking.rental.id },
          { $pull: { bookings: foundBooking.id } },
          () => {}
        ); // Delete Booking from Rental
        User.updateOne(
          { _id: foundBooking.user.id },
          { $pull: { bookings: foundBooking.id } },
          () => {}
        ); // Delete Booking from User
        // Payment.updateOne({_id: foundBooking.payment.id}, {status: 'canseled by user'}, ()=>{})
        return res.json({ status: "deleted" });
      });
    });
};

exports.updateBooking = function (req, res) {
  const bookingData = req.body;
  const user = res.locals.user;

  Booking.findById(bookingData._id)
    .populate("user", "-password")
    .populate({
      // populate both 'booking' and 'rental'
      path: "rental",
      populate: {
        path: "user",
        select: "_id email",
      }, // This is using for repropose booking date from rental owner.
    })
    .exec(function (err, foundBooking) {
      if (err) {
        return res.status(422).send({ errors: normalizeErrors(err.errors) });
      }

      if (foundBooking.user.id === user.id) {
        sendEmailTo(
          foundBooking.rental.user.email,
          RE_RE_REQUEST_RECIEVED,
          bookingData,
          req.hostname
        );
      } else if (foundBooking.rental.user.id === user.id) {
        sendEmailTo(
          foundBooking.user.email,
          RE_REQUEST_RECIEVED,
          bookingData,
          req.hostname
        );
      } else {
        return res.status(422).send({
          errors: {
            title: "Invalid request!",
            detail: "You cannot change other users booking!",
          },
        });
      }

      try {
        const updatedBooking = Booking.updateOne(
          { _id: foundBooking.id },
          bookingData,
          () => {}
        );
        return res.json({ status: "updated" });
      } catch (err) {
        return res.json(err);
      }
    });
};

exports.getUserBookings = function (req, res) {
  const user = res.locals.user;

  Booking.find({ user })
    // .populate('rental')
    .populate({
      // populate 'rental' and 'bookings' in 'rental'
      path: "rental",
      populate: { path: "bookings" }, // This is using for re-proposal dates window.
    })
    .sort({ startAt: -1 })
    .exec(function (err, foundBookings) {
      if (err) {
        return res.status(422).send({ errors: normalizeErrors(err.errors) });
      }
      return res.json(foundBookings);
    });
};
