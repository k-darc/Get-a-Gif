// This is making buttons = to the names and length of the array...
var topics = [
  'dogs',
  'cats',
  'birds',
  'badgers',
  'lions',
  'hamsters',
  'pengiuns',
  'chipmunks',
  'pikachu'
];
function listStuff() {
  // empty buttons here
  $('#buttons-here').empty();
  for (var i = 0; i < topics.length; i++) {
    $('#buttons-here').append(
      '<button id="' + topics[i] + '">' + topics[i] + '</button>'
    );
    // DON'T   USE innerHTML +, use innterHTML = ... don't use inner HTML at all here
  }
}
listStuff();

// have to bind click event to the document because some buttons are dynamically created after the DOM has been loaded
$("#buttons-here").on('click', 'button', function() {
  var animals = $(this).attr('id');
  console.log($(this).attr('id'));
  // grabbing the urls with the correct topic(animal)...
  var queryURL =
    'https://api.giphy.com/v1/gifs/search?q=' +
    animals +
    '&api_key=uz1widOpk7jjqzkeT0nG7jOcCJ230XZ7&limit=10';
  console.log(queryURL);

  $.ajax({
    url: queryURL,
    method: 'GET'
  }).then(function(response) {
    var results = response.data;
    console.log(response);
    for (var i = 0; i < results.length; i++) {

      // This makes an img tag and...
      var topicImage = $('<img>');
      var pOne = $('<p>').text('Rating: ' + results[i].rating);
      var gifDiv = $("<div>");


      // Gives it the src attribtute with the reuslts from above and...
      console.log(results[i].images.fixed_height_still.url);
      topicImage
        .attr('src', results[i].images.fixed_height_still.url)
        .addClass('border border-light');
      topicImage.addClass("giffy");

      topicImage.attr("data-state", "still");
      topicImage.attr("data-animate", results[i].images.fixed_height.url);
      topicImage.attr("data-still", results[i].images.fixed_height_still.url);

      // Put it inside the empty div in the HTML...
      gifDiv.prepend(pOne);
      gifDiv.append(topicImage);
      $('#gifs-here').prepend(gifDiv);
    }
  });
});


$('#add-movie').on('click', function(event) {
  event.preventDefault();
  var movie = $('#movie-input')
    .val()
    .trim();
  topics.push(movie);
  console.log('you typed ' + movie);
  listStuff();
});
$(document).on('click', '.add-movie', topics);

// ---------------- Pausing Gifts ---------

$("#gifs-here").on("click", ".giffy", function() {
  console.log("SAFHASEOIHFOIEH00");
  var state = $(this).attr("data-state");

  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
});
