const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("../config/db");

// ADMIN ROUTES
const adminAuthRoutes = require("../routes/admin/auth");
const adminBookingsRoutes = require("../routes/admin/bookings");
const adminCoordinatorsRoutes = require("../routes/admin/coordinators");
const adminEventsRoutes = require("../routes/admin/events");
const adminMediaRoutes = require("../routes/admin/media");
const adminOrganizersRoutes = require("../routes/admin/organizers");
const adminSpeakersRoutes = require("../routes/admin/speakers");
const adminSponsorsRoutes = require("../routes/admin/sponsors");

// PUBLIC ROUTES
const bookingRoutes = require("../routes/booking");
const eventRoutes = require("../routes/events");
const webhookRoutes = require("../routes/webhook");

dotenv.config();

const app = express();

/* ------------ MIDDLEWARE ------------ */
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
}));

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

/* ------------ DATABASE ------------ */
connectDB();

/* ------------ ROUTES ------------ */
app.use("/api/admin/auth", adminAuthRoutes);
app.use("/api/admin/bookings", adminBookingsRoutes);
app.use("/api/admin/coordinators", adminCoordinatorsRoutes);
app.use("/api/admin/events", adminEventsRoutes);
app.use("/api/admin/media", adminMediaRoutes);
app.use("/api/admin/organizers", adminOrganizersRoutes);
app.use("/api/admin/speakers", adminSpeakersRoutes);
app.use("/api/admin/sponsors", adminSponsorsRoutes);

app.use("/api/bookings", bookingRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/webhook", webhookRoutes);

/* ------------ HEALTH CHECK ------------ */
app.get("/", (req, res) => {
  res.json({ success: true, message: "TEDx Backend Serverless 🚀" });
});

/* ❌ NO app.listen() */
module.exports = app;
