// script1.js

import { clearMarkers } from './mapModule.js';
import { clearList, filterList } from './listModule.js';

document.getElementById('clearDataBtn').addEventListener('click', function() {
    clearList();
    clearMarkers();
});


document.getElementById('filterInput').addEventListener('input', function() {
    const filterValue = document.getElementById('filterInput').value;
    filterList(filterValue);
});