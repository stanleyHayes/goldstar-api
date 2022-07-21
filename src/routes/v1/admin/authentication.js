const express = require("express");
const {} = require("../../../controllers/v1/admin/authentication");
const {} = require("../../../middleware/v1/admin/authenticate");

const router = express.Router({mergeParams: true});

module.exports = router;
