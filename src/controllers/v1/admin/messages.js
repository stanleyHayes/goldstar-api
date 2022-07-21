const validator = require("validator");
const Message = require("../../../models/v1/message");

exports.createMessage = async (req, res) => {
    try {
        const {create} = req.admin.permissions.messages;
        if (!create) return res.status(401).json({message: 'You do not have the permission to perform this operation'});
        const {firstName, lastName, subject, email, phone, message: text} = req.body;
        if (!firstName || !lastName || !subject || !email || !phone || !text)
            return res.status(400).json({message: 'Missing required files'});
        if (!validator.isEmail(email)) return res.status(400).json({message: 'Invalid email'});
        if (!validator.isEmail(phone)) return res.status(400).json({message: 'Invalid phone'});
        const message = await Message.create({firstName, lastName, subject, email, phone, message: text});
        res.status(201).json({message: 'Message created successfully', data: message});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}


exports.getMessages = async (req, res) => {
    try {
        const {read} = req.admin.permissions.messages;
        if (!read) return res.status(401).json({message: 'You do not have the permission to perform this operation'});
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 50;
        const skip = (page - 1) * limit;
        const match = {};
        const messages = await Message.find(match).skip(skip).limit(limit).sort({createdAt: -1});
        const totalMessages = await Message.find(match).countDocuments();
        res.status(200).json({message: 'Messages retrieved successfully', data: messages, count: totalMessages});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}


exports.getMessage = async (req, res) => {
    try {
        const {read} = req.admin.permissions.messages;
        if (!read) return res.status(401).json({message: 'You do not have the permission to perform this operation'});
        const message = await Message.findById(req.params.id);
        if (!message) return res.status(404).json({message: 'Message not found'});
        res.status(200).json({message: 'Message retrieved successfully', data: message});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}


exports.updateMessage = async (req, res) => {
    try {
        const {update} = req.admin.permissions.messages;
        if (!update) return res.status(401).json({message: 'You do not have the permission to perform this operation'});
        const message = await Message.findById(req.params.id);
        if (!message) return res.status(404).json({message: 'Message not found'});
        const updates = Object.keys(req.body);
        const allowedUpdates = ['responded'];
        const isAllowed = updates.every(update => allowedUpdates.includes(update));
        if (!isAllowed) return res.status(400).json({message: 'Updates not allowed'});
        for (let key of updates) {
            if (key === 'responded') {
                message['responded'] = !Boolean(message.responded);
                continue;
            }
            message[key] = req.body[key];
        }
        await message.save();
        res.status(200).json({message: 'Message updated successfully', data: message});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}


exports.deleteMessage = async (req, res) => {
    try {
        const {remove} = req.admin.permissions.messages;
        if (!remove) return res.status(401).json({message: 'You do not have the permission to perform this operation'});
        const message = await Message.findById(req.params.id);
        if (!message) return res.status(404).json({message: 'Message not found'});
        await message.remove();
        res.status(200).json({message: 'Message deleted successfully', data: {}});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}



exports.replyMessage = async (req, res) => {
    try {
        const {reply} = req.admin.permissions.quotes;
        if (!reply) return res.status(401).json({message: 'You do not have the permission to perform this operation'});
        const message = await Message.findById(req.params.id);
        if (!message) return res.status(404).json({message: 'Message not found'});
        const {response} = req.body;
        // send response as sms to user
        // send response as email to user
        message.response = response;
        message.responded = true;
        await message.save();
        res.status(200).json({message: 'Message responded to successfully', data: message});
    }catch (e) {
        res.status(500).json({message: e.message});
    }
}
