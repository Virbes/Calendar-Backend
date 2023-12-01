const { Router } = require('express');
const { check } = require('express-validator');
const { validateJWT } = require('../middlewares/validate-jwt');
const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/events');
const { validateFields } = require('../middlewares/fields-validators');
const { isDate } = require('../helpers/isDate');
const router = Router();

// All requests should first pass through validation for the JWT
router.use(validateJWT);

// Get Events
router.get('/', getEvents);

// Create a new event
router.post('/',
    [
        check('title', 'Title is required').not().isEmpty(),
        check('start', 'Start is required').custom(isDate),
        check('end', 'End is required').custom(isDate),
        validateFields
    ],
    createEvent
);

// Update an event
router.put('/:id',
    [
        check('title', 'Title is required').not().isEmpty(),
        check('start', 'Start is required').custom(isDate),
        check('end', 'End is required').custom(isDate),
        validateFields
    ],
    updateEvent
);

// Delete event
router.delete('/:id', deleteEvent);


module.exports = router;