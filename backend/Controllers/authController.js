import User from "../models/UserSchema.js";
import Doctor from "../models/DoctorSchema.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";

dotenv.config();
// --------------------------------------------- JWT TOKEN  --------------------------------------
// create secret key using require('crypto').randomBytes(256).toString('base64') in node teminal
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "15d" }
  );
};

const register = async (req, res) => {
  const { email, password, name, role, photo, gender } = req.body;

  try {
    let user = null;

    if (role === "patient") {
      user = await User.findOne({ email });
    } else if (role === "doctor") {
      user = await Doctor.findOne({ email });
    }

    // chk if user exists
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    if (role === "doctor") {
      user = new Doctor({
        name,
        email,
        password: hashPassword,
        photo,
        gender,
        role,
      });
    }
    if (role === "patient") {
      user = new User({
        name,
        email,
        password: hashPassword,
        photo,
        gender,
        role,
      });
    }

    await user.save();

    res
      .status(200)
      .json({ success: true, message: "User successfully created" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "internal server error,try again!" });
  }
};

const login = async (req, res) => {
  const { email } = req.body;
  try {
    let user = null;
    const patient = await User.findOne({ email });
    const doctor = await Doctor.findOne({ email });

    if (patient) {
      user = patient;
    }
    if (doctor) {
      user = doctor;
    }

    // chk if user exists or not
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    //compare password
    const isPasswordaMatch = await bcrypt.compare(req.body.password, user.password);

    if (!isPasswordaMatch) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid credentials" });
    }

    //get jwt token
    const token = generateToken(user);

    const { password,role, appointments, ...rest } = user._doc;

    res.status(200).json({
      status: true,
      message: "Successfully login",
      token,
      data: { ...rest},
      role,
    });
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
};

export { register, login };
