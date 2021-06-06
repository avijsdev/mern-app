const Job = require("../models/JobModel");
const { body, validationResult } = require("express-validator");
const { sanitizeBody } = require("express-validator");
const apiResponse = require("../helpers/apiResponse");
const auth = require("../middlewares/jwt");
var mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);

// Job Schema
function jobData(data) {
	this.id = data._id;
	this.title = data.title;
	this.description = data.description;
	this.date = data.date;
	this.user = data.user;
	this.cost = data.cost;
	this.status = data.status;
	this.owner = data.owner;
	this.email = data.email;
	this.skills = data.skills;
	this.applicants = data.applicants;
}

/**
 * Job details having applicants.
 *
 * @returns {Object}
 */
exports.JobListByApplicantId = [
	auth,
	function (req, res) {
		try {
			Job.find({
				applicants: {
					$in: [
						mongoose.Types.ObjectId(req.params.userId)
					]
				}
			}, "_id title description createdAt").then((Jobs) => {
				if (Jobs.length > 0) {
					return apiResponse.successResponseWithData(res, "Operation success", Jobs);
				} else {
					return apiResponse.successResponseWithData(res, "Operation success", []);
				}
			});
		} catch (err) {
			//throw error in json response with status 500.
			return apiResponse.ErrorResponse(res, err);
		}
	}
];



/**
 * All Jobs.
 *
 * @param {string}      id
 *
 * @returns {Object}
 */
exports.JobList = [
	auth,
	function (req, res) {
		try {
			Job.find().then((Jobs) => {
				if (Jobs.length > 0) {
					let JobData = [];
					Jobs.forEach(job => {
						JobData.push(jobData(job));
					});
					return apiResponse.successResponseWithData(res, "Operation success", JobData);
				} else {
					return apiResponse.successResponseWithData(res, "Operation success", []);
				}
			});
		} catch (err) {
			//throw error in json response with status 500.
			return apiResponse.ErrorResponse(res, err);
		}
	}
];

/**
 * Job Details by email.
 *
 * @param {string}      email
 *
 * @returns {Object}
 */
exports.JobsByEmail = [
	auth,
	function (req, res) {
		if (!req.params.email) {
			return apiResponse.successResponseWithData(res, "Operation success", []);
		}
		try {
			Job.find({ email: req.params.email }, "_id title description createdAt").then((Jobs) => {
				if (Jobs.length > 0) {
					let JobData = [];
					Jobs.forEach(job => {
						JobData.push(jobData(job));
					});
					return apiResponse.successResponseWithData(res, "Operation success", JobData);
				} else {
					return apiResponse.successResponseWithData(res, "Operation success", []);
				}
			});
		} catch (err) {
			//throw error in json response with status 500.
			return apiResponse.ErrorResponse(res, err);
		}
	}
];

/**
 * Job post to add new job.
 *
 * @param {string}      title
 * @param {string}      description
 * @param {string}      email
 *
 * @returns {Object}
 */
exports.addJob = [
	auth,
	body("title", "Title must not be empty.").isLength({ min: 1 }),
	body("description", "Description must not be empty.").isLength({ min: 1 }),
	body("cost", "Cost must be more than $10.").isLength({ min: 1 }).trim(),
	body("owner", "Owner must not be empty.").isLength({ min: 1 }),
	body("email", "Email must not be empty.").isLength({ min: 1 }).trim(),
	body("skills", "Skills must not be less than 3 character.").isLength({ min: 3 }).trim(),
	sanitizeBody("*").escape(),
	(req, res) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			}
			else {
				var Job = new Job(
					{
						title: req.body.title,
						description: req.body.description,
						cost: req.body.cost,
						owner: req.body.owner,
						email: req.body.email,
						skills: req.body.skills,
						date: new Date().toLocaleString('en-US'),
						status: 'Active',
						applicants: []
					});
				//Save Job.
				Job.save(function (err) {
					if (err) { return apiResponse.ErrorResponse(res, err); }
					let JobData = new JobData(Job);
					return apiResponse.successResponseWithData(res, "Job add Success.", JobData);
				});
			}
		} catch (err) {
			//throw error in json response with status 500.
			return apiResponse.ErrorResponse(res, err);
		}
	}
];

/**
 * Job update.
 *
 * @param {string}      jobId
 * @param {string}      applicantId
 *
 * @returns {Object}
 */
exports.JobApplied = [
	auth,
	body("jobId", "Job ID must not be empty.").isLength({ min: 1 }).trim(),
	body("applicantId", "Applicant ID must not be empty.").isLength({ min: 1 }).trim(),
	sanitizeBody("*").escape(),
	(req, res) => {
		try {
			const errors = validationResult(req);
			var Job = new Job();

			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			}
			else {
				if (!mongoose.Types.ObjectId.isValid(req.body.jobId)) {
					return apiResponse.validationErrorWithData(res, "Invalid Error.", "Invalid Job ID");
				} else if (!mongoose.Types.ObjectId.isValid(req.body.applicantId)) {
					return apiResponse.validationErrorWithData(res, "Invalid Error.", "Invalid Applicant ID");
				} else {
					Job.findById(req.body.jobId, function (err, foundJob) {
						if (foundJob === null) {
							return apiResponse.notFoundResponse(res, "Job not exists with this id");
						} else {
							//Check authorized user
							if (foundJob.applicants.find(req.body.applicantId)) {
								return apiResponse.unauthorizedResponse(res, "You have already applied for this Job.");
							} else {
								//update Job.
								delete foundJob._id;
								foundJob.applicants.push(req.body.applicantId);
								Job.findByIdAndUpdate(req.body.id, foundJob, {}, function (err) {
									if (err) {
										return apiResponse.ErrorResponse(res, err);
									} else {
										let JobData = new JobData(Job);
										return apiResponse.successResponseWithData(res, "Job update Success.", JobData);
									}
								});
							}
						}
					});
				}
			}
		} catch (err) {
			//throw error in json response with status 500.
			return apiResponse.ErrorResponse(res, err);
		}
	}
];