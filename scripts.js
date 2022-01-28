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
    const {testimonials, hasNext} = await response.json;

    const fragment = document.createDocumentFragment();

    testimonials.forEach(({ message }) => {
        fragment.appendChild(createTestimonialElement(message));
    });
    testimonialDiv.appendChild(fragment);

    if(hasNext){
        afterId = testimonials[testimonials.length - 1].id
    } else {
        testimonialDiv.removeEventListener('scroll', handleScroll);
    }

    canFetchTestimonials = true;
}

function createTestimonialElement(message){
    const testimonialElement = document.createElement('p');
    testimonialElement.classList.add('testimonial');
    testimonialElement.textContent = message;
    return testimonialElement;
};

function createTestimonialUrl(){
    const url = new URL(API_BASE_URL);
    url.searchParams.set('limit', PAGE_SIZE);

    if(afterId != null){
        url.searchParams.set('after', afterId);
    }

    return url;
};