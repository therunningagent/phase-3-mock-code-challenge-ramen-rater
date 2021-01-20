// write your code here

renderRamenImages();

/* CONST VARIABLES */

const ramenMenu = document.querySelector('#ramen-menu');
const displayImage = document.querySelector('.detail-image');
const displayName = document.querySelector('.name');
const displayRestaurant = document.querySelector('.restaurant');
const ramenForm = document.querySelector('#ramen-rating');
const displayRating = document.querySelector('input[name="rating"]');


/* FETCH REQUESTS */

function renderRamenImages() {
    fetch('http://localhost:3000/ramens')
        .then(res => res.json())
        .then(renderRamenMenu);
};

function ramenInfo(id) {
    fetch(`http://localhost:3000/ramens/${id}`)
        .then(res => res.json())
        .then(console.log);
};

/* DOM MANIPULATION */

function displayRamenInfo(ramen){

}

/* RENDER FUNCTIONS */

function renderRamenMenu(ramenArray) {
    ramenArray.forEach(ramen => {
        const img = document.createElement('img');
        img.src = ramen.image;
        img.alt = ramen.name;
        img.dataset.id = ramen.id;

        ramenMenu.append(img);
    })

    ramenMenu.addEventListener('click', event => {
        const currentId = event.target.dataset.id;
        ramenInfo(currentId);
    })
}