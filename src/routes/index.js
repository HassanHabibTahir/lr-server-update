const express = require('express');
const path = require("path");
const admin = require('./admin');
const user = require('./user');
const client = require('./client');
const project = require('./project');
const auth = require('./auth');
const task = require('./task');

module.exports = function (app) {
	app.use("/api/images", express.static(path.join("src/storage/images")));
	app.use("/api/auth",auth);
	app.use('/api/admin', admin);
	app.use('/api/user', user);
	app.use('/api/client', client)
	app.use('/api/project', project)
	app.use('/api/task', task);
	


}