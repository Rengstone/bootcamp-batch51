const express = require('express')
const path  = require('path')
const { parseArgs } = require('util')
const app = express()
const port = 5000
const config = require('./src/config/config.json')
const {Sequelize, QueryTypes, json} = require('sequelize')
const sequelize = new Sequelize(config.development)
const bcrypt = require('bcrypt')
const session = require('express-session')
const flash = require('express-flash')

app.set("view engine", "hbs")
app.set('views', path.join(__dirname, 'src/views'))

app.use("/asset", express.static('src/asset'))
app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.use(session({
    name: "data",
    secret: 'rahasiabanget',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false,
        maxAge: 1000 * 60 * 60 * 24
    }
}))

app.get('/', home)
app.get('/project', project)
app.get('/testimonial', testimonial)
app.get('/contact', contact)
app.get('/login', loginView)
app.post('/login', login)
app.get('/register', registerView)
app.post('/register', register)

app.post('/addProject', addProject)

app.get('/update-project/:id', updateProjectView)
app.post('/updateProject', updateProject)
app.post('/delete-project/:id', deleteProject)

app.get('/detail-project/:id', detailProject)
app.get('/logout', logout)

function registerView(req, res) {
    res.render('register')
}
async function register(req, res) {
    const {name, email, password } = req.body
    const salt = 10
    bcrypt.hash(password, salt, async(err, hash) => {
        const query = `INSERT INTO users (name, email, password) VALUES ('${name}', '${email}', '${hash}')`
        const register = await sequelize.query(query, {type : QueryTypes.INSERT})
        req.flash('success', 'Akun berhasil dibuat')
        res.redirect('/')
    })

}

function loginView(req, res) {
    res.render('login')
}

async function login(req, res) {
    const {email, password} = req.body
    const query = `SELECT * FROM users WHERE email = '${email}'`
    const obj   = await sequelize.query(query, {type : QueryTypes.SELECT})
    if (!obj.length) {
        req.flash("danger", "User Belum Terdaftar")
        return res.redirect('/login')
    }

    bcrypt.compare(password, obj[0].password, (err, result) => {
        if (!result) {
            req.flash("danger","Password yang anda masukkan salah")
            return res.redirect('/login')
        }

        req.flash('success', 'Login berhasil')
        req.session.isLogin = true
        req.session.user = {
            name: obj[0].name,
            email: obj[0].email
        }
        res.redirect('/')
    })
}

async function home(req, res) {
    const query = "SELECT * FROM projects ORDER BY id ASC"
    const obj   = await sequelize.query(query, {type: QueryTypes.SELECT})
    const data = obj.map(cardItem)

    res.render('index', {data, user:req.session.user, isLogin : req.session.isLogin})
}

function project(req, res){
    res.render('project', {isLogin:req.session.isLogin, user:req.session.user})
}

function testimonial(req, res){
    res.render('testimonial', {isLogin:req.session.isLogin, user:req.session.user})
}

function contact(req, res){
    res.render('contact', {isLogin:req.session.isLogin, user:req.session.user})
}

async function addProject(req, res){
    const {projectName, startDate, endDate, description, technology} = req.body
    let node = ''
    if (technology[0]) {
        node = technology[0]
    }

    let react = ''
    if (technology[1]) {
        react = technology[1]
    }

    let next = ''
    if (technology[2]) {
        next = technology[2]
    }

    let typescript = ''
    if (technology[3]) {
        typescript = technology[3]
    }
    const query     = `INSERT INTO projects (name, start_date, end_date, description, technologies, image) 
    VALUES('${projectName}', '${startDate}', '${endDate}', '${description}', '{"node":"${node}","react":"${react}","next":"${next}","typescript":"${typescript}"}', 'code.jpg')`
    const add   = await sequelize.query(query, {type:QueryTypes.INSERT})

    // res.send("oke")
    res.redirect('/')
}

async function updateProjectView(req, res) {
    const {id} = req.params

    const query = `SELECT * FROM projects WHERE id = ${id}`
    const obj   = await sequelize.query(query, {type : QueryTypes.SELECT})

    const con   = JSON.parse(obj[0].technologies)
    obj[0].technologies = con

    res.render('update-project', {data : obj[0], user : req.session.user, isLogin : req.session.isLogin})
}

async function updateProject(req, res) {
    const {projectName, startDate, endDate, description, technology, id} = req.body

    let node = ''
    if (technology[0]) {
        node = technology[0]
    }

    let react = ''
    if (technology[1]) {
        react = technology[1]
    }

    let next = ''
    if (technology[2]) {
        next = technology[2]
    }

    let typescript = ''
    if (technology[3]) {
        typescript = technology[3]
    }

    const query     = `UPDATE projects SET name = '${projectName}', start_date = '${startDate}', end_date = '${endDate}', description = '${description}', technologies = '{"node":"${node}","react":"${react}","next":"${next}","typescript":"${typescript}"}', image = 'code.jpg' WHERE id = ${id}`
    const add       = await sequelize.query(query, {type:QueryTypes.INSERT})
    res.redirect('/')
}

async function deleteProject(req, res) {
    const  {id}     = req.params
    const query     = `DELETE FROM projects WHERE id = ${id}`
    const hapus    = await sequelize.query(query, {type : QueryTypes.DELETE})
    
    res.redirect('/')
}

async function detailProject(req, res){
    const {id} = req.params

    const query = `SELECT * FROM projects WHERE id = ${id}`
    const obj = await sequelize.query(query, {type: QueryTypes.SELECT})
    
    const duration = getDistanceTime(new Date(obj[0].start_date), new Date(obj[0].end_date))
    obj[0].duration = duration

    const con = JSON.parse(obj[0].technologies)
    obj[0].technologies = con
    res.render('project-detail', {data : obj[0], user : req.session.user, isLogin : req.session.isLogin})
}

function logout(req, res) {

    // req.session.destroy()
    req.session.reload((err) => {
        req.flash('success', 'Berhasil logout')
        res.redirect('/login')
    })

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
        return `${disMonth} Bulan`
    } else if(disDay > 0){
        return `${disDay} Hari`
    } else if(disHour > 0){
        return `${disHour} Jam`
    } else if(disMinute > 0){
        return `${disMinute} Menit`
    } else if(disSecond > 0){
        return `${disSecond} Detik`
    }
}

app.listen(port, () => {
    console.log(`Server berjalan di port ${port}`)
})

function cardItem(item) {
    const duration = getDistanceTime(new Date(item.start_date), new Date(item.end_date))
    const data = {
        id          : item.id,
        name        : item.name,
        duration    : duration,
        start_date  : item.start_date,
        end_date    : item.end_date,
        description : item.description,
        technologies: JSON.parse(item.technologies),
        image       : item.image
    }
    return data
}