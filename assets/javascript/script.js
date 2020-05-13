var topics = ["New York Yankees","Boston Red Sox","Philadelphia Phillies","Baltimore Orioles","Tampa Bay Rays"];

var buttonDiv = $("#button-div");
var imageDiv = $("#image-div");
var team = "";

var apiKey = "SF7TXcXQN2SXAfb2w6nQGXK8QO6autqa";

var queryURL = "http://api.giphy.com/v1/gifs/search?api_key=" + apiKey + "&limit=10" + "&q=";

function addButtons() {
    buttonDiv.empty();
    for (var i=0;i<topics.length;i++) {
        var newButton = $("<button>");
        newButton.text(topics[i]);
        newButton.addClass("gif-button");
        newButton.attr("data-name", topics[i]);
        buttonDiv.append(newButton);
    }
};

$(document).on("click",".gif-button", function(){
    team = $(this).attr("data-name");
    console.log(team);
    queryURL = queryURL + team;
    $.ajax(
        {url: queryURL,
        method: "GET"}
        ).then(function(response) {
            for (var i=0;i<11;i++) {
                var individualImageDiv = $("<div>");
                individualImageDiv.addClass("indiv-img-div");

                individualImageDiv.append($("<img>").attr("src", response.data[i].images.fixed_height_still.url).attr("data-still",response.data[i].images.fixed_height_still.url).attr("data-animate",response.data[i].images.fixed_height.url).attr("data-state", "still").addClass("gif"));

                individualImageDiv.append($("<p>").text("Rating: " +response.data[i].rating).addClass("rating"));
                imageDiv.prepend(individualImageDiv);
            }
    });
});

$(document).on("click",".gif", function() {
    var state = $(this).attr("data-state");
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});

$("#add-gif").on("click", function() {
    event.preventDefault();
    var newTopic = $("#gif-input").val().trim();
    topics.push(newTopic);
    $("#gif-input").val("");
    addButtons();
})

addButtons();

