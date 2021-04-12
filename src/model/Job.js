const Database = require('../db/config')

/*let data = [
    {
      id: 1,
      name: "Pizzaria Guloso",
      "daily-hours": 2,
      "total-hours": 2,
      create_at: Date.now(),
      budget: 4500
    },
    {
      id: 2,
      name: "OneTwo Project",
      "daily-hours": 3,
      "total-hours": 47,
      create_at: Date.now(),
      budget: 4500
    }
  ]*/

module.exports = {
  async get() {
    const db = await Database()

    const data = await db.all(`SELECT * FROM jobs`)

    await db.close()

    return data.map(job => ({
      id: job.id,
      name: job.name,
      "daily-hours": job.daily_hours,
      "total-hours": job.total_hours,
      create_at: job.created_at
    }))
  },

  async update(updatedJob, jobId) {
    const db = await Database()

    await db.run(`UPDATE jobs SET 
      name = "${updatedJob.name}",
      daily_hours = ${updatedJob["daily-hours"]},
      total_hours = ${updatedJob["total-hours"]}
      WHERE id = ${jobId}
    `)

    await db.close()
  },

  async delete(id) {
    const db = await Database()

    await db.run(`DELETE FROM jobs WHERE id = ${id}`)

    await db.close()
    
    //data = data.filter(job => Number(job.id) !== Number(id))
  },

  async create(newJob) {
    const db = await Database()

    await db.run(`INSERT INTO jobs (
      name,
      daily_hours,
      total_hours,
      created_at
    ) VALUES (
      "${newJob.name}",
      ${newJob['daily-hours']},
      ${newJob['total-hours']},
      ${newJob.create_at}
    )`)

    await db.close()
  }
}

