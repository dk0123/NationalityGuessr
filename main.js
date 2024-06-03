const countries = [
    { name: "India", flag: "https://flagcdn.com/in.svg" },
    { name: "Indonesia", flag: "https://flagcdn.com/id.svg" },
    { name: "Iceland", flag: "https://flagcdn.com/is.svg" },
    { name: "Ireland", flag: "https://flagcdn.com/ie.svg" },
    { name: "Italy", flag: "https://flagcdn.com/it.svg" },
    { name: "Iran", flag: "https://flagcdn.com/ir.svg" },
    { name: "Iraq", flag: "https://flagcdn.com/iq.svg" },
    { name: "Israel", flag: "https://flagcdn.com/il.svg" },
    { name: "Ivory Coast", flag: "https://flagcdn.com/ci.svg" },
    // Add more countries and their flags
];

function filterCountries() {
    const input = document.getElementById('nationalityGuess').value.toLowerCase();
    const suggestionsList = document.getElementById('suggestionsList');
    suggestionsList.innerHTML = ''; // Clear previous suggestions

    if (input === '') {
        suggestionsList.style.display = 'none'; // Hide suggestions if input is empty
        return;
    }

    const filteredCountries = countries.filter(country => country.name.toLowerCase().startsWith(input));
    if (filteredCountries.length > 0) {
        suggestionsList.style.display = 'block'; // Show suggestions if there are matches
    } else {
        suggestionsList.style.display = 'none'; // Hide suggestions if no matches
    }

    filteredCountries.forEach(country => {
        const li = document.createElement('li');
        li.onclick = () => {
            document.getElementById('nationalityGuess').value = country.name;
            suggestionsList.innerHTML = '';
            suggestionsList.style.display = 'none'; // Hide suggestions after selecting
        };

        const img = document.createElement('img');
        img.src = country.flag;
        img.alt = country.name;

        li.appendChild(img);
        li.appendChild(document.createTextNode(country.name));
        suggestionsList.appendChild(li);
    });
}

function submitGuess() {
    console.log("submitGuess called");
    const id = document.getElementById('personImage').dataset.id;
    const guess = document.getElementById('nationalityGuess').value;

    console.log("ID:", id, "Guess:", guess);

    fetch('http://localhost:3000/api/nationality-guess', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id, guess })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        const resultElement = document.getElementById('result');
        console.log("Server Response:", data);
        if (data.correct) {
            resultElement.textContent = "Correct! The nationality is indeed " + data.correctNationality;
            resultElement.style.color = "green";
        } else {
            resultElement.textContent = "Incorrect! The actual nationality is " + data.correctNationality;
            resultElement.style.color = "red";
        }
    })
    .catch(error => {
        console.error('Error submitting guess:', error);
        alert("Failed to submit guess: " + error.message);
    });
}
