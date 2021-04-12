const Job = require('../model/Job')
const JobUtils = require('../utils/JobUtils')
const Profile = require('../model/Profile')

module.exports = {

    create(req, res) {
      return res.render("job")
    },

    async save(req, res) {
      //const jobs = await Job.get()
      
      //const lastId = Job.data[Job.data.length - 1]?.id || 0;
      //const lastId = Job.data[Job.data.length - 1].id || 0;

      //const lastId = (jobs.length === 0) ? 0 : jobs[jobs.length - 1].id 


      await Job.create({
        //id: lastId + 1,
        name: req.body.name,
        "daily-hours": req.body["daily-hours"],
        "total-hours": req.body["total-hours"],
        create_at: Date.now()  //atribuindo uma nova data (data atual)
      }) 

      return res.redirect('/')
    },

    async show(req, res) {
      const jobs = await Job.get()
      const profile = await Profile.get()

      const jobId = req.params.id

      const job = jobs.find(job => Number(job.id) === Number(jobId))

      if (!job) {
        return res.send('Job not found!')
      }

      job.budget = JobUtils.calculateBudget(job, profile["value-hour"]) 
      
      return res.render("job-edit", { job })
    },

    async update(req, res) {
      //const jobs = await Job.get()

      const jobId = req.params.id

      /*const job = jobs.find(job => Number(job.id) === Number(jobId))

      if (!job) {
        return res.send('Job not found!')
      }*/
    
      const updatedJob = {
        //...job,
        name: req.body.name,
        "total-hours": req.body["total-hours"],
        "daily-hours": req.body["daily-hours"]
      }

      /*const newJobs = jobs.map(job => {
        if (Number(job.id) === Number(jobId)) {
          job = updateJob
        }

        return job
      })*/

      await Job.update(updatedJob, jobId)

      res.redirect("/job/" + jobId)
    },

    async delete(req, res) {

      const jobId = req.params.id

      await Job.delete(jobId)

      return res.redirect('/')
    }
  }


