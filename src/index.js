// write your code here

renderRamenImages();
ramenInfo(1);

/* how do you search for the first data set id in the database? */

/* create routes with the query url */
/* fetch all ramen, get first index, ramen[0].id */

/* CONST VARIABLES */

const ramenMenu = document.querySelector('#ramen-menu');
const displayImage = document.querySelector('.detail-image');
const displayName = document.querySelector('.name');
const displayRestaurant = document.querySelector('.restaurant');
const ramenForm = document.querySelector('#ramen-rating');
const rating = ramenForm.querySelector('input[name="rating"]');
const comment = ramenForm.querySelector('input[name="comment"]');

const newForm = document.querySelector('#new-ramen');
const newComment = newForm.querySelector('#new-comment');

const deleteBtn = document.querySelector('#delete-btn');

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
        .then(renderRamenImages);
};

function deleteRamen(id) {
    fetch(`http://localhost:3000/ramens/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => response.json())
        .then(data => { 
            let currentRamen = ramenMenu.querySelector(`[data-id="${id}"]`);
            currentRamen.remove();
        })
};

/* Don't know how to re-render the page for delete + add ramen */

function addNewRamen(newRamenObj) {
    fetch('http://localhost:3000/ramens/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newRamenObj),
    })
        .then(response => response.json())
        .then(data => renderOneImageMenu(data))
};

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
});

newForm.addEventListener('submit', event => {
    event.preventDefault();

    let newRamenObj = {
        name: event.target.name.value,
        restaurant: event.target.restaurant.value,
        image: event.target.image.value,
        rating: event.target.rating.value,
        comment: newComment.value
    };

    addNewRamen(newRamenObj);
});

deleteBtn.addEventListener('click', event => {
    const deleteItemId = ramenForm.dataset.id
    deleteRamen(deleteItemId);
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
        renderOneImageMenu(ramen)
    })

    ramenMenu.addEventListener('click', event => {
        const currentId = event.target.dataset.id;
        ramenInfo(currentId);
    })
}

function renderOneImageMenu(ramen) {
    const img = document.createElement('img');
    img.src = ramen.image;
    img.alt = ramen.name;
    img.dataset.id = ramen.id;

    ramenMenu.append(img);
}