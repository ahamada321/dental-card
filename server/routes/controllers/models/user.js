const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  teacherId: Number,
  isVerified: { type: Boolean, default: true },
  userRole: { type: String, default: "User" }, // User, Owner, OEM_Owner
  shared: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },

  username: {
    type: String,
    max: [32, "Too long, max is 32 characters."],
    min: [4, "Too short, min is 4 characters."],
    required: "Username is required",
  },
  email: String,
  password: {
    type: String,
    max: [32, "Too long, max is 32 characters."],
    min: [4, "Too short, min is 4 characters."],
    required: "Password is required",
  },
  hourlyPrice: { type: Number, required: "hourlyPrice is required" },
  // customer: {
  //     id: { type: String, default: '' },
  //     default_source: { type: String, default: '' }
  // },
  // rating: Number,
  // description: String,
  birthday: Object,
  gender: String,
  selectedGender: Object,
  selectedInstrument: Object,
  tel: String,
  postalcode: String,
  selectedPrefecture: Object,
  city: String,
  address: String,
  nearStation: String,

  school: String,
  major: String,
  appeal: String,
  instrumentRental: String,
  lineGroup: String,
  homepage: String,
  career: String,
  photo: String,

  bankName: String,
  bankBranchName: String,
  bankAccountType: String,
  bankAccountNumber: Number,
  bankAccountName: String,

  rentals: [{ type: Schema.Types.ObjectId, ref: "Rental" }],
  bookings: [{ type: Schema.Types.ObjectId, ref: "Booking" }],
});

userSchema.methods.hasSamePassword = function (requestPassword) {
  return bcrypt.compareSync(requestPassword, this.password);
};

userSchema.pre("save", function (next) {
  const user = this;

  // Skip if user didn't update user password
  if (user.password) {
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(user.password, salt, function (err, hash) {
        // Store hash in your password DB.
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

module.exports = mongoose.model("User", userSchema);
