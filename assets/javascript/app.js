var gifs = ["tiger king", "ronaldo", "hello", "bye"];

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
            $(p).text("Rating: " + results[i].rating);
            var gifImage = $("<img>");
            $(gifImage).attr("src", results[i].images.fixed_height_still.url);

            $(gifImage).attr('data-still', results[i].images.fixed_height_still.url);
            $(gifImage).attr('data-animate', results[i].images.fixed_height.url);
            $(gifImage).attr('data-state', "still");
            $(gifImage).addClass("gif");


            $(gifDiv).append(p, gifImage);
            $("#gifView").prepend(gifDiv);
        }
    });
});

function renderButtons() {

    $("#buttons-view").empty();
    for (var i = 0; i < gifs.length; i++) {
        var a = $("<button>");
        a.addClass("gifImg");
        a.attr("data-name", gifs[i]);
        a.text(gifs[i]);
        $("#buttons-view").append(a);
    }
}

$("#addGif").on("click", function (event) {
    event.preventDefault();
    var gifImg = $("#gifInput").val().trim();
    gifs.push(gifImg);

    renderButtons();
});

renderButtons();
