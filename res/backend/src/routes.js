const express = require("express")
const multer = require("multer")
const UploadConfig = require("./config/upload")
const BookingControler = require("./controllers/BookingController")
const SessionController = require("./controllers/SessionController")
const SpotController = require("./controllers/SpotController")
const DashboardController = require("./controllers/DashboardController")
const ApprovalController = require("./controllers/ApprovalController")
const RejectionController = require("./controllers/RejectionController")
const routes = express.Router()
const upload = multer(UploadConfig)
routes.post("/sessions/", SessionController.store);
routes.post("/spots/", upload.single("thumbnail"), SpotController.store);
routes.get("/spots/", SpotController.index);
routes.get("/dashboard/", DashboardController.show);

routes.post("/spots/:spot_id/bookings", BookingControler.store);

routes.post("/bookings/:booking_id/approvals", ApprovalController.store)
routes.post("/bookings/:booking_id/rejections", RejectionController.store)

module.exports = routes;