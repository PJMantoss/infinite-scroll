const API_BASE_URL = 'https://www.algoexpert.io/api/testimonial';
const PAGE_SIZE = 5;

let canFetchTestimonials = true;
let afterId = null;

const testimonialDiv = document.getElementById('testimonial-container');

testimonialDiv.addEventListener('scroll', handleScroll);

fetchAndDisplayTestimonials();

function handleScroll(){
    if(!canFetchTestimonials) return;
}