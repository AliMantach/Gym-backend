const express = require("express");
const router = express.Router();
const { getTrainee,
    UpdateTrainee,
    deleteTrainee,
    getIndividualTrainee,
    postTrainee} = require("../controllers/traineeController");
const validateToken = require("../middleware/validateTokenHandler");

router.use(validateToken)
router.route("/").get(getTrainee).post(postTrainee)
router
    .route("/:id")
    .get(getIndividualTrainee)
    .put(UpdateTrainee)
    .delete(deleteTrainee);

module.exports = router;
