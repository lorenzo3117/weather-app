// Variables
const warningMessage = document.querySelector("#warningMessage")
const cityInput = document.querySelector("#cityInput")
const results = document.querySelector(".results")

// Main function
async function weather() {
    try {
        // Take city from input and reset input field
        city = cityInput.value;
        cityInput.value = "";

        // Get api response and make it into a Json
        // UNSECURED API KEY, but I see everytime it get used so I can cancel it if it get stolen
        const apiResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=02587cc48685af80ea225c1601e4f792&units=metric`);
        const jsonData = await apiResponse.json();

        if (jsonData.message == "city not found") {
            warningMessage.style.display = "flex";
        } else {
            // Removes warning message
            warningMessage.style.display = "none";

            // Puts the Json into an array and launches updateTable function
            let arrayJson = [jsonData][0];
            updateTable(results, arrayJson);
        }
    } 
    
    catch (error) {
        console.log(error);
    }
}

// Function to update the table
function updateTable(results, data) {
    try {
        // Make google map links
        const googleMapsLink = `https://www.google.com/maps/search/?api=1&query=${data.coord.lat},${data.coord.lon}`
        // Make new result card
        let newResultCard = `<div class="result"><h2>${data.name}, ${data.sys.country}</h2><p>Temperature: ${data.main.temp}C</p><p>Humidity: ${data.main.humidity}%</p><p>Status: ${data.weather[0].description}</p><div class="link"><p>Map: <a href="${googleMapsLink}" target="_blank">link</a></p></div></div>`
        // Adds tje new result card to results div
        results.innerHTML += newResultCard
    } catch (error) {
        console.log(error);
    }
}
