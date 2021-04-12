const express = require('express')
const ProfileController = require('./controllers/ProfileController')
const JobController = require('./controllers/JobController')
const DashboardController = require('./controllers/DashboardController')

const routes = express.Router()


//const basePath = __dirname + "/views"
//const views = __dirname + "/views/"


//request, response
routes.get('/', DashboardController.index) 
routes.get('/job', JobController.create) 
routes.get('/job/:id', JobController.show)  //job-edit 
routes.get('/profile', ProfileController.index) 

routes.post('/job', JobController.save) 
routes.post('/job/:id', JobController.update)  //job-edit 
routes.post('/job/delete/:id', JobController.delete)  //job-edit 
routes.post('/profile', ProfileController.update) 


module.exports = routes;

