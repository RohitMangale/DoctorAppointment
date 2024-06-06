import Booking from "../models/BookingSchema.js";
import DoctorSchema from "../models/DoctorSchema.js";
import Doctor from "../models/DoctorSchema.js";

export const updateDoctor = async (req, res) => {
  const id = req.params.id;

  try {
    const updatedDoctor = await Doctor.findByIdAndUpdate(
      id,
      { $set: { ticketPrice: req.body.ticketPrice } },
      { $set: req.body },
      { new: true }
    ).select("-password");
    res.status(200).json({
      success: true,
      message: "Successfully Updated",
      data: updatedDoctor,
    });
  } catch (err) {
    res.status(400).json({ success: false, message: "Failed to update" });
  }
};

export const deleteDoctor = async (req, res) => {
  const id = req.params.id;

  try {
    await Doctor.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Successfully Deleted" });
  } catch (err) {
    res.status(400).json({ success: false, message: "Failed to delete" });
  }
};

export const getSingleDoctor = async (req, res) => {
  const id = req.params.id;

  try {
    const doctor = await Doctor.findById(id)
      .populate("reviews")
      .select("-password");
    res
      .status(200)
      .json({ success: true, message: "Found Doctor", data: doctor });
  } catch (err) {
    res.status(404).json({ success: false, message: "Doctor not found" });
  }
};

export const getAllDoctors = async (req, res) => {
  try {
    const { query } = req.query;
    let doctors;

    if (query) {
      doctors = await DoctorSchema.find({
        isApproved: "approved",
        $or: [
          { name: { $regex: query, $options: "i" } }, // Case-insensitive search
          { specialization: { $regex: query, $options: "i" } }, // Uncomment for type filter
        ],
      });
    } else {
      doctors = await Doctor.find({ isApproved: "approved" }).select(
        "-password"
      );
    }

    res
      .status(200)
      .json({ success: true, message: "Found Doctors", data: doctors });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

export const getDoctorProfile = async (req, res) => {
  const doctorId = req.userId;
  try {
    const doctor = await Doctor.findById(doctorId);

    if (!doctor) {
      return res
        .status(404)
        .json({ success: false, message: "Doctor not found" });
    }

    const { password, ...rest } = doctor._doc;
    const appointments = await Booking.find({ doctor: doctorId });

    res
      .status(200)
      .json({
        success: true,
        message: "Profile info is getting",
        data: { ...rest, appointments },
      });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Something wend Wrong, Could not get Profile ",
      });
  }
};
