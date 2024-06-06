import express from "express";
import { createReview, getAllReviews } from "../Controllers/reviewController.js";
import { authenticate, restrict } from "../auth/verifyToken.js";

const router =express.Router({ mergeParams: true }); // mergeparams allows to access objects from routes like doctor id here

router
  .route("/")
  .get(getAllReviews)
  .post(authenticate, restrict(['patient']), createReview);


  export default router;