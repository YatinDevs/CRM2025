const jwt = require("jsonwebtoken");
const adminsecretKey = process.env.ADMIN_SECRET_KEY;
const empsecretKey = process.env.EMP_SECRET_KEY;

const Admin = require("../models/adminModel");

const validateAdminToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  jwt.verify(token, adminsecretKey, async (err, decoded) => {
    if (err) {
      console.error("Token verification error:", err);
      return res.status(401).json({ message: "Invalid token" });
    }

    const adminId = decoded.adminId;

    try {
      const admin = await Admin.findByPk(adminId);
      if (admin) {
        req.admin = admin;
        next();
      } else {
        res.status(401).json({ message: "Admin not found" });
      }
    } catch (error) {
      console.error("Error retrieving Admin:", error);
      res.status(500).json({ message: "Error retrieving Admin", error });
    }
  });
};

const validateEmployeeToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  jwt.verify(token, empsecretKey, async (err, decoded) => {
    if (err) {
      console.error("Token verification error:", err);
      return res.status(401).json({ message: "Invalid token" });
    }

    const adminId = decoded.adminId;

    try {
      const admin = await Admin.findByPk(adminId);
      if (admin) {
        req.admin = admin;
        next();
      } else {
        res.status(401).json({ message: "Employee not found" });
      }
    } catch (error) {
      console.error("Error retrieving Employee:", error);
      res.status(500).json({ message: "Error retrieving Employee", error });
    }
  });
};

module.exports = { validateAdminToken, validateEmployeeToken };
