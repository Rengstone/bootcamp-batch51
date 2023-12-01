const promise = new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open("GET", "https://api.npoint.io/866a0ad94d4790605445", true)
    xhr.onload = () => {
        if (xhr.status === 200) {
            resolve(JSON.parse(xhr.response))
        }else{
            reject("Internal Server Error")
        }
    }

    xhr.onerror = () => {
        reject("Tidak ada internet")
    }

    xhr.send()
})

function show(item) {
    return `
    <div class="testimonial-card">
        <img src="${item.image}" alt="">
        <p>${item.review}</p>
        <h4>- ${item.author}</h4>
        <h4>${item.rating} <i class="fa-solid fa-star"></i></h4>
    </div>`
}

async function allRating(){
    let ratingHTML = ``
    const reviewData = await promise
    reviewData.forEach((item) => {
        ratingHTML += show(item)
    })

    document.getElementById('content').innerHTML = ratingHTML
}

allRating()

async function filterRating(rating){
    let ratingHTML = ``
    const reviewData = await promise
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