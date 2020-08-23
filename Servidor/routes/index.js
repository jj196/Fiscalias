const fiscalia = require( './fiscalia')
const express = require("express");
var router = express.Router();

router.use('/fiscalia', fiscalia);

module.exports = router;