const express = require("express");
const router = express.Router();
const { getMetadata } = require("../controllers/videoController");

router.post("/metadata", getMetadata);

module.exports = router;
