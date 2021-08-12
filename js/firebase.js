const db = firebase.firestore();
const auth = firebase.auth();

const statesRef = db.collection("states");

function addPlateSighting(stateName, dateTime, location) {
    // Update the sighting counter
    statesRef.doc(stateName).get().then((doc) => {
        counter = doc.data().sightingCounter;
        statesRef.doc(stateName).update({
            sightingCounter: counter + 1
        });
    });

    // Add sighting to the state's sighting collection
    statesRef.doc(stateName).collection("sightings").add({
        dateTime: dateTime,
        location: location
    });
}

function getStateData(stateName, htmlElement) {
    // get sighting counter
    statesRef.doc(stateName).get().then((doc) => {
        console.log(doc.data());
        doc.data().sightingCounter;
    });

    // get state sightings
    statesRef.doc(stateName).collection("sightings").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            htmlElement.appendChild(createCard(stateName, doc));
        });
    });
}

function deleteData(stateName, sightingId) {
    // Update the sighting counter
    statesRef.doc(stateName).get().then((doc) => {
        counter = doc.data().sightingCounter;
        statesRef.doc(stateName).update({
            sightingCounter: counter + 1
        });
    });

    // delete the sighting document
    statesRef.doc(stateName).collection("sightings").doc(sightingId).delete();

    // refresh the list
    populateSightingCards(stateName);
}