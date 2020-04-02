var topics = ["tiger king", "ronaldo", "hello", "bye"];

$(document).on("click", ".gifImg", function () {

    var gifImg = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=FUUB7nICE9mEG19RmZIIKCktFrZgWxyP&q=" + gifImg + "&limit=10&offset=0&lang=en";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);

        var results = response.data;
       
        for (var i = 0; i < results.length; i++) {

            var gifDiv = $("<div>");
            var p = $("<p>");
            $(p).html("<br>Rating: " + results[i].rating);
            $(p).addClass("lead rating")
            var gifImage = $("<img>");
            $(gifImage).attr("src", results[i].images.fixed_height_still.url);

            $(gifImage).attr('data-still', results[i].images.fixed_height_still.url);
            $(gifImage).attr('data-animate', results[i].images.fixed_height.url);
            $(gifImage).attr('data-state', "still");
            
            $(gifImage).addClass("gif shadow");


            $(gifDiv).append(p, gifImage);
            $("#gifView").prepend(gifDiv);
        }
    });
});

function renderButtons() {

    $("#buttons-view").empty();
    for (var i = 0; i < topics.length; i++) {
        var a = $("<button>");
        a.addClass("gifImg btn btn-outline-light shadow buttons");
        a.attr("data-name", topics[i]);
        a.text(topics[i]);
        $("#buttons-view").append(a);
    }
}

$("#addGif").on("click", function (event) {
    event.preventDefault();
    var gifImg = $("#gifInput").val().trim();
    topics.push(gifImg);

    renderButtons();
});

renderButtons();

$(document).on("click", '.gif', function () {

    var state = $(this).attr("data-state");

    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});