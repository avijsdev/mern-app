var express = require("express");
const JobController = require("../controllers/JobController");

var router = express.Router();

router.get("/", JobController.JobList);
router.get("/:userId", JobController.JobListByApplicantId);
router.get("/:email", JobController.JobsByEmail);
router.post("/", JobController.addJob);
router.post("/apply", JobController.JobApplied);

module.exports = router;