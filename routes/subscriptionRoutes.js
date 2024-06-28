const express = require("express");
const router = express.Router();
const { getsubscription,
    getIndividualsubscription,
    postsubscriptionInd,
    deletesubscription,
    updatesubscription, } = require("../controllers/subscriptionController");
const validateToken = require("../middleware/validateTokenHandler");

router.use(validateToken)
router.route("/").get(getsubscription).post(postsubscriptionInd)
router
    .route("/:id")
    .get(getIndividualsubscription)
    .put(updatesubscription)
    .delete(deletesubscription);

module.exports = router;