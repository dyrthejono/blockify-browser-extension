document.getElementById('locationButton').addEventListener('click', function() {
    // Request permission and capture location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                const coords = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                };
                
                // Send coordinates to backend
                fetch('/location', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(coords)
                })
                .then(response => {
                    if (response.ok) {
                        document.getElementById('success').classList.remove('hidden');
                        document.getElementById('error').classList.add('hidden');
                    } else {
                        document.getElementById('error').classList.remove('hidden');
                        document.getElementById('success').classList.add('hidden');
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    document.getElementById('error').classList.remove('hidden');
                    document.getElementById('success').classList.add('hidden');
                });
            },
            error => {
                console.error('Geolocation error:', error);
                document.getElementById('error').classList.remove('hidden');
                document.getElementById('success').classList.add('hidden');
            }
        );
    } else {
        alert("Geolocation is not supported by this browser.");
    }
});