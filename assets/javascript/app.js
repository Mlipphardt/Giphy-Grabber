let countries = ["america", "india", "china", "brazil"];
let apikey = "HyrYFqZOH6QDHtwRJPcs925lbeU6l5z8";

function buttonCreator(array){
    for(let i = 0; i < array.length; i++){
        let newButton = $("<button>");
        $(newButton).text(array[i]);
        $("#buttons").prepend(newButton);
    }
}

buttonCreator(countries);