//Initial Array Values
var gifs = ["SpongeBob Squarepants", "Rugrats", "Angry Beaver", "Hey Arnold!", "Rocko's modern life", "Rocket power"];

function displayGifInfo() {

  //Global vars
  var gif = $(this).attr("data-name");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=ED5M7CisPjLAtbyt9UiIJpQdgioBnDSz&limit=10";

  //AJAX `Get` to Giphy API
  $.ajax({
    url: queryURL,
    method: "GET"
  }).done(function (response) {

    //console logs
    console.log(queryURL);
    console.log(response);

    //var assignments
    var gifDiv = $("<div class='gif'>");
    var results = response.data;

    //Clears out previous giphy set before adding a new set
    $("#gif-view").empty();
    for (var i = 0; i < gifs.length; i++) {

        // Generating div with class "item"
        var gifDiv = $("<div class='item'>");

        //Generating a div to hold the giphys
        var gifDiv = $("<div>");

        //Storing rating response
        var rating = response.data.rating;

        //Fetching URL for image
        var imgURL = response.rating;

        //Generating <p> and rating
        var p = $("<p>").text("Rating: " + results[i].rating);

        //Generating image tag
        var gif = $("<img>");

        //Defining src attribute of the images pulled
        gif.attr("src", results[i].images.fixed_height.url);

        //Appending rating to giphy
        gifDiv.append(p);
        gifDiv.append(gif);

        //Setting src and URL attributes to giphy
        var image = $("<img>").attr("src", imgURL);

        //Appending the giphy
        gifDiv.append(image);

        //Prepending new giphys above previosly called giphys
        $("#gif-view").prepend(gifDiv);
    };
  });
};

//Calling renderButtons function
function renderButtons() {

  //Prevents repeated buttons -- Do not remove.
  $("#buttons-view").empty();

  //For Loop
  for (var i = 0; i < gifs.length; i++) {

    //Generating buttons
    var a = $("<button>");
    //Adding class of gif
    a.addClass("gif");
    //Adding data-attribute
    a.attr("data-name", gifs[i]);
    //Adding button text
    a.text(gifs[i]);
    //Appending the button to HTML
    $("#buttons-view").append(a);
  };
};

//On.click function; prevents duplicatation of initial buttons
$("#add-gif").on("click", function (event) {
  event.preventDefault();

  //Stores user input from the textbox
  var gif = $("#gif-input").val().trim();

  //Removes previous giphys on.click
  $("gif").empty();

  //Adds Users input from the textbox to array
  gifs.push(gif);

  //Calls renderButtons function for User input buttons
  renderButtons();
});

//Adds a click event listener to elements with a class of "gify"
$(document).on("click", ".gif", displayGifInfo);

//Calls the renderButtons function for the intial buttons as defined in the array
renderButtons()