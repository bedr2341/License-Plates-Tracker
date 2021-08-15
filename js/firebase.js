const db = firebase.firestore();
const auth = firebase.auth();

const statesRef = db.collection("states");

async function addPlateSighting(stateName, date, time, location) {
    // Update the sighting counter
    await statesRef.doc(stateName).get().then((doc) => {
        if (doc.exists) {
            counter = doc.data().sightingCounter;
            statesRef.doc(stateName).update({
                sightingCounter: counter + 1
            });
        } else {
            statesRef.doc(stateName).set({
                sightingCounter: 1
            });
        }
    });

    // Add sighting to the state's sighting collection
    await statesRef.doc(stateName).collection("sightings").add({
        date: date,
        time: time,
        location: location,
    }).then(() => {
        return true;
    }).catch((error) => {
        return false;
    });
}

async function getStates() {
    const snapshot = await firebase.firestore().collection('states').get()
    return snapshot.docs.map(doc => doc.data());
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
            sightingCounter: counter - 1
        });
    });

    // delete the sighting document
    statesRef.doc(stateName).collection("sightings").doc(sightingId).delete();
    
    // refresh the list
    populateSightingCards(stateName);
}