// Array of Twitch TV streamers
var streamerArray = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "brunofin", "comster404", "sheevergaming"]

// Create jsonp script
function getAPIData(array) {
  array.forEach(function(val, idx, arr) {
    var url = createSearchURL(val, idx);
    jsonp = document.createElement("script");
    jsonp.id = "jsonp";
    jsonp.type = "text/javascript";
    jsonp.src = createSearchURL(val, idx); 
    document.body.appendChild(jsonp);
  });
};

getAPIData(streamerArray);

// Handle json response
function displayResponse(response) {
  var idx = 0;
  if (typeof response.stream === "undefined") {
    // Dynamically create elements for JSONP responses
    var div = document.createElement("div");
    div.className = "response";
    div.id = "response" + idx;
    document.querySelector(".responses").appendChild(div);
    document.querySelector(".response" + idx).innerHTML = "Account Closed";
  idx += 1;
  } else {
    var streamObj = response.stream;
    console.log(streamObj);
    // Dynamically create elements for JSONP responses
    var div = document.createElement("div");
    div.className = "response";
    div.id = "response" + idx;
    var p = document.createElement("p");
    p.className = "title";
    p.id = "title" + idx;
    var p1 = document.createElement("p");
    p1.className = "extract";
    p1.id = "extract" + idx;
    var a = document.createElement("a");
    a.className = "link";
    a.id = "link" + idx;
    a.target = "_blank";
    document.querySelector(".responses").appendChild(div);
    document.querySelector("#response" + idx).appendChild(a);
    document.querySelector("#link" + idx).appendChild(p);
    document.querySelector("#response" + idx).appendChild(p1);
    // Add border to responses
    document.querySelector("#response" + idx).style["border-style"] = "solid";
    // Add JSONP response to dynamically created elements
    document.getElementById("title" + idx).innerHTML = streamObj._links.self;
    document.getElementById("extract" + idx).innerHTML =streamObj.game;
    // Add link to wikipedia page for each response
    document.getElementById("link" + idx).setAttribute("href", "https://www.twitch.tv/" + streamObj._links.self);
  idx += 1;
  };
};

function createSearchURL(username, index) {
  var searchURL;
  var baseURL = "https://api.twitch.tv/kraken/streams/";
  var callbackURL = "?callback=displayResponse";
  return searchURL = baseURL + username + callbackURL;
  console.log(index);
};
