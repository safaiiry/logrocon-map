var markerData = [];

document.getElementById('saveDataBtn').addEventListener('click', function() {
    var listItems = document.querySelectorAll('.marker-item');
    
    listItems.forEach(function(item) {
        var coordinates = item.textContent.split(': ')[1].split(' , ');
        var lat = parseFloat(coordinates[0]);
        var lng = parseFloat(coordinates[1]);

        var markerObj = { lat: lat, lng: lng };
        markerData.push(markerObj);
    })
    console.log(markerData);
});

