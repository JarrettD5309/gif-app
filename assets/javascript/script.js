var topics = ["New York Yankees","Boston Red Sox","Chicago Cubs","Baltimore Orioles","Tampa Bay Rays"];


var buttonDiv = $("#button-div");
var imageDiv = $("#image-div");
var team = "";

var apiKey = "SF7TXcXQN2SXAfb2w6nQGXK8QO6autqa";



function addButtons() {
    var divCounter = 1;
    buttonDiv.empty();
    for (var i=0;i<topics.length;i++) {
        var newButton = $("<button>");
        newButton.text(topics[i]);
        newButton.addClass("gif-button");
        newButton.attr("data-name", topics[i]);

        if (divCounter===1) {
            newButton.addClass("col-4");
            divCounter++;
        } else if (divCounter===2) {
            newButton.addClass("col-4 no-left-border");
            divCounter++;
        } else if (divCounter===3) {
            newButton.addClass("col-4 no-left-border");
            divCounter++;
        } else if (divCounter===4) {
            newButton.addClass("col-6");
            divCounter++;
        } else if (divCounter===5) {
            newButton.addClass("col-6 no-left-border");
            divCounter=1;
        }

        buttonDiv.append(newButton);
    }
};

$(document).on("click",".gif-button", function(){
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + apiKey + "&limit=10&q=";
    team = $(this).attr("data-name");
    console.log(team);
    queryURL = queryURL + team;
    console.log(queryURL);
    $.ajax(
        {url: queryURL,
        method: "GET"}
        ).then(function(response) {
            for (var i=0;i<11;i++) {
                var individualImageDiv = $("<div>");
                individualImageDiv.addClass("indiv-img-div");

                individualImageDiv.append($("<img>").attr("src", response.data[i].images.fixed_width_still.url).attr("data-still",response.data[i].images.fixed_width_still.url).attr("data-animate",response.data[i].images.fixed_width.url).attr("data-state", "still").addClass("gif"));

                individualImageDiv.append($("<p>").text("Rating: " +response.data[i].rating).addClass("rating"));
                imageDiv.prepend(individualImageDiv);
            }
    });

    var logoURL = "https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t="+ team;

    $.ajax(
        {url: logoURL,
        method: "GET"}
        ).then(function(response) {
            
                var individualImageDiv = $("<div>");
                individualImageDiv.addClass("logo-div");

                individualImageDiv.append($("<img>").attr("src", response.teams[0].strTeamBadge).addClass("logo"));

                console.log(response.teams[0].strTeamBadge)

                individualImageDiv.append($("<h3>").text(team).addClass("team-text"));
                imageDiv.prepend(individualImageDiv);
            
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
    if ($("#gif-input").val()==="") {

    } else {
    
    var newTopic = $("#gif-input").val().trim();
    topics.push(newTopic);
    $("#gif-input").val("");
    addButtons();
    }
})

addButtons();

