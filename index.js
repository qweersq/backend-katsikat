import express from "express";
import cors from "cors";
import session from "express-session";
import db from "./config/Database.js";
import userRoute from "./routes/UserRoute.js";
import shoesTransRoute from "./routes/ShoesTransactionRoute.js";
import staffRoute from "./routes/StaffRoute.js";
import shoesRoute from "./routes/ShoesRoute.js";
import treatmentRoute from "./routes/TreatmentRoute.js";
import shippingCostRoute from "./routes/ShippingCostRoute.js";
import expenditureRoute from "./routes/ExpenditureRoute.js";
import customerRoute from "./routes/CustomerRoute.js";
import dotenv from "dotenv";

dotenv.config(); 

const app = express();

// (async() => {
//   await db.sync();
// })();
 
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: 'auto' }
}))

app.use(cors());

app.use(express.json());
app.use(userRoute);
app.use(shoesTransRoute);
app.use(shoesRoute);
app.use(treatmentRoute);
app.use(staffRoute);
app.use(shippingCostRoute);
app.use(expenditureRoute);
app.use(customerRoute);

app.listen(process.env.APP_PORT, () => {
  console.log(`Server is running...`);
});