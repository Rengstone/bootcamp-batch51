const express = require('express')
const path  = require('path')
const app = express()
const port = 5000

app.set("view engine", "hbs")
app.set('views', path.join(__dirname, 'src/views'))

app.use("/asset", express.static('src/asset'))
app.use(express.urlencoded({ extended: false }))

app.get('/', home)
app.get('/project', project)
app.get('/testimonial', testimonial)
app.get('/contact', contact)

function home(req, res) {
    const data = [
        {
            title: "Judul 1",
            durasi: "3 bulan",
            content: "Some quick example text to build on the card title and make up the bulk of the card's content.",
            image: "/asset/img/code.jpg",
            java : true,
            playstore: true,
            android: true,
            playstation: true
        },
        {
            title: "Judul 2",
            durasi: "3 bulan",
            content: "Some quick example text to build on the card title and make up the bulk of the card's content.",
            image: "/asset/img/code.jpg",
            java : true,
            playstore: false,
            android: true,
            playstation: false
        },
        {
            title: "Judul 3",
            durasi: "4 bulan",
            content: "Some quick example text to build on the card title and make up the bulk of the card's content.",
            image: "/asset/img/code.jpg",
            java : true,
            playstore: true,
            android: false,
            playstation: true
        },
        {
            title: "Judul 4",
            durasi: "6 bulan",
            content: "Some quick example text to build on the card title and make up the bulk of the card's content.",
            image: "/asset/img/code.jpg",
            java : false,
            playstore: true,
            android: true,
            playstation: true
        },
    ]
    res.render('index', { data })
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

app.listen(port, () => {
    console.log(`Server berjalan di port ${port}`)
})