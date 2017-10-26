// A $( document ).ready() block.
$( document ).ready(function() {
    // console.log( "ready!" );

//my API key
var APIKey = "UPFGQAENcG6svkWjoDhi9NZzHMbPCE57";

//Game of Throne characters

var gotCharacters = ["Sansa Stark", "Jon Snow", "Ned Stark", "Tywin Lannister", "Cersei Lannister"];

function createButtons() {

	$("#gotCharacter-view").empty();

	for (var i = 0; i < gotCharacters.length; i++) {
		
		var actionButton = $("<button>");

		actionButton.addClass("character");

		actionButton.attr("character-name",  gotCharacters[i]);

		actionButton.text(gotCharacters[i]);

		$("#gotCharacter-view").append(actionButton);

	}
}

function addNewGifButtons(){

$("#addGOTCharacter").on("click", function(event) {

	event.preventDefault();

	var gotCharacter = $("#character-input").val().trim();

	gotCharacters.push(gotCharacter);

	createButtons();
});

}

function getGif(){

	var gotPerson = $(this).attr("character-name");

	var queryURL ="https://api.giphy.com/v1/gifs/search?q=" + gotPerson + "&api_key=UPFGQAENcG6svkWjoDhi9NZzHMbPCE57&limit=10";
	//checking url link in console.log
	console.log(queryURL);

	//running ajax to call the give the api gif
	$.ajax({
	url: queryURL,

	method: 'GET'

    })

    .done(function(response) {

        console.log(response); 
        
        // erasing anything in this div id so that it doesnt keep any from the previous click
		$("#GameOfThronesGifs").empty(); 

        var results = response.data; //shows results of gifs

        for (var i=0; i<results.length; i++){

            //div for the gifs to go inside

            var gifDiv = $("<div>"); 

            gifDiv.addClass("gifDiv");

            // pulling rating of gif

            var gifRating = $("<p>").text("Rating: " + results[i].rating);

            gifDiv.append(gifRating);

            // pulling gif

            var imageGOT = $("<img>");

            // still image stored into src of image, still image, animated image and still image

            imageGOT.attr("src", results[i].images.fixed_height_still.url); 

            imageGOT.attr("data-still",results[i].images.fixed_height_still.url); 

            imageGOT.attr("data-animate",results[i].images.fixed_height.url); 

            imageGOT.attr("data-state", "still"); 

            imageGOT.addClass("image");

            gifDiv.append(imageGOT);

            // pulling still image of gif

            // adding div of gifs to gifsView div

            $("#GameOfThronesGifs").prepend(gifDiv);

        }

    });

	}

	createButtons();
	
    addNewGifButtons();

$(document).on("click", ".character", getGif);

$(document).on("click", ".image", function(){

    var state = $(this).attr('data-state');

    if ( state == 'still'){

        $(this).attr('src', $(this).data('animate'));

        $(this).attr('data-state', 'animate');

    }else{

        $(this).attr('src', $(this).data('still'));

        $(this).attr('data-state', 'still');

    }

});







    
});