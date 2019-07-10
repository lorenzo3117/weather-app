//Weather app
function weather(city) {
    var city = prompt("Which city?");
    const api = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=02587cc48685af80ea225c1601e4f792&units=metric";
    var warning = document.querySelector("#warningMessage");    

    fetch(api)
        .then(function (weatherResponse) {
            return weatherResponse.json()
        })
        .then(function (weatherData) {
            warning.style.display = "none";

            var arrayJSON = [weatherData];
            createTable(document.querySelector("#table"), arrayJSON);

            function createTable(table, data) {
                document.querySelector("#table").style.display = "block";
                document.querySelector("#cityButton").innerHTML = "Add city";
                
                for (var i = 0; i < data.length; i++) {
                    let rowData = data[i];
                    var row = table.insertRow(table.rows.length);
                    var weatherDescription = rowData.weather[0].description;
                    row.insertCell(0).innerHTML = rowData.name;
                    row.insertCell(1).innerHTML = rowData.main.temp + " °C";
                    row.insertCell(2).innerHTML = rowData.main.humidity + "%";
                    row.insertCell(3).innerHTML = weatherDescription.charAt(0).toUpperCase() + weatherDescription.slice(1);
                }  
            }
        
        })
        .catch(function () {
            warning.style.display = "block";
        });
}