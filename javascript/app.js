// This is making buttons = to the names and length of the array...
var topics = ["dog", "cat", "bird", "badger", "lion", "hamster", "pengiun", "pikachu"];

function listStuff() {
  for (var i = 0; i < topics.length; i++) {
    $('#buttons-here').append('<button id="' + topics[i] + '">' + topics[i] + '</button>');
     // DON'T   USE innerHTML +, use innterHTML = ... don't use inner HTML at all here
  }
};
listStuff(); // Should I move this down   ??????????

$("button").on("click", function() {
  var animals = $(this).attr('id');
  console.log($(this).attr('id'));


// grabbing the urls with the correct topic(animal)...
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animals + "&api_key=uz1widOpk7jjqzkeT0nG7jOcCJ230XZ7&limit=10";
  console.log(queryURL);
  
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
      var results = response.data;
      console.log(response);

      for (var i = 0; i < results.length; i++) {
        // This makes an img tag and...
        var topicImage = $("<img>");
        var pOne = $("<p>").text("Rating: " + results[i].rating);

        // Gives it the src attribtute with the reuslts from above and...
        console.log( results[i].images.fixed_height.url);

        topicImage.attr("src", results[i].images.fixed_height.url).addClass("border border-light");

        // Put it inside the empty div in the HTML...
        $("#gifs-here").prepend(topicImage);
        $("#gifs-here").prepend(pOne);
      }
    });
});

// Adding things to the button array via the ADD input box
$("#add-movie").on("click", function(event) {
  $("#buttons-view").empty();  //This is supposed to empty the div and apply the new ones but it just duplicates!!!!
  
  event.preventDefault();
  var movie = $("#movie-input").val().trim();
  topics.push(movie);
  listStuff(); //not sure about this name... might be "event"... not working

  console.log(listStuff);
});

$(document).on("click", ".add-movie", listStuff);