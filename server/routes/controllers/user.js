const User = require("./models/user");
const Booking = require("./models/booking");
const { normalizeErrors } = require("./helpers/mongoose");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const config = require("../../config");
const moment = require("moment-timezone");

exports.getUsers = function (req, res) {
  const { page, limit } = req.query;

  if (page && limit) {
    User.aggregate(
      [
        { $match: { userRole: "User" } }, // Filtering to teachers
        { $project: { password: 0 } }, // Hide sensitive information.
        { $sort: { teacherId: -1 } }, // Sorting by teacherId
        {
          $facet: {
            metadata: [{ $count: "total" }, { $addFields: { page: page } }],
            foundUsers: [
              { $skip: (page - 1) * limit },
              { $limit: Number(limit) },
            ],
          },
        },
      ],
      function (err, result) {
        if (err) {
          return res.status(422).send({ errors: normalizeErrors(err.errors) });
        }
        return res.json(result);
      }
    );
  } else {
    User.find({ userRole: "User" })
      // .populate('user') // Need to consider security in future.
      .select("-password")
      .sort({ teacherId: -1 })
      .exec(function (err, foundUsers) {
        return res.json(foundUsers);
      });
  }
};

exports.searchUsers = function (req, res) {
  const { searchWords } = req.params;

  User.aggregate(
    [
      { $project: { password: 0 } },
      {
        $match: {
          username: {
            $regex: searchWords,
            $options: "i",
          },
        },
      },
      { $sort: { teacherId: -1 } },
    ],
    function (err, foundUsers) {
      return res.json(foundUsers);
    }
  );
};

exports.getUserById = function (req, res) {
  const reqUserId = req.params.id;
  const user = res.locals.user;

  if (reqUserId == user.id) {
    // Display all
    User.findById(reqUserId, function (err, foundUser) {
      if (err) {
        return res.status(422).send({ errors: normalizeErrors(err.errors) });
      }
      return res.json(foundUser);
    });
  } else {
    // Restrict some data
    User.findById(reqUserId)
      // .select('-revenue -customer -password')
      .select("-password")
      .exec(function (err, foundUser) {
        if (err) {
          return res.status(422).send({ errors: normalizeErrors(err.errors) });
        }
        return res.json(foundUser);
      });
  }
};

//Reffering from ./routes/user.js
exports.auth = function (req, res) {
  const { teacherId, password } = req.body;

  if (!password || !teacherId) {
    return res.status(422).send({
      errors: [
        {
          title: "Data missing!",
          detail: "IDとパスワードを入力してください",
        },
      ],
    });
  }

  User.findOne({ teacherId }, function (err, user) {
    if (err) {
      return res.status(422).send({ errors: normalizeErrors(err.errors) });
    }
    if (!user) {
      return res.status(422).send({
        errors: [
          { title: "Invalid user!", detail: "先にユーザー登録してください" },
        ],
      });
    }
    if (!user.isVerified) {
      return res.status(422).send({
        errors: [
          {
            title: "Not active user!",
            detail: "事務局に講師活動再開連絡をしてください",
          },
        ],
      });
    }

    if (user.hasSamePassword(password)) {
      // return JWT token
      const token = jwt.sign(
        {
          userId: user.id,
          username: user.username,
          userRole: user.userRole,
        },
        config.SECRET,
        { expiresIn: "12h" }
      );

      return res.json(token);
    } else {
      return res.status(422).send({
        errors: [
          { title: "Invalid!", detail: "IDまたはパスワードが間違っています" },
        ],
      });
    }
  });
};

exports.register = function (req, res) {
  const {
    username,
    email,
    // birthday,
    // selectedGender,
    selectedInstrument,
    // tel,
    // postalcode,
    // selectedPrefecture,
    // city,
    // address,
    // nearStation,

    // school,
    // major,
    // appeal,
    hourlyPrice,
    instrumentRental,
    // lineGroup,
    // homepage,
    // career,
    // photo,

    bankName,
    bankBranchName,
    bankAccountType,
    bankAccountNumber,
    bankAccountName,
  } = req.body;

  // Filling user infomation with ../models/user.js format
  const user = new User({
    username,
    email,
    password: "tsubaki",
    // birthday,
    // birthday: moment(birthday).subtract(1, 'months'),
    // gender: selectedGender[0].gender,
    selectedInstrument,
    // tel,
    // postalcode,
    // selectedPrefecture,
    // city,
    // address,
    // nearStation,

    // school,
    // major,
    // appeal,
    hourlyPrice,
    instrumentRental,
    // lineGroup,
    // homepage,
    // career,
    // photo,

    bankName,
    bankBranchName,
    bankAccountType,
    bankAccountNumber,
    bankAccountName,
  });

  if (!username) {
    return res.status(422).send({
      errors: [
        { title: "Data missing!", detail: "ユーザー名を入力してください" },
      ],
    });
  }

  // if (!birthday) {
  //   return res.status(422).send({
  //     errors: [{ title: "Data missing!", detail: "誕生日を入力してください" }],
  //   });
  // }

  User.findOne({ email }, function (err, existingUser) {
    if (err) {
      return res.status(422).send({ errors: normalizeErrors(err.errors) });
    }
    if (existingUser) {
      return res.status(422).send({
        errors: [
          {
            title: "Invalid email!",
            detail: "このメールアドレスは既に登録されています！",
          },
        ],
      });
    }

    User.estimatedDocumentCount({}, function (err, count) {
      if (err) {
        return res.status(422).send({ errors: normalizeErrors(err.errors) });
      }
      user.teacherId = count + 1;

      User.create(user, function (err, newUser) {
        if (err) {
          return res.status(422).send({ errors: normalizeErrors(err.errors) });
        }

        const token = jwt.sign(
          {
            userId: newUser.id,
            //username: newUser.username
          },
          config.SECRET,
          { expiresIn: "12h" }
        );

        return res.json(user.teacherId);
      });
    });
  });
};

exports.updateUser = function (req, res) {
  const userData = req.body;
  const { password, confirmPassword } = req.body;
  const reqUserId = req.params.id;
  const user = res.locals.user; // This is logined user infomation.

  if (user.userRole === "Owner") {
    User.updateOne({ _id: reqUserId }, userData, () => {});

    const token = jwt.sign(
      {
        userId: user.id,
        username: userData.username,
        userRole: user.userRole,
      },
      config.SECRET,
      { expiresIn: "12h" }
    );

    return res.json(token);
  } else if (reqUserId === user.id) {
    if (!password || !confirmPassword) {
      return res.status(422).send({
        errors: [
          {
            title: "Data missing!",
            detail: "パスワードとパスワード（確認）を入力してください",
          },
        ],
      });
    }

    if (password !== confirmPassword) {
      return res.status(422).send({
        errors: [
          {
            title: "Error!",
            detail: "パスワードとパスワード（確認）が異なります",
          },
        ],
      });
    }

    User.findById(reqUserId, function (err, foundUser) {
      foundUser.password = password;
      foundUser.save();

      const token = jwt.sign(
        {
          userId: user.id,
          username: userData.username,
          userRole: user.userRole,
        },
        config.SECRET,
        { expiresIn: "12h" }
      );

      return res.json(token);
    });
  } else {
    return res.status(422).send({
      errors: {
        title: "Invalid user!",
        detail: "Cannot edit other user profile!",
      },
    });
  }
};

// Not completely works!
exports.deleteUser = async function (req, res) {
  const reqUserId = req.params.id;
  const user = res.locals.user; // This is logined user infomation.

  if (user.userRole === "Owner") {
    try {
      await Booking.deleteMany({ user: reqUserId });
      await User.deleteOne({ _id: reqUserId });
      return res.json({ registered: false });
    } catch (err) {
      return res.status(422).send({ errors: normalizeErrors(err.errors) });
    }
  } else {
    return res.status(422).send({
      errors: {
        title: "Invalid user!",
        detail: "Cannot delete other user profile!",
      },
    });
  }
};

exports.setNwePassword = function (req, res) {
  const { email, password, passwordConfirmation } = req.body;
  const verifyToken = req.params.token;
  let user;

  if (!password || !email) {
    return res.status(422).send({
      errors: [
        { title: "Data missing!", detail: "Provide email and password!" },
      ],
    });
  }

  if (password != passwordConfirmation) {
    return res.status(422).send({
      errors: [
        {
          title: "Invalid password!",
          detail: "Password is not as same as confirmation!",
        },
      ],
    });
  }

  if (verifyToken) {
    try {
      user = jwt.verify(verifyToken, config.SECRET);
    } catch (err) {
      return res.status(422).send({
        errors: [
          { title: "Invalid token!", detail: "Token format is invalid!" },
        ],
      });
    }
  }

  if (email != user.email) {
    return res.status(422).send({
      errors: [
        {
          title: "email is incorrect!",
          detail: "Email is incorrect as we sent!",
        },
      ],
    });
  }

  User.findById(user.userId, function (err, foundUser) {
    if (err) {
      return res.status(422).send({ errors: normalizeErrors(err.errors) });
    }
    foundUser.password = password;
    foundUser.save(function (err) {
      if (err) {
        return res.status(422).send({ errors: normalizeErrors(err.errors) });
      }
      return res.status(200).send(foundUser);
    });
  });
};

exports.setInitialPassword = function (req, res) {
  const userId = req.params.id;
  const password = "tsubaki";

  User.findById(userId, function (err, foundUser) {
    if (err) {
      return res.status(422).send({ errors: normalizeErrors(err.errors) });
    }
    foundUser.password = password;
    foundUser.save(function (err) {
      if (err) {
        return res.status(422).send({ errors: normalizeErrors(err.errors) });
      }
      return res.status(200).send(foundUser);
    });
  });
};

function parseToken(token) {
  // split token string [Bearer XXXXXXXXX] with ' ' and return XXXXXXXXX
  return jwt.verify(token.split(" ")[1], config.SECRET);
}

function notAuthorized(res) {
  return res.status(401).send({
    errors: [
      {
        title: "Not authorized!",
        detail: "You need to login to get access!",
      },
    ],
  });
}

exports.authMiddleware = function (req, res, next) {
  const token = req.headers.authorization;

  if (token) {
    const user = parseToken(token);

    User.findById(user.userId, function (err, user) {
      if (err) {
        return res.status(422).send({ errors: normalizeErrors(err.errors) });
      }

      if (user) {
        res.locals.user = user;
        next();
      } else {
        return notAuthorized(res);
      }
    });
  } else {
    return notAuthorized(res);
  }
};
