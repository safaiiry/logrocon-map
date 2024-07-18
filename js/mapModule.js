// mapModule.js

import { addListItem } from './listModule.js';

export const map = L.map('map').setView([57.421294, 34.51752], 6);
let markers = [];

L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a rel="nofollow" href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

export function addMarker(lat, lng) {
    const marker = L.marker([lat, lng]).addTo(map);
    markers.push(marker);
    return marker;
}

export function removeMarker(marker) {
    map.removeLayer(marker);
    markers = markers.filter(m => m !== marker);
}

export function clearMarkers() {
    markers.forEach(marker => map.removeLayer(marker));
    markers = [];
}

export function centerMap(lat, lng, zoom = 10) {
    map.setView([lat, lng], zoom);
}

map.on('click', function(e) {
    const lat = e.latlng.lat;
    const lng = e.latlng.lng;
    addListItem(lat, lng);  
});


