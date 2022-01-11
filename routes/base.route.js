const express = require("express");

const baseHandler=require('../Controllers/base.controller');

const router = express.Router();

router.get('/',baseHandler.getHomePage);

module.exports = router;
