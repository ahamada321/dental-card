const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
  createdAt: { type: Date, default: Date.now }, // Not recommend to use moment here.

  selectedStudent: Object,
  teacherHourlyPrice: Number,
  teacherRevenue: { type: Number, required: "Teacher revenue is missing!" }, // teacherHourlyPrice * courseTime
  perMonth: Number, // Not using

  startAt: { type: Date, required: "Starting date is required" },
  endAt: { type: Date }, // not using anymore
  courseType: { type: String, required: "Course type is required" },
  courseTime: { type: Number }, // not using anymore

  title: { type: String },
  progress: { type: String },
  place: { type: String, required: "Place is required" },
  receiptImageUrl: String,
  receiptPrice: Number,
  lineNameFrom: String, // going to remove
  stationFrom: String, // going to remove
  lineNameTo: String, // going to remove
  stationTo: String, // going to remove
  memo: String,
  transportFee: Number, // fix my name!
  totalPrice: Number,

  user: { type: Schema.Types.ObjectId, ref: "User" }, // Teacher
  rental: { type: Schema.Types.ObjectId, ref: "Rental" }, // Student
  // payment: { type: Schema.Types.ObjectId, ref: "Payment" }, // Teacher's revenue
  status: { type: String, default: "pending" },
  review: { type: Schema.Types.ObjectId, ref: "Review" },
});

module.exports = mongoose.model("Booking", bookingSchema);
