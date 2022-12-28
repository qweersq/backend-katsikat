import express from "express";
import cors from "cors";
import session from "express-session";
import multer from "multer";
import path from "path";
import bodyParser from "body-parser";

import userRoute from "./routes/UserRoute.js";
import shoesTransRoute from "./routes/ShoesTransactionRoute.js";
import staffRoute from "./routes/StaffRoute.js";
import shoesRoute from "./routes/ShoesRoute.js";
import treatmentRoute from "./routes/TreatmentRoute.js";
import shippingCostRoute from "./routes/ShippingCostRoute.js";
import expenditureRoute from "./routes/ExpenditureRoute.js";
import customerRoute from "./routes/CustomerRoute.js";
import dotenv from "dotenv";
import db from "./config/Database.js";

dotenv.config(); 

const __dirname = path.resolve();
const app = express();

(async() => {
  await db.sync();
})();
 
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: 'auto' }
}))


app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(express.json());

app.use(userRoute);
app.use(shoesTransRoute);
app.use(shoesRoute);
app.use(treatmentRoute);
app.use(staffRoute);
app.use(shippingCostRoute);
app.use(expenditureRoute);
app.use(customerRoute);


//To Add file in storage server
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      path.parse(file.originalname).name +
        "-" +
        Date.now() +
        path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

app.post(`/api/upload`, upload.single("photo"), (req, res) => {
  // save filename nya ke database
  // return url ke user

  let finalImageURL =
    req.protocol + "://" + req.get("host") + "/uploads/" + req.file.filename;

  res.json({ image: finalImageURL });
});


app.listen(process.env.APP_PORT, () => {
  console.log(`Server is running...`);
});