// Main function
async function weather() {
    try {
        // Take city from input and reset input field
        const city = document.querySelector("#cityInput").value;
        document.querySelector("#cityInput").value = "";

        // Get api response and make it into a Json
        // UNSECURED API KEY, but I see everytime it get used so I can cancel it if it get stolen
        const apiResponse = await fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=02587cc48685af80ea225c1601e4f792&units=metric");
        const jsonData = await apiResponse.json();

        if (jsonData.message == "city not found") {
            document.querySelector("#warningMessage").style.display = "block";
        } else {
            // Removes warning message
            document.querySelector("#warningMessage").style.display = "none";

            // Puts the Json into an array and launches updateTable function
            var arrayJson = [jsonData];
            updateTable(document.querySelector("#table"), arrayJson);
        }
    } 
    
    catch (error) {
        console.log(error);
    }
}

// Function to update the table
function updateTable(table, data) {

    // Goes through the array and makes the rows for the table
    for (let i = 0; i < data.length; i++) {
        var rowData = data[i];
        var row = table.insertRow(table.rows.length);

        // This var exists to make the first letter capitalized without making a gigantic line (see insertCell(3), line 53)
        // Could be made into a function if needed
        var weatherDescription = rowData.weather[0].description;

        // Make an a-tag for link to google maps
        var mapLink = document.createElement("a");
        mapLink.innerHTML = "Link";
        mapLink.target = "_blank";
        mapLink.href = "https://www.google.com/maps/search/?api=1&query=" + rowData.coord.lat + "," + rowData.coord.lon;

        // Making rows in table
        row.insertCell(0).innerHTML = rowData.name + ", " + rowData.sys.country;
        row.insertCell(1).innerHTML = rowData.main.temp + " °C";
        row.insertCell(2).innerHTML = rowData.main.humidity + "%";
        row.insertCell(3).innerHTML = weatherDescription.charAt(0).toUpperCase() + weatherDescription.slice(1);
        row.insertCell(4).appendChild(mapLink); // appendChild for anchor tag because innerHTML only works with text
    }

    // Makes the table visible (put at end so it becomes visible with everything at once)
    document.querySelector("#table").style.display = "block";
}
