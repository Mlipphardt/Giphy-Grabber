let countries = ["america", "india", "china", "brazil"];
let apikey = "HyrYFqZOH6QDHtwRJPcs925lbeU6l5z8";

function buttonCreator(array){

    $("#buttons").empty();
    for(let i = 0; i < array.length; i++){
        let newButton = $("<button>");
        $(newButton).text(array[i]);
        $(newButton).addClass("country-btn")
        $(newButton).attr("data-name", array[i])
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
        console.log(response.data);
    })
 }

$(document).on("click", ".country-btn", getCountryGifs);

buttonCreator(countries);