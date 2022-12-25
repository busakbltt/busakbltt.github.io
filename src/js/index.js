import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getDatabase , get, ref, child} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyCF7uOMVYoo-e6sZMhbnqNQzlvkHtFCxQE",
    authDomain: "muh-tas-46dc5.firebaseapp.com",
    databaseURL: "https://muh-tas-46dc5-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "muh-tas-46dc5",
    storageBucket: "muh-tas-46dc5.appspot.com",
    messagingSenderId: "375996400183",
    appId: "1:375996400183:web:0617d976a14e5ad6a8b5b2"
};

var map = L.map('map').setView([40.97575093157534, 39.74853515625], 13);
const osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: ' KAAN DOGAN'
});
osm.addTo(map);



// Firebase Kurulumu
initializeApp(firebaseConfig);
const dbRef = ref(getDatabase());
const data = await get(child(dbRef, `locations/`)).then((snapshot) => {
    if (snapshot.exists()) {
        return snapshot.val()
    } else {
        console.log("No data available");
    }
}).catch((error) => {
    console.error(error);
});

console.log(data)

data.forEach(element => L.marker([element.coordinateX, element.coordinateY]).addTo(map)
    .bindPopup(`<b>${element.name} </b><br><i> ${element.adress} </i>`))





