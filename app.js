// ================= SEARCH ROOM FORM =================
const searchForm = document.getElementById('searchForm');

if (searchForm) {
    searchForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const locationInput = searchForm.querySelector('input[placeholder="Enter Location"]').value.toLowerCase();
        const maxRent = parseInt(searchForm.querySelector('input[placeholder="Max Rent (₹)"]').value) || Infinity;
        const roomType = searchForm.querySelector('select').value;

        const resultsDiv = document.getElementById('searchResults');
        resultsDiv.innerHTML = '';

        const rooms = [
            { location: 'Delhi', rent: 5000, type: 'Single', status: 'Available', address: 'Near ABC College', contact: '9876543210' },
            { location: 'Mumbai', rent: 7000, type: 'Double', status: 'Booked', address: 'XYZ Area', contact: '9876543211' },
            { location: 'Pune', rent: 6000, type: '1 BHK', status: 'Available', address: 'Near University', contact: '9876543212' },
            { location: 'Delhi', rent: 4500, type: '2 BHK', status: 'Available', address: 'Close to Campus', contact: '9876543213' },
            { location: 'Bangalore', rent: 8000, type: '3 BHK', status: 'Available', address: 'Tech Park Area', contact: '9876543214' },
            { location: 'Chennai', rent: 5500, type: 'Single', status: 'Available', address: 'Near IT Hub', contact: '9876543215' }
        ];

        const filteredRooms = rooms.filter(room => {
            const matchesLocation = !locationInput || room.location.toLowerCase().includes(locationInput);
            const matchesRent = room.rent <= maxRent;
            const matchesType = !roomType || room.type.toLowerCase().replace(' ', '') === roomType.toLowerCase();
            return matchesLocation && matchesRent && matchesType;
        });

        // Redirect to results page with data
        const resultsData = encodeURIComponent(JSON.stringify(filteredRooms));
        window.location.href = `search-results.html?results=${resultsData}`;
    });
}

function contactOwner(contact) {
    alert(`Contact the owner at: ${contact}`);
}
