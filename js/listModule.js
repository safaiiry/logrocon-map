// listModule.js

import { addMarker, removeMarker, centerMap } from './mapModule.js';

const markerListElement = document.querySelector('.marker-list');


export function addListItem(lat, lng) {
    const liElement = document.createElement('li');
    liElement.className = 'marker-item';

    const textDiv = document.createElement('div');
    textDiv.className = 'marker-text';
    textDiv.innerHTML = `Выбранная точка: ${lat} , ${lng}`;

    const marker = addMarker(lat, lng);

    const removeButton = document.createElement('button');
    removeButton.className = 'remove-button';
    removeButton.innerHTML = '&times;';
    removeButton.onclick = function() {
        removeMarker(marker);
        liElement.remove();
    };

    textDiv.setAttribute('data-latlng', `${lat},${lng}`);
    liElement.marker = marker;
    liElement.appendChild(textDiv);
    liElement.appendChild(removeButton);
    markerListElement.appendChild(liElement);
}


export function clearList() {
    markerListElement.innerHTML = '';
}


export function filterList(filterValue) {
    const markerItems = markerListElement.querySelectorAll('.marker-item');
    markerItems.forEach(item => {
        const latlng = item.querySelector('.marker-text').getAttribute('data-latlng');
        if (latlng.includes(filterValue)) {
            item.style.display = '';
        } else {
            item.style.display = 'none';
        }
    });
}


markerListElement.addEventListener('click', function(e) {
    const target = e.target.closest('.marker-text');
    if (target) {
        const latlng = target.getAttribute('data-latlng').split(',');
        const lat = parseFloat(latlng[0]);
        const lng = parseFloat(latlng[1]);
        centerMap(lat, lng);
    }
});

