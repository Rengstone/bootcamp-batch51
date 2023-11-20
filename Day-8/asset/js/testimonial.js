// class Testimonial {
//     constructor(name, review, image){
//         this.name = name
//         this.review = review
//         this.image = image
//     }

//     html(){
//         return `
//             <div class="testimonial-card">
//                 <img src="${this.image}" alt="">
//                 <p>${this.review}</p>
//                 <h4>- ${this.name}</h4>
//             </div>
//         `
//     }
// }

// const testimonial1 = new Testimonial("Moch. Dira Issyari", "Mantap Headshot", "https://scontent.fbth6-1.fna.fbcdn.net/v/t1.18169-9/26219807_569354896750101_1845471546863480537_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=be3454&_nc_eui2=AeFmAL3RufGyEXmvp4SN0z6VLDz55T3FFjUsPPnlPcUWNVji--tD0-mKvXFzayrTyS1DbvPQRLqdKCH4Y6AhryHa&_nc_ohc=mVu7EDlK3cAAX9YQvEk&_nc_oc=AQn9KwfZldMPo6C7yNVPv9qhvzbzLpZXbfx2m4ITaFZAdAaQjPXJNN0BYy3seR4G0hY&_nc_ht=scontent.fbth6-1.fna&oh=00_AfARutp1B9QXN7o9yWB4YLDEjfxOmLPdbXJhIW_SlrKJlg&oe=657C20AB")
// const testimonial2 = new Testimonial("Dicky Firmanda", "Selamat Menjahit", "https://scontent.fbth6-1.fna.fbcdn.net/v/t1.18169-9/26219807_569354896750101_1845471546863480537_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=be3454&_nc_eui2=AeFmAL3RufGyEXmvp4SN0z6VLDz55T3FFjUsPPnlPcUWNVji--tD0-mKvXFzayrTyS1DbvPQRLqdKCH4Y6AhryHa&_nc_ohc=mVu7EDlK3cAAX9YQvEk&_nc_oc=AQn9KwfZldMPo6C7yNVPv9qhvzbzLpZXbfx2m4ITaFZAdAaQjPXJNN0BYy3seR4G0hY&_nc_ht=scontent.fbth6-1.fna&oh=00_AfARutp1B9QXN7o9yWB4YLDEjfxOmLPdbXJhIW_SlrKJlg&oe=657C20AB")
// const testimonial3 = new Testimonial("Rifky Fatah Maliki", "Akuuuu Mau Makaaaan", "https://scontent.fbth6-1.fna.fbcdn.net/v/t1.18169-9/26219807_569354896750101_1845471546863480537_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=be3454&_nc_eui2=AeFmAL3RufGyEXmvp4SN0z6VLDz55T3FFjUsPPnlPcUWNVji--tD0-mKvXFzayrTyS1DbvPQRLqdKCH4Y6AhryHa&_nc_ohc=mVu7EDlK3cAAX9YQvEk&_nc_oc=AQn9KwfZldMPo6C7yNVPv9qhvzbzLpZXbfx2m4ITaFZAdAaQjPXJNN0BYy3seR4G0hY&_nc_ht=scontent.fbth6-1.fna&oh=00_AfARutp1B9QXN7o9yWB4YLDEjfxOmLPdbXJhIW_SlrKJlg&oe=657C20AB")

// const testimonials = [testimonial1, testimonial2, testimonial3]

// let testimonialHTML = ``
// for (let index = 0; index < testimonials.length; index++) {
//     testimonialHTML += testimonials[index].html()
// }

// document.getElementById('content').innerHTML = testimonialHTML

const reviewData = [
    {
        author : "Dwi Fadillah",
        review : "Wah Seru Belajar Javascript",
        image : "https://images.pexels.com/photos/1643457/pexels-photo-1643457.jpeg?auto=compress&cs=tinysrgb&w=600",
        rating : 3
    },
    {
        author : "Dwi Fadillah",
        review : "Wah Seru Belajar Javascript",
        image : "https://images.pexels.com/photos/1643457/pexels-photo-1643457.jpeg?auto=compress&cs=tinysrgb&w=600",
        rating : 2
    },
    {
        author : "Dwi Fadillah",
        review : "Wah Seru Belajar Javascript",
        image : "https://images.pexels.com/photos/1643457/pexels-photo-1643457.jpeg?auto=compress&cs=tinysrgb&w=600",
        rating : 4
    },
    {
        author : "Dwi Fadillah",
        review : "Wah Seru Belajar Javascript",
        image : "https://images.pexels.com/photos/1643457/pexels-photo-1643457.jpeg?auto=compress&cs=tinysrgb&w=600",
        rating : 1
    },
    {
        author : "Dwi Fadillah",
        review : "Wah Seru Belajar Javascript",
        image : "https://images.pexels.com/photos/1643457/pexels-photo-1643457.jpeg?auto=compress&cs=tinysrgb&w=600",
        rating : 5
    }
]

function show(item) {
    return `
    <div class="testimonial-card">
        <img src="${item.image}" alt="">
        <p>${item.review}</p>
        <h4>- ${item.author}</h4>
        <h4>${item.rating} <i class="fa-solid fa-star"></i></h4>
    </div>`
}

function allRating(){
    let ratingHTML = ``
    reviewData.forEach((item) => {
        ratingHTML += show(item)
    })

    document.getElementById('content').innerHTML = ratingHTML
}

allRating()

function filterRating(rating){
    let ratingHTML = ``
    const ratingFiltered = reviewData.filter((item) => {
        return item.rating === rating
    })

    if(ratingFiltered.length === 0){
        ratingHTML = "<h4> Not Found </h4>"
    }else{
        ratingFiltered.forEach((item) => {
            ratingHTML += show(item)
        })
    }

    document.getElementById('content').innerHTML = ratingHTML
}