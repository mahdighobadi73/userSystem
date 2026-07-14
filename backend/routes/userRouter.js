const express = require( 'express' );
const { registerUser } = require( '../controllers/userController' );
const userValidation = require("../middlewares/userValidation");


const router = express.Router();

router.post( '/register', userValidation, registerUser );


module.exports = router;