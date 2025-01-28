const Employee = require("../models/employeeModel");
const Jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const jwtKey = require("../config/auth.config");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const adminjwtKey = require("../config/adminauth.config");
const empSignUp = async (req, res) => {
  try {
    const { name, contact, password } = req.body;

    const existingUser = await User.findOne({
      where: {
        contact,
      },
    });

    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, error: "Email or contact already in use." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,

      contact,
      password: hashedPassword,
      country_code: "+91",
      authMode: "WHATSAPP",
    });

    const token = Jwt.sign({ userId: newUser.user_id }, jwtKey.secret, {
      expiresIn: "30d",
    });

    const { password: _, ...userWithoutPassword } = newUser.toJSON();

    res.status(201).json({
      success: true,
      user: userWithoutPassword,
      token: token,
      message: "User created successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};
