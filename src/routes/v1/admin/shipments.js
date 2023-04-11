const express = require("express");
const {
    createShipments, getShipment, getShipments, removeShipment, updateShipment
} = require("../../../controllers/v1/admin/shipments");
const {authenticate} = require("../../../middleware/v1/admin/authenticate");

const router = express.Router({mergeParams: true});

router.route('/').post(authenticate, createShipments).get(getShipments);
router.route('/:id')
    .get(authenticate, getShipment)
    .put(authenticate, updateShipment)
    .delete(authenticate, removeShipment);

module.exports = router;
