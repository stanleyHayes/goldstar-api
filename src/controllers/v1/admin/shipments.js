const Shipment = require("./../../../models/v1/shipment");

exports.createShipments = async (req, res) => {
    try {
        res.status(201).json({message: 'Shipments Added', data: {}});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}

exports.getShipment = async (req, res) => {
    try {
        res.status(200).json({message: 'Shipment Added', data: {}});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}

exports.getShipments = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.size) || 20;
        const skip = (page - 1) * limit;
        const match = {};
        const shipments = await Shipment
            .find(match)
            .skip(skip)
            .limit(limit)
            .sort({createdAt: -1});
        const totalShipments = await Shipment.find(match).countDocuments();
        res.status(200).json({message: 'Shipment Added', data: shipments, count: totalShipments});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}


exports.updateShipment = async (req, res) => {
    try {
        res.status(200).json({message: 'Shipment Updated', data: {}});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}


exports.removeShipment = async (req, res) => {
    try {
        res.status(200).json({message: 'Shipment Removed', data: {}});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}
