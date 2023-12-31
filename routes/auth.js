const { Router } = require('express');
const { createUser, loginUser, revalidateToken } = require('../controllers/auth');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/fields-validators');
const { validateJWT } = require('../middlewares/validate-jwt');
const router = Router();


router.post('/new',
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe ser de 6 caracteres').isLength({ min: 6 }),
        validateFields
    ],
    createUser
);

router.post('/',
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe ser de 6 caracteres').isLength({ min: 6 }),
        validateFields
    ],
    loginUser
);

router.get('/renew', validateJWT, revalidateToken);


module.exports = router;