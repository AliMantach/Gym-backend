const express = require("express");
const router = express.Router();
const { getContact, postContact, getIndividualContact, deleteContact, UpdateContact } = require("../controllers/contactController");
const validateToken = require("../middleware/validateTokenHandler");

router.use(validateToken)
router.route("/").get(getContact).post(postContact)
router
    .route("/:id")
    .get(getIndividualContact)
    .put(UpdateContact)
    .delete(deleteContact);

module.exports = router;
