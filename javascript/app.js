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
 
  }
}
listStuff();


$("#buttons-here").on('click', 'button', function () {
  var animals = $(this).attr('id');
  console.log($(this).attr('id'));

  var queryURL =
    'https://api.giphy.com/v1/gifs/search?q=' +
    animals +
    '&api_key=uz1widOpk7jjqzkeT0nG7jOcCJ230XZ7&limit=10';
  console.log(queryURL);

  $.ajax({
    url: queryURL,
    method: 'GET'
  }).then(function (response) {
    var results = response.data;
    console.log(response);
    for (var i = 0; i < results.length; i++) {

      // Creates an img tag
      var topicImage = $('<img>');
      var pOne = $('<p>').text('Rating: ' + results[i].rating);
      var gifDiv = $("<div>");


      // Gives it the src attribtute with the reuslts from above
      console.log(results[i].images.fixed_height_still.url);
      topicImage
        .attr('src', results[i].images.fixed_height_still.url)
        .addClass('border border-light');
      topicImage.addClass("giffy");

      topicImage.attr("data-state", "still");
      topicImage.attr("data-animate", results[i].images.fixed_height.url);
      topicImage.attr("data-still", results[i].images.fixed_height_still.url);

      gifDiv.prepend(pOne);
      gifDiv.append(topicImage);
      $('#gifs-here').prepend(gifDiv);
    }
  });
});


$('#add-movie').on('click', function (event) {
  event.preventDefault();
  var movie = $('#movie-input')
    .val()
    .trim();
  topics.push(movie);
  console.log('you typed ' + movie);
  listStuff();
});
$(document).on('click', '.add-movie', topics);

// ---------------- Pausing Gifs ---------
$("#gifs-here").on("click", ".giffy", function () {
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