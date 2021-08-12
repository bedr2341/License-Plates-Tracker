const stateNames = ["Alabama", "Alaska", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Iowa", "Idaho", "Illinois", "Indiana", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Missouri", "Mississippi", "Montana", "North Carolina", "North Dakota", "Nebraska", "New Hampshire", "New Jersey", "New Mexico", "Nevada", "New York", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Virginia", "Vermont", "Washington", "Wisconsin", "West Virginia", "Wyoming"];

const dropdownButton = document.getElementById('stateDropdownButton');
const dropdownLinks = document.getElementById('dropdown-links');
const sightingCards = document.getElementById('sightingCards');

function setupDropdown() {
    // create the dropdown items
    stateNames.forEach((state) => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.classList.add('dropdown-item');
        a.innerText = state;

        // add onclick to dropdown items
        a.addEventListener('click', () => {
            dropdownButton.innerText = state;
            populateSightingCards(state);
        });

        li.appendChild(a);
        dropdownLinks.appendChild(li);
    });

    // default state
    dropdownButton.innerText = stateNames[0];
    populateSightingCards(stateNames[0]);

    auth.signInAnonymously();
}

// initializes/refreshes the list
function populateSightingCards(stateName) {
    sightingCards.innerHTML = "";
    getStateData(stateName, sightingCards);
}

// creates the sighting cards using state firestore sighitng data
function createCard(stateName, stateData) {
    const card = document.createElement('div');
    card.classList.add('card', 'mt-3');

    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    const row = document.createElement('div');
    row.classList.add('row');

    row.appendChild(createCardText(stateData));
    row.appendChild(createCardButtons(stateName, stateData.id));

    cardBody.appendChild(row);
    card.appendChild(cardBody);

    return card;
}

function createCardText(stateData) {
    const cardTextContainer = document.createElement('div');
    cardTextContainer.classList.add('col-12', 'col-lg-10');

    const cardText = document.createElement('p');
    cardText.classList.add('card-text');
    cardText.innerText = `Date and Time: ${stateData.data().dateTime}\nLocation: ${stateData.data().location}`

    cardTextContainer.appendChild(cardText);

    return cardTextContainer;
}

function createCardButtons(stateName, sightingId) {
    const cardButtonContainer = document.createElement('div');
    cardButtonContainer.classList.add('col-12', 'col-lg-2');

    const buttonGroup = document.createElement('div');
    buttonGroup.classList.add('btn-group');
    buttonGroup.setAttribute('role', 'group');

    const modifyButton = document.createElement('button');
    modifyButton.classList.add('btn', 'btn-warning');
    modifyButton.type = 'button';
    modifyButton.innerText = "Modify";

    modifyButton.addEventListener('click', () => {

    });

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('btn', 'btn-danger');
    deleteButton.type = 'button';
    deleteButton.innerText = "Delete";

    deleteButton.addEventListener('click', () => {
        deleteData(stateName, sightingId)
    });

    buttonGroup.appendChild(modifyButton);
    buttonGroup.appendChild(deleteButton);

    cardButtonContainer.appendChild(buttonGroup);

    return cardButtonContainer;
}