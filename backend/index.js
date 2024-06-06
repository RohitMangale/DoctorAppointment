import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import { authRoute} from "./Routes/auth.js";
import { userRoute } from "./Routes/user.js";
import { doctorRoute } from "./Routes/Doctor.js";
import reviewRoute from "./Routes/review.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

const corsOptions = {
  origin: true,
  methods:["POST,GET,PUT,DELETE"],
  credentials:true
};

// mongoose.set("strictQuery", false);
// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URL, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log("MongoDB database is connected");
//   } catch (error) {
//     console.log(error);
//   }
// };

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/doctors", doctorRoute);
app.use("/api/reviews", reviewRoute);

// mongoose
//   .connect(process.env.MONGO_URL)
//   .then(() => {
//     app.listen(port, () => {
//       console.log("Listening on port " + port);
//     });
//   })
//   .catch((error) => {
//     console.log(error);
//   });
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

mongoose
  .connect("mongodb+srv://rohitmangale010:rohitAtlas@cluster0.kpdbktw.mongodb.net/") // specify db name as object or else it will save data in test db
  .then(() => {
    console.log("Connected to Mongoose");
    app.listen(port, () => {
      console.log(`Server Started on port ${port}`);
    });
  })
  .catch((err) => console.log(err));
// app.listen(port, () => {
//   // connectDB();
//   console.log("Server in runnning on port " + port);
// });
