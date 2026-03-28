import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";

import { env } from "./config/env.js";
import { errorHandler } from "./middlewares/error-handler.js";
import { notFoundHandler } from "./middlewares/not-found.js";
import { availabilityRouter } from "./routes/availability.routes.js";
import { bookingsRouter } from "./routes/bookings.routes.js";
import { eventTypesRouter } from "./routes/event-types.routes.js";
import { healthRouter } from "./routes/health.routes.js";
import { publicBookingRouter } from "./routes/public-booking.routes.js";

export const app = express();

const allowedOrigins = new Set(
  [
    env.CLIENT_URL,
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:5174",
    "http://127.0.0.1:5174"
  ]
    .filter(Boolean)
    .map((origin) => origin.replace(/\/$/, ""))
);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) {
        return callback(null, true);
      }

      const normalizedOrigin = origin.replace(/\/$/, "");

      if (allowedOrigins.has(normalizedOrigin)) {
        return callback(null, true);
      }

      console.warn(`Blocked CORS request from origin: ${origin}`);
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true
  })
);
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_req, res) => {
  res.json({
    message: "Calendly Clone API is running",
    version: "phase-2"
  });
});

app.use("/api/health", healthRouter);
app.use("/api/event-types", eventTypesRouter);
app.use("/api/availability", availabilityRouter);
app.use("/api/public", publicBookingRouter);
app.use("/api/bookings", bookingsRouter);

app.use(notFoundHandler);
app.use(errorHandler);
