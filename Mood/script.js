// Wait until page fully loads
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('moodForm');
    const entriesDiv = document.getElementById('entries');

    // Load existing entries from LocalStorage
    loadEntries();

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const mood = document.getElementById('mood').value;
        const imageFile = document.getElementById('image').files[0];
        const quote = document.getElementById('quote').value;

        const reader = new FileReader();
        reader.onloadend = function() {
            const newEntry = {
                mood: mood,
                image: reader.result, // Base64 encoded image
                quote: quote,
                date: new Date().toLocaleDateString()
            };

            // Save entry
            saveEntry(newEntry);
            // Display new entry
            displayEntry(newEntry);
            // Reset form
            form.reset();
        };

        if (imageFile) {
            reader.readAsDataURL(imageFile);
        }
    });

    function saveEntry(entry) {
        let entries = JSON.parse(localStorage.getItem('moodEntries')) || [];
        entries.push(entry);
        localStorage.setItem('moodEntries', JSON.stringify(entries));
    }

    function loadEntries() {
        let entries = JSON.parse(localStorage.getItem('moodEntries')) || [];
        entries.forEach(entry => displayEntry(entry));
    }

    function displayEntry(entry) {
        const div = document.createElement('div');
        div.classList.add('entry');

        div.innerHTML = `
            <h3>Mood: ${entry.mood}/10</h3>
            <p>"${entry.quote}"</p>
            <img src="${entry.image}" alt="Mood Image">
            <p><small>${entry.date}</small></p>
        `;

        entriesDiv.prepend(div);
    }
});
