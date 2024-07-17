// Определяем карту, координаты центра и начальный масштаб
const map = L.map('map').setView([57.421294, 34.51752], 6);
let markers = [];

// Добавляем на нашу карту слой OpenStreetMap
L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a rel="nofollow" href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

map.on('click', function(e) {
    const lat = e.latlng.lat;
    const lng = e.latlng.lng;

    const liElement = document.createElement('li');
    liElement.className = 'marker-item';

    const textDiv = document.createElement('div');
    textDiv.className = 'marker-text';
    textDiv.innerHTML = `Выбранная точка: ${lat} , ${lng}`;

    // Добавляем новый маркер
    const marker = L.marker([lat, lng]).addTo(map);
    markers.push(marker);

    // Кнопка удаления 
    const removeButton = document.createElement('button');
    removeButton.className = 'remove-button';
    removeButton.innerHTML = '&times;';
    removeButton.onclick = function() {
        // Удаляем маркер с карты
        map.removeLayer(marker);
        // Удаляем элемент списка
        liElement.remove();
    };

    liElement.setAttribute('data-latlng', `${lat},${lng}`);
    liElement.marker = marker;
    liElement.appendChild(textDiv);
    liElement.appendChild(removeButton);
    document.querySelector('.marker-list').appendChild(liElement);
});

// Центрирование карты по клику на элемент списка
document.querySelector('.marker-list').addEventListener('click', function(e) {
    const latlng = e.target.getAttribute('data-latlng').split(',');
    const lat = parseFloat(latlng[0]);
    const lng = parseFloat(latlng[1]);
    map.setView([lat, lng], 10); 
});

// Очистка данных 
document.getElementById('clearDataBtn').addEventListener('click', function() {
    document.querySelector('.marker-list').innerHTML = '';
    markers.forEach(marker => {
        map.removeLayer(marker);
    });
    markers = [];
});

// Фильтр по координатам
document.getElementById('filterInput').addEventListener('input', function() {
    const filterValue = document.getElementById('filterInput').value;
    const markerList = document.querySelector('.marker-list');
    const markerItems = markerList.querySelectorAll('.marker-item');

    markerItems.forEach(item => {
        const latlng = item.getAttribute('data-latlng');
        if (latlng.includes(filterValue)) {
            item.style.display = ''; 
        } else {
            item.style.display = 'none'; 
        }
    });
});