// Variables 
const courses = document.getElementById('courses-list');
const shoppingCartContent = document.querySelector('#cart-content tbody');
const clearCart = document.querySelector('#clear-cart')


//Listeners
loadListeners();

function loadListeners() {
  // When new course is added
  courses.addEventListener('click', buyCourse);

  //Remove a course from cart
  shoppingCartContent.addEventListener('click', removeCourse);

  //Clears the shopping cart
  clearCart.addEventListener('click', cartClear);

  // Document Ready
  document.addEventListener('DOMContentLoaded', getFromLocalStorage);

}



// Functions
function buyCourse(e) {
  e.preventDefault();
  // Check if its a course
  if (e.target.classList.contains('add-to-cart')) {

    // Read course Values
    const course = e.target.parentElement.parentElement;

    // Extract the values
    getCourseInfo(course);
  };
}

// Extracts HTML info of a course
function getCourseInfo(course) {
  // Create Object of Course Data

  const courseInfo = {
    image: course.querySelector('img').src,
    title: course.querySelector('h4').textContent,
    price: course.querySelector('.price span').textContent,
    id: course.querySelector('a').getAttribute('data-id')
  }
  //Insert Data into Cart
  addToCart(courseInfo);
}

// Displays course into shopping cart
function addToCart(course) {
  // create a tr
  const row = document.createElement('tr');

  // Build a template
  row.innerHTML = `
    <tr>
      <td>
        <img src = "${course.image}" width=100>
      </td>
      <td>${course.title}</td>     
      <td>${course.price}</td>     
      <td> <a href="#" class="remove" data-id="${course.id}">X</a> </td>
  `;

  // Add to cart
  shoppingCartContent.appendChild(row);

  // Add course into Local Storage 
  saveIntoStorage(course);
}

// Add the courses into the local storage
function saveIntoStorage(course) {
  let courses = getCoursesFromStorage();

  // add the course into array
  courses.push(course);

  localStorage.setItem('courses', JSON.stringify(courses));
}

// Get courses from storage
function getCoursesFromStorage() {

  let courses;

  // If something already exists in local storage, get its value. Otherwise, create an empty array in that name.
  if (localStorage.getItem('courses') === null) {
    courses = [];
  } else {
    courses = JSON.parse(localStorage.getItem('courses'));
  }
  return courses;

}


// Remove Course form Cart
function removeCourse(e) {
  let course, courseId;
  // Remove from the DOM
  if (e.target.classList.contains('remove')) {
    e.target.parentElement.parentElement.remove();
    course = e.target.parentElement.parentElement;
    courseId = course.querySelector('a').getAttribute('data-id');
  }

  // Remove from Local Storage
  removeCourseLocalStorage(courseId);
}

// Remove Course form local storage
function removeCourseLocalStorage(id) {
  let coursesLS = getCoursesFromStorage();

  // loop through array and find index to remove
  coursesLS.forEach(function (courseLS, index) {
    if (courseLS.id === id) {
      coursesLS.splice(index, 1);
    }
  });

  // Add the rest of the array
  localStorage.setItem('courses', JSON.stringify(coursesLS));
}

//Clear Shopping Cart
function cartClear() {
  shoppingCartContent.innerHTML = '';

  // Clear from local storage
  clearLocalStorage();
}

// Clear local storage

function clearLocalStorage() {
  localStorage.clear();
}

// Loads when document is ready and print into shopping cart

function getFromLocalStorage() {
  let coursesLS = getCoursesFromStorage();

  // loop through courses and print into cart
  coursesLS.forEach(function (course) {
    // create the <tr>

    const row = document.createElement('tr');

    // Print content
    row.innerHTML = `
    <tr> 
      <td>
        <img src = "${course.image}" width=100>
      </td>
      <td>${course.title}</td>     
      <td>${course.price}</td>     
      <td> <a href="#" class="remove" data-id="${course.id}">X</a> </td>
    `;
    shoppingCartContent.appendChild(row);
  })
}