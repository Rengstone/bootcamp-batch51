class Testimonial {
    constructor(name, review, image){
        this.name = name
        this.review = review
        this.image = image
    }

    html(){
        return `
            <div class="testimonial-card">
                <img src="${this.image}" alt="">
                <p>${this.review}</p>
                <h4>- ${this.name}</h4>
            </div>
        `
    }
}

const testimonial1 = new Testimonial("Moch. Dira Issyari", "Mantap Headshot", "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=600")
const testimonial2 = new Testimonial("Dicky Firmanda", "Selamat Menjahit", "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=600")
const testimonial3 = new Testimonial("Rifky Fatah Maliki", "Akuuuu Mau Makaaaan", "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=600")

const testimonials = [testimonial1, testimonial2, testimonial3]

let testimonialHTML = ``
for (let index = 0; index < testimonials.length; index++) {
    testimonialHTML += testimonials[index].html()
}

document.getElementById('content').innerHTML = testimonialHTML