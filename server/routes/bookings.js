const express = require("express");
const router = express.Router();

const UserCtrl = require("./controllers/user");
const BookingCtrl = require("./controllers/booking");

router.get(
  "/student/:id",
  UserCtrl.authMiddleware,
  BookingCtrl.getStudentReports
);

router.get(
  "/teacher/:id",
  UserCtrl.authMiddleware,
  BookingCtrl.getTeacherReports
);

router.get("", UserCtrl.authMiddleware, BookingCtrl.getUserBookings); // All bookings

router.post("", UserCtrl.authMiddleware, BookingCtrl.createBooking);

router.patch("", UserCtrl.authMiddleware, BookingCtrl.updateBooking);

router.delete("/:id", UserCtrl.authMiddleware, BookingCtrl.deleteBooking);

module.exports = router;
