const { response } = require('express');
const Event = require('../models/Event');

const getEvents = async (req, res = response) => {

    const events = await Event.find().populate('user', 'name');

    res.status(200).json({
        ok: true,
        events
    });
}

const createEvent = async (req, res = response) => {

    const event = new Event(req.body);

    try {

        event.user = req.uid;
        const eventSaved = await event.save();

        res.status(201).json({
            ok: true,
            eventSaved
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Comuniquese con el Administrador'
        });
    }

}

const updateEvent = async (req, res = response) => {

    const eventId = req.params.id;
    const uid = req.uid;

    try {

        const event = await Event.findById(eventId);

        if (!event) {
            res.status(404).json({
                ok: false,
                msg: 'No existe el evento solicitado'
            });
        }

        if (event.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio para editar este evento'
            });
        }

        const newEvent = {
            ...req.body,
            user: uid
        }

        const eventUpdated = await Event.findByIdAndUpdate(eventId, newEvent, { new: true });

        res.json({
            ok: true,
            event: eventUpdated
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Comuniquese con el Administrador'
        });
    }

}

const deleteEvent = async (req, res = response) => {

    const eventId = req.params.id;
    const uid = req.uid;

    try {

        const event = await Event.findById(eventId);

        if (!event) {
            res.status(404).json({
                ok: false,
                msg: 'No existe el evento solicitado'
            });
        }

        if (event.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio para editar este evento'
            });
        }

        await Event.deleteOne({ _id: eventId });

        res.status(200).json({
            ok: true,
            msg: 'Evento eliminado con exito'
        });

    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Comuniquese con el Administrador'
        });

    }
}

module.exports = { getEvents, createEvent, updateEvent, deleteEvent };