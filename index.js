const wordOfTheDay = document.getElementById("word-of-the-day");
const quoteOfTheDay = document.getElementById("quote");

fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature")
    .then(res => res.json())
    .then(data => {
        document.body.style.backgroundImage = `url(${data.urls.regular})`;
    });

fetch("https://random-word-api.vercel.app/api?words=1")
    .then(response => response.json())
    .then(word => {
        fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
            .then(response => response.json())
            .then(data => {
                wordOfTheDay.innerHTML = `
                    <p>Word of the day: <span id="word-highlight">${data[0].word}</span></p>
                    <p>${data[0].meanings[0].definitions[0].definition}</p>
                `;
            })
            .catch(error => console.error('Error fetching word definition:', error));
    })
    .catch(error => console.error('Error fetching word:', error));

fetch('https://api.api-ninjas.com/v1/quotes', {
    method: 'GET',
    headers: { 'X-Api-Key': 'k7JRpdrOpv9hyqVIQidOTQ==8aWyh6QzpF6d5F4I' }
})
    .then(response => response.json())
    .then(data => {
        quoteOfTheDay.innerHTML = `
            <p>${data[0].quote}</p>
            <p>- ${data[0].author}</p>
        `;
    })
    .catch(error => console.error('Error fetching quote:', error));

navigator.geolocation.getCurrentPosition(position => {
    fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=imperial`)
        .then(res => {
            if (!res.ok) {
                throw Error("Weather data not available");
            }
            return res.json();
        })
        .then(data => {
            const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
            document.getElementById("weather").innerHTML = `
                <img src=${iconUrl} />
                <p>${Math.round(data.main.temp)}º</p>
                <p>${data.name}</p>
            `;
        })
        .catch(err => console.error(err));
});

function getCurrentTime() {
    const date = new Date();
    document.getElementById("time").textContent = date.toLocaleTimeString("en-us", { timeStyle: "short" });
}

setInterval(getCurrentTime, 1000);

const input = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const todoList = document.getElementById("todo-list");

addBtn.addEventListener("click", () => {
    if (input.value.trim() !== "") {
        const li = document.createElement("li");
        li.innerHTML = `${input.value} <button class="delete-btn">x</button>`;

        li.querySelector(".delete-btn").addEventListener("click", () => {
            li.remove();
        });

        todoList.appendChild(li);
        input.value = "";
    }
});
