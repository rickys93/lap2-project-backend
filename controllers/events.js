const Event = require("../models/events");
const Token = require("../models/token");
const User = require("../models/users");

const uploadFile = require("../middleware/fileUploader");

async function index(req, res) {
    try {
        const events = await Event.getAll();
        let eventsAndUsers = [];
        for (let event of events) {
            const userId = event.user_id;
            const newUser = await User.getOneById(userId);
            event.username = newUser.username;
            eventsAndUsers.push(event);
        }

        res.status(200).json(eventsAndUsers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function show(req, res) {
    try {
        const id = parseInt(req.params.id);
        const event = await Event.getOneById(id);
        const newUser = await User.getOneById(event.user_id);
        event.username = newUser.username;
        res.status(200).json(event);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}

async function search(req, res) {
    try {
        const string = req.params.string;
        const events = await Event.search(string);
        res.status(200).json(events);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}

async function create(req, res) {
    try {
        const data = req.body;
        // get file and upload to cloudinary
        const file = req.file;
        if (file) {
            const response = await uploadFile(file);
            if (response.secure_url) {
                data.image_url = response.secure_url;
            }
        }
        // get user account from token so we can add username to response
        const token = data.token;
        const tokenData = await Token.getOneByToken(token);
        data.user_id = tokenData.user_id;
        const newEvent = await Event.create(data);
        const user = await User.getOneById(data.user_id);
        newEvent.username = user.username;
        res.status(201).json(newEvent);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
}

async function interested(req, res) {
    try {
        const id = parseInt(req.params.id);
        const events = await Event.getOneById(id);
        const result = await events.interested();
        res.status(200).json(result);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
}

async function not_interested(req, res) {
    try {
        const id = parseInt(req.params.id);
        const events = await Event.getOneById(id);
        const result = await events.not_interested();
        res.status(200).json(result);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
}

async function attend(req, res) {
    try {
        const id = parseInt(req.params.id);
        const events = await Event.getOneById(id);
        const result = await events.attend();
        res.status(200).json(result);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
}

async function not_attending(req, res) {
    try {
        const id = parseInt(req.params.id);
        const events = await Event.getOneById(id);
        const result = await events.not_attending();
        res.status(200).json(result);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
}

async function destroy(req, res) {
    try {
        const id = parseInt(req.params.id);
        const event = await Event.getOneById(id);
        const result = await event.destroy();
        res.status(200).json(result);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
}

module.exports = {
    index,
    show,
    search,
    create,
    interested,
    not_interested,
    attend,
    not_attending,
    destroy,
};
