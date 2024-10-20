
function startTimer(duration, display) {
    let timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = Math.floor(timer / 60);
        seconds = timer % 60;

        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            timer = duration;
        }
    }, 1000);
}


window.onload = function () {
    let fiveMinutes = 60 * 5,
        display = document.createElement('div');
    display.setAttribute('id', 'countdown');
    display.style.fontSize = '20px';
    display.style.fontWeight = 'bold';
    display.style.marginTop = '10px';
    display.style.color = '#4CAF50';
    display.textContent = "Limited-time discount: 05:00";
    document.getElementById('services').appendChild(display);
    startTimer(fiveMinutes, display);
};

const apiUrl = "https://randomuser.me/api/?results=5";

function fetchData() {
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            displayData(data.results);
            document.getElementById("loading-message").style.display = 'none';
        })
        .catch(error => {
            document.getElementById("error-message").textContent = "Failed to fetch data. Please try again later.";
            document.getElementById("loading-message").style.display = 'none';
        });
}

let apiUsers = [];


function displayData(users) {
    apiUsers = users;
    const container = document.getElementById("data-container");
    container.innerHTML = "";
    users.forEach(user => {
        const userDiv = document.createElement('div');
        userDiv.className = 'user';
        userDiv.innerHTML = `
            <p><strong>Name:</strong> ${user.name.first} ${user.name.last}</p>
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>Location:</strong> ${user.location.city}, ${user.location.country}</p>
            <img src="${user.picture.thumbnail}" alt="${user.name.first}">
        `;
        container.appendChild(userDiv);
    });
}

fetchData();

document.getElementById("filter-button").addEventListener("click", function() {
    const filteredUsers = apiUsers.filter(user => user.name.first[0].toLowerCase() <= 'm');
    displayData(filteredUsers);
});

document.getElementById("sort-button").addEventListener("click", function() {
    const sortedUsers = [...apiUsers].sort((a, b) => a.name.last.localeCompare(b.name.last));
    displayData(sortedUsers);
});

document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;
    
    if (name && email && message) {
        alert("Thank you for contacting us, " + name + ". We will get back to you soon.");
        document.getElementById("contactForm").reset();
    } else {
        alert("Please fill in all fields.");
    }
});