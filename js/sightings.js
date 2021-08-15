const stateNames = ["Alabama", "Alaska", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Iowa", "Idaho", "Illinois", "Indiana", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Missouri", "Mississippi", "Montana", "North Carolina", "North Dakota", "Nebraska", "New Hampshire", "New Jersey", "New Mexico", "Nevada", "New York", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Virginia", "Vermont", "Washington", "Wisconsin", "West Virginia", "Wyoming"];

var myModal = document.getElementById('stateModal');

const dropdownButton = document.getElementById('stateDropdownButton');
const dropdownLinks = document.getElementById('dropdown-links');

let selectedState = "";

const locationInput = document.getElementById('locationInput');
const dateInput = document.getElementById('dateInput');
const timeInput = document.getElementById('timeInput');
const addButton = document.getElementById('addButton');

// create the dropdown items
stateNames.forEach((state) => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.classList.add('dropdown-item');
    a.innerText = state;

    // add onclick to dropdown items
    a.addEventListener('click', () => {
        dropdownButton.innerText = state;
        selectedState = state;
    });

    li.appendChild(a);
    dropdownLinks.appendChild(li);
});

function addSighting() {
    // get values
    const location = locationInput.value;
    const date = dateInput.value;
    const time = timeInput.value;

    addPlateSighting(selectedState, date, time, location);

    // reset form
    locationInput.value = "";
    dateInput.value = "";
    timeInput.value = "";

    alert('Submitted the sighting!');
}