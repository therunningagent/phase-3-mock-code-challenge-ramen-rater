// write your code here

renderRamenImages();

/* CONST VARIABLES */

const ramenMenu = document.querySelector('#ramen-menu');
const displayImage = document.querySelector('.detail-image');
const displayName = document.querySelector('.name');
const displayRestaurant = document.querySelector('.restaurant');
const ramenForm = document.querySelector('#ramen-rating');
let rating = ramenForm.querySelector('input[name="rating"]');
let comment = ramenForm.querySelector('input[name="comment"]');

/* FETCH REQUESTS */

function renderRamenImages() {
    fetch('http://localhost:3000/ramens')
        .then(res => res.json())
        .then(renderRamenMenu);
};

function ramenInfo(id) {
    fetch(`http://localhost:3000/ramens/${id}`)
        .then(res => res.json())
        .then(displayRamenInfo);
};

function updateRatingComment(id, updatedRamenObj) {
    fetch(`http://localhost:3000/ramens/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedRamenObj),
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
}

/* Event Listeners */

// if (ramenForm.dataset.id === typeOf ramenForm.dataset.id)
ramenForm.addEventListener('submit', event => {
    event.preventDefault();
    // console.log(typeof (ramenForm.dataset.id));
    let updatedRamenObj = {
        rating: event.target.rating.value, 
        comment: event.target.comment.value
    };
    updateRatingComment(event.target.dataset.id, updatedRamenObj);
})

/* DOM MANIPULATION */

function displayRamenInfo(ramen) {
    displayImage.src = ramen.image;
    displayImage.alt = ramen.name;
    displayName.textContent = ramen.name;
    displayRestaurant.textContent = ramen.restaurant;
    ramenForm.dataset.id = parseInt(ramen.id);
    rating.value = ramen.rating;
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