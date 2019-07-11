//Weather app
function weather() {
    // Take city from input and reset input field
    var city = document.querySelector("#cityInput").value;
    document.querySelector("#cityInput").value = "";

    // General variables
    const api = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=02587cc48685af80ea225c1601e4f792&units=metric";
    var warning = document.querySelector("#warningMessage");

    // Fetch the api
    fetch(api)

        // Check if there are any errors with the function handleErrors
        .then(handleErrors)

        // If the are no errors, get Json response from api
        .then(function (JsonResponse) {
            return JsonResponse.Json();
        })

        // Use api data to make table
        .then(function (weatherData) {
            // Removes warning message
            warning.style.display = "none";

            // Puts the Json into an array and launches createTable function
            var arrayJson = [weatherData];
            createTable(document.querySelector("#table"), arrayJson);

            // Function to create the table
            function createTable(table, data) {
                // Makes table visible
                document.querySelector("#table").style.display = "block";
                
                // Goes through the array and makes the rows for the table
                for (let i = 0; i < data.length; i++) {
                    let rowData = data[i];
                    var row = table.insertRow(table.rows.length);

                    // This var exists to make the first letter capitalized (see insertCell(3))
                    var weatherDescription = rowData.weather[0].description;

                    // Take latitude and longitude for google maps link
                    var lat = rowData.coord.lat;
                    var long = rowData.coord.lon;
                    // Make an a-tag for link to google maps
                    var mapLink = document.createElement("a");
                    mapLink.innerHTML = "Link";
                    mapLink.target = "_blank";
                    mapLink.href = "https://www.google.com/maps/search/?api=1&query=" + lat + "," + long;
                                        
                    // Making rows in table
                    row.insertCell(0).innerHTML = rowData.name + ", " + rowData.sys.country;
                    row.insertCell(1).innerHTML = rowData.main.temp + " °C";
                    row.insertCell(2).innerHTML = rowData.main.humidity + "%";
                    row.insertCell(3).innerHTML = capitalize(weatherDescription);
                    row.insertCell(4).appendChild(mapLink); // appendChild for anchor tag because innerHTML only works with text
                }
            }
        })

        // Catches any errors with the api request and displays the warning message
        .catch(function () {
            warning.style.display = "block";
        });
}


// Check if there are any errors while fetching the api, so the next .then doesn't happen
function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}


// Function to capitalize strings
function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);    
}