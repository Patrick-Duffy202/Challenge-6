var cityVal = [];


$("#searchbtn").on("click", function () {
     city = $("#city").val();
     weatherInfo();
        cityVal.push(city);
        localStorage.setItem("cityList", JSON.stringify(cityVal));
        var history = $("<li>").addClass("list-group-item list-group-item-action").text(city);
        $(".citylist").append(history);
    }     
);

  
    function weatherInfo() {
        $.ajax({
            url: "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=7c3cbf4aa4dc61cc8437fcd0d8121703&units=imperial",
            method: "GET"
        }).then(function (data) {
            console.log(data);
            $("#dailyweather").empty();
            var head = $("<h3>").addClass("header").html(data.name + " (" + new Date().toLocaleDateString() + ")");
            var card = $("<div>").addClass("card");
            var temp = $("<p>").addClass("text").html("Temperature: " + data.main.temp + " °F");
            var wind = $("<p>").addClass("text").html("Wind Speed: " + data.wind.speed + " MPH");
            var humidity = $("<p>").addClass("text").html("Humidity: " +data.main.humidity + "%");
            var cardBody = $("<div>").addClass("card-body");
            var img = $("<img>").attr("src", "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png");
            head.append(img);
            cardBody.append(head, temp, humidity, wind);
            card.append(cardBody);
            $("#dailyweather").append(card);
        var lat = data.coord.lat;
        var lon = data.coord.lon;
        $.ajax({
            url: "http://api.openweathermap.org/data/2.5/uvi?appid=7c3cbf4aa4dc61cc8437fcd0d8121703&lat=" + lat + "&lon=" + lon,
            method: "GET"

        }).then(function (data) {
            console.log(data);
            var uvIndex = $("<p>").text("UV Index: ");
            var index = $("<span>").addClass("btn btn-sm").text(data.value);

           
            if (data.value < 3) {
                index.addClass("btn btn-outline-success");
            }if (data.value > 2 && data.value <= 6) {
                index.addClass("btn btn-outline-warning");
            }else{
                index.addClass("btn btn-outline-danger");
            }

            $("#dailyweather .card-body").append(uvIndex.append(index));
        })
       
        $.ajax({
            url: "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=7c3cbf4aa4dc61cc8437fcd0d8121703&units=imperial",
            method: "GET"
        }).then(function (data) {
           console.log(data)
           $("#5dayforecast").html("<h4 class= 'mt-3'>Five Day Forecast:</h4>").append("<div class ='row'>");
           
            for (var i = 0; i < data.list.length; i++) { 
                if (data.list[i].dt_txt.indexOf("15:00:00") !== -1) {
                    
                    var cards = $("<div>").addClass("col-md-2 card body bg-primary text-white p-2");
                    var cardTitle = $("<h4>").addClass("card-title").text(new Date(data.list[i].dt_txt).toLocaleDateString());
                    var img = $("<img>").attr("src", "http://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png"); 
                    var temp = $("<p>").addClass("card-text").text("Temp: " + data.list[i].main.temp + " °F");
                    var humid = $("<p>").addClass("card-text").text("Humidity: " + data.list[i].main.humidity + "%");
                    
                    cards.append(cardTitle,img, temp,humid);
                    $("#5dayforecast .row").append(cards);
                }
            }
   
        });
    })
} 