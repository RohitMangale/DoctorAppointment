import express from "express";
import {
  deleteDoctor,
  getAllDoctors,
  getDoctorProfile,
  getSingleDoctor,
  updateDoctor,
} from "../Controllers/DoctorController.js";
import { authenticate, restrict } from "../auth/verifyToken.js";
import reviewRoute from "./review.js";

const router = express.Router();

router.use("/:doctorId/reviews", reviewRoute);

router.get("/:id", getSingleDoctor);
router.get("/", getAllDoctors);
router.put("/:id", authenticate, restrict(["doctor"]), updateDoctor);
router.delete("/:id", authenticate, restrict(["doctor"]), deleteDoctor);
router.get("/profile/me", authenticate, restrict(["doctor"]), getDoctorProfile);

export { router as doctorRoute };
