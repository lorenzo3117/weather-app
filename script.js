// Launch weather() function and catch any errors with the api request and display the warning message if there are any errors
function main() {
    weather().catch(error => {
        document.querySelector("#warningMessage").style.display = "block";
        console.log(error);
    });
}

// Main function
async function weather() {

    // Take city from input and reset input field
    var city = document.querySelector("#cityInput").value;
    document.querySelector("#cityInput").value = "";

    // Get api response and make it into a Json
    const apiResponse = await fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=02587cc48685af80ea225c1601e4f792&units=metric");
    const jsonData = await apiResponse.json();

    // Removes warning message
    document.querySelector("#warningMessage").style.display = "none";

    // Puts the Json into an array and launches createTable function
    var arrayJson = [jsonData];
    createTable(document.querySelector("#table"), arrayJson);

    // Function to create the table
    function createTable(table, data) {
        // Makes the table visible
        document.querySelector("#table").style.display = "block";
        
        // Goes through the array and makes the rows for the table
        for (let i = 0; i < data.length; i++) {
            let rowData = data[i];
            var row = table.insertRow(table.rows.length);

            // This var exists to make the first letter capitalized without making a gigantic line (see insertCell(3), line 53)
            // Could be made into a function if needed
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
            row.insertCell(3).innerHTML = weatherDescription.charAt(0).toUpperCase() + weatherDescription.slice(1);
            row.insertCell(4).appendChild(mapLink); // appendChild for anchor tag because innerHTML only works with text
        }
    }
    
}