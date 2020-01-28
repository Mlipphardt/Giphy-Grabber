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
    let queryURL = "http://api.giphy.com/v1/gifs/search?q=" + country + "&apikey=" + apikey + "&limit=10"
    $.ajax({
        url: queryURL,
        method: "GET",

    }).then(function(response){
               let gifResults = response.data;
        for (let i = 0; i < gifResults.length; i++) {
            let gif = $("<div>");
            let p = $("<p>");
            $(p).text("Rating: " + gifResults[i].rating)
            let gifImg = $("<img>");
            $(gifImg).attr("src", gifResults[i].images.fixed_height.url);
            $(gifImg).attr("data-animate", gifResults[i].images.fixed_height.url);
            $(gifImg).attr("data-still", gifResults[i].images.fixed_height_still.url);
            $(gifImg).attr("data-state", "animated");
            $(gifImg).addClass("country-gif");
            $(gif).append(p, gifImg);
            $("#gifs-grabbed").prepend(gif);
            
        }

    })
 }

function changeAnimationState(){
    if($(this).attr("data-state") == "animated"){
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    } else {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animated");
    }
}

$("#add-country").on("click", function(){
    event.preventDefault();
    let newCountry = $("#country-input").val().trim();
    countries.push(newCountry);
    buttonCreator(countries);
})

//Event listener for buttons, works with dynamically created elements
$(document).on("click", ".country-btn", getCountryGifs);

$(document).on("click", ".country-gif", changeAnimationState);


buttonCreator(countries);