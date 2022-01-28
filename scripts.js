const API_BASE_URL = 'https://www.algoexpert.io/api/testimonial';
const PAGE_SIZE = 5;

let canFetchTestimonials = true;
let afterId = null;

const testimonialDiv = document.getElementById('testimonial-container');

testimonialDiv.addEventListener('scroll', handleScroll);

fetchAndDisplayTestimonials();

function handleScroll(){
    if(!canFetchTestimonials) return;
    const bottomSpaceLeftToScroll = (
        this.scrollHeight - this.scrollTop - this.clientHeight
    );

    if(bottomSpaceLeftToScroll > 0) return;

    fetchAndDisplayTestimonials();
}

async function fetchAndDisplayTestimonials(){
    canFetchTestimonials = false;
    const url = createTestimonials();
    const response = await fetch(url);
}