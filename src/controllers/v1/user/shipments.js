exports.createShipments = async (req, res) => {
    try {
        res.status(201).json({message: 'Shipments Added', data: {}});
    }catch (e) {
        res.status(500).json({message: e.message});
    }
}

exports.getShipment = async (req, res) => {
    try {
        res.status(200).json({message: 'Shipment Added', data: {}});
    }catch (e) {
        res.status(500).json({message: e.message});
    }
}

exports.getShipments = async (req, res) => {
    try {
        res.status(200).json({message: 'Shipment Added', data: {}});
    }catch (e) {
        res.status(500).json({message: e.message});
    }
}


exports.updateShipment = async (req, res) => {
    try {
        res.status(200).json({message: 'Shipment Updated', data: {}});
    }catch (e) {
        res.status(500).json({message: e.message});
    }
}


exports.removeShipment = async (req, res) => {
    try {
        res.status(200).json({message: 'Shipment Removed', data: {}});
    }catch (e) {
        res.status(500).json({message: e.message});
    }
}
