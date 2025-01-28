const Admin = require("../models/adminModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const adminjwtKey = require("../config/authAdm.config");

const adminSignUp = async (req, res) => {
  try {
    const { name, contact, password, role } = req.body;

    const existingAgent = await Agent.findOne({ where: { contact } });
    if (existingAgent) {
      return res
        .status(400)
        .json({ success: false, error: "Contact already in use." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAgent = await Agent.create({
      name,
      contact,
      password: hashedPassword,
      role,
      status: "offline",
    });

    const token = jwt.sign({ agentId: newAgent.agent_id }, adminjwtKey.secret, {
      expiresIn: "30d",
    });

    await AgentActivity.create({
      agent_id: newAgent.agent_id,
      activity_type: "onboarding",
    });

    res.status(201).json({
      success: true,
      message: "Agent onboarded successfully",
      agent: newAgent,
      token: token,
    });
  } catch (error) {
    console.error("Error signing up agent:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};
const adminLogin = async (req, res) => {
  try {
    const { contact, password } = req.body;

    const agent = await Agent.findOne({ where: { contact } });
    if (!agent) {
      return res
        .status(404)
        .json({ success: false, error: "Agent not found." });
    }

    const isPasswordValid = await bcrypt.compare(password, agent.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ success: false, error: "Invalid password." });
    }

    agent.status = "online";
    agent.last_login = new Date();
    await agent.save();

    await AgentActivity.create({
      agent_id: agent.agent_id,
      activity_type: "login",
    });

    const token = jwt.sign({ agentId: agent.agent_id }, adminjwtKey.secret, {
      expiresIn: "30d",
    });

    const agentData = agent.toJSON();
    delete agentData.password;

    res.status(200).json({
      success: true,
      message: "Login successful",
      token: token,
      agent: agentData,
    });
  } catch (error) {
    console.error("Error logging in agent:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

module.exports = {
  adminSignUp,
  adminLogin,
};
