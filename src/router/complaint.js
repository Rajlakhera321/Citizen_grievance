const express = require("express");
const router = express.Router();
const { complaintController } = require("../controller");
const { uploadImage } = require("../helper");
const { complaintAccess,auth } = require("../middleware");
const {valid, complaintValidation} = require("../validation")

router.post(
  "/",
  uploadImage.imageUpload.fields([
    { name: "panCard", maxCount: 2 },
    { name: "images", maxCount: 10 },
  ]),
  complaintValidation.compalintValidation,
  valid.validate,
  complaintController.addComplaint
);

router.delete("/:id", auth.verifyToken, complaintController.deleteComplaint);

router.get(
  "/",
  complaintAccess.verifyComplaintAccess,
  complaintController.allComplaints
);

router.get("/myComplaints", auth.verifyToken, complaintController.getComplaint);

router.put(
  "/status/:id",
  complaintAccess.verifyComplaintAccess,
  complaintController.statusUpdate
);

module.exports = router;
