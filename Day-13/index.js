const express = require('express')
const path  = require('path')
const { parseArgs } = require('util')
const app = express()
const port = 5000
const config = require('./src/config/config.json')
const {Sequelize, QueryTypes} = require('sequelize')
const sequelize = new Sequelize(config.development)

app.set("view engine", "hbs")
app.set('views', path.join(__dirname, 'src/views'))

app.use("/asset", express.static('src/asset'))
app.use(express.urlencoded({ extended: false }))

app.get('/', home)
app.get('/project', project)
app.get('/testimonial', testimonial)
app.get('/contact', contact)

app.post('/addProject', addProject)

app.get('/update-project/:id', updateProjectView)
app.post('/updateProject', updateProject)
app.post('/delete-project/:id', deleteProject)

app.get('/detail-project/:id', detailProject)

const data = []

async function home(req, res) {
    const query = "SELECT * FROM projects"
    const obj   = await sequelize.query(query, {type: QueryTypes.SELECT})
    res.render('index', { data : obj })
}

function project(req, res){
    res.render('project')
}

function testimonial(req, res){
    res.render('testimonial')
}

function contact(req, res){
    res.render('contact')
}

function addProject(req, res){
    const {projectName, startDate, endDate, description, technology} = req.body

    const duration = getDistanceTime(new Date(startDate), new Date(endDate))

    const dataProject = {projectName, startDate, endDate, duration, description, technology}

    data.unshift(dataProject)

    res.redirect('/')
}

function updateProjectView(req, res) {
    const {id} = req.params

    const dataFilter = data[parseInt(id)]
    dataFilter.id = parseInt(id)

    res.render('update-project', {data : dataFilter})
}

function updateProject(req, res) {
    const {projectName, startDate, endDate, description, technology, id} = req.body

    const duration = getDistanceTime(new Date(startDate), new Date(endDate))

    data[parseInt(id)] = {projectName, startDate, endDate, duration, description, technology}

    res.redirect('/')
}

function deleteProject(req, res) {
    const  {id} = req.params
    data.splice(id, 1)
    res.redirect('/')
}

function detailProject(req, res){
    const {id} = req.params

    const dataFilter = data[parseInt(id)]

    res.render('project-detail', {data : dataFilter})
}

function getDistanceTime(start, end) {
    let timePost    = start
    let timeNow     = end
    let distance    = timeNow - timePost
    let disMonth    = Math.floor(distance / (1000 * 60 * 60 * 24 * 30))
    let disDay      = Math.floor(distance / (1000 * 60 * 60 * 24))
    let disHour     = Math.floor(distance / (1000 * 60 * 60))
    let disMinute   = Math.floor(distance / (1000 * 60))
    let disSecond   = Math.floor(distance / (1000))
    // distance = distance / 1000
    // return `${Math.floor(distance)} Second Ago`
    if (disMonth > 0) {
        return `Durasi: ${disMonth} Bulan`
    } else if(disDay > 0){
        return `Durasi: ${disDay} Hari`
    } else if(disHour > 0){
        return `Durasi: ${disHour} Jam`
    } else if(disMinute > 0){
        return `Durasi: ${disMinute} Menit`
    } else if(disSecond > 0){
        return `Durasi: ${disSecond} Detik`
    }
}

app.listen(port, () => {
    console.log(`Server berjalan di port ${port}`)
})