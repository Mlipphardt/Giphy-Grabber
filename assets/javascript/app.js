//Initial array of countries
let countries = ["america", "india", "china", "brazil"];

//apikey for requesting from giphy api
let apikey = "HyrYFqZOH6QDHtwRJPcs925lbeU6l5z8";

//Creates buttons for each item in array
function buttonCreator(array){

    $("#buttons").empty();
    for(let i = 0; i < array.length; i++){
        let newButton = $("<button>");
        $(newButton).text(array[i]);
        //Adds class for click event later
        $(newButton).addClass("country-btn")
        //Adds data-name for each individual item
        $(newButton).attr("data-name", array[i])
        //Adds to html
        $("#buttons").prepend(newButton);
    }
}

function getCountryGifs(){
    let country = $(this).attr("data-name");
    console.log(country);
    let queryURL = "http://api.giphy.com/v1/gifs/search?q=" + country + "&apikey=" + apikey + "&limit=10"
    $.ajax({
        url: queryURL,
        method: "GET",
        // xhrFields: {
        //     withCredentials: true
        //  }
    }).then(function(response){
        console.log(response)
        console.log(response.data);
        let gifResults = response.data;
        for (let i = 0; i < gifResults.length; i++) {
            let gif = $("<div>");
            let p = $("<p>");
            $(p).text("Rating: " + gifResults[i].rating)
            let gifImg = $("<img>");
            $(gifImg).attr("src", gifResults[i].images.fixed_height_small_still.url);
            $(gif).append(p, gifImg);
            $("#gifs-grabbed").prepend(gif);
            
        }

    })
 }


$("#add-country").on("click", function(){
    event.preventDefault();
    let newCountry = $("#country-input").val().trim();
    console.log(newCountry);
    countries.push(newCountry);
    console.log(countries);
    buttonCreator(countries);
})

//Event listener for buttons, works with dynamically created elements
$(document).on("click", ".country-btn", getCountryGifs);

buttonCreator(countries);