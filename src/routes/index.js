const express = require('express');
const path = require("path");
const admin = require('./admin');


module.exports = function (app) {
	app.use("/api/images", express.static(path.join("src/storage/images")));
	app.use('/api/admin', admin);


}