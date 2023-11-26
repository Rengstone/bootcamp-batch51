const reviewData = [
    {
        author : "Moch. Dira Issyari",
        review : "Wah Seru Belajar Javascript",
        image : "https://images.pexels.com/photos/1643457/pexels-photo-1643457.jpeg?auto=compress&cs=tinysrgb&w=600",
        rating : 3
    },
    {
        author : "Moch. Dira Issyari",
        review : "Wah Seru Belajar Javascript",
        image : "https://images.pexels.com/photos/1643457/pexels-photo-1643457.jpeg?auto=compress&cs=tinysrgb&w=600",
        rating : 2
    },
    {
        author : "Moch. Dira Issyari",
        review : "Wah Seru Belajar Javascript",
        image : "https://images.pexels.com/photos/1643457/pexels-photo-1643457.jpeg?auto=compress&cs=tinysrgb&w=600",
        rating : 4
    },
    {
        author : "Moch. Dira Issyari",
        review : "Wah Seru Belajar Javascript",
        image : "https://images.pexels.com/photos/1643457/pexels-photo-1643457.jpeg?auto=compress&cs=tinysrgb&w=600",
        rating : 1
    },
    {
        author : "Moch. Dira Issyari",
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