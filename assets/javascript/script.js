var topics = ["New York Yankees","Boston Red Sox","Philadelphia Phillies","Baltimore Orioles","Tampa Bay Rays"];

var buttonDiv = $("#button-div");
var imageDiv = $("#image-div");
var team = "";

var apiKey = "SF7TXcXQN2SXAfb2w6nQGXK8QO6autqa";

var queryURL = "http://api.giphy.com/v1/gifs/search?api_key=" + apiKey + "&q=" + team + "&limit=10";

for (var i=0;i<topics.length;i++) {
    var newButton = $("<button>");
    newButton.text(topics[i]);
    newButton.addClass("gif-button");
    newButton.attr("data-name", topics[i]);
    buttonDiv.append(newButton);
}

$(document).on("click",".gif-button", function(){
    team = $(this).attr("data-name");
    console.log(team);
    queryURL = "http://api.giphy.com/v1/gifs/search?api_key=" + apiKey + "&q=" + team + "&limit=10";
    $.ajax(
        {url: queryURL,
        method: "GET"}
        ).then(function(response) {
            for (var i=0;i<11;i++) {
                console.log(queryURL);
                imageDiv.append($("<img>").attr("src", response.data[i].images.fixed_height_still.url));
            }
    });
});

