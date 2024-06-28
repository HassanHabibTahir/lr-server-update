const express = require('express');
const path = require("path");
const admin = require('./admin');
const user = require('./user');
const client = require('./client');


module.exports = function (app) {
	app.use("/api/images", express.static(path.join("src/storage/images")));
	app.use('/api/admin', admin);
	app.use('/api/user', user);
	app.use('/api/client', client)
	


}