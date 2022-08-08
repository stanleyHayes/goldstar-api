const express = require("express");
const {
    createShipments, getShipment, getShipments
} = require("../../../controllers/v1/user/shipments");
const {authenticate} = require("../../../middleware/v1/user/authenticate");

const router = express.Router({mergeParams: true});

router.route('/').post(authenticate, createShipments).get(authenticate, getShipments);
router.route('/:id').get(authenticate, getShipment);

module.exports = router;
