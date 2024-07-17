let markerData = [];

document.getElementById('saveDataBtn').addEventListener('click', function() {
    const listItems = document.querySelectorAll('.marker-item');
    
    listItems.forEach(function(item) {
        const coordinates = item.textContent.split(': ')[1].split(' , ');
        const lat = parseFloat(coordinates[0]);
        const lng = parseFloat(coordinates[1]);

        const markerObj = { lat: lat, lng: lng };
        markerData.push(markerObj);
    });
    console.log(markerData);
});
