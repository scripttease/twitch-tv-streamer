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
  // console.log(response);
  calledTimes++;
  if (typeof response.stream === "undefined") {
    var streamObj = response;
    console.log(streamObj);
    console.log(streamObj.message);
    // regex to get name from response.message
    var regex = /\w+\s+\'(\w+)\'\s\w+\s\w+/g;
    var name = regex.exec(streamObj.message);
    console.log(name[1]);
    // Dynamically create elements for JSONP responses
    var div = document.createElement("div");
    div.className = "response";
    div.id = "response" + calledTimes;
    var p = document.createElement("p");
    p.className = "title";
    p.id = "title" + calledTimes;
    var p1 = document.createElement("p");
    p1.className = "extract";
    p1.id = "extract" + calledTimes;
    var a = document.createElement("a");
    a.className = "link";
    a.id = "link" + calledTimes;
    a.target = "_blank";
    document.querySelector(".responses").appendChild(div);
    document.querySelector("#response" + calledTimes).appendChild(a);
    document.querySelector("#link" + calledTimes).appendChild(p);
    document.querySelector("#response" + calledTimes).appendChild(p1);
    // Add border to responses
    document.querySelector("#response" + calledTimes).style["border-style"] = "solid";
    // Add JSONP response to dynamically created elements
    document.getElementById("title" + calledTimes).innerHTML = name[1]; 
    document.getElementById("extract" + calledTimes).innerHTML = "Account Closed";
    // if streaming
  } else if(response.stream === null) {
    var streamObj = response;
    console.log(streamObj);
    console.log(streamObj._links.self);
    // regex to get name from streamObj._links.self 
    var regex = /https\:\/\/api\.twitch\.tv\/kraken\/streams\/(\w+)/g;
    var name = regex.exec(streamObj._links.self);
    console.log(name[1]);
    // Dynamically create elements for JSONP responses
    var div = document.createElement("div");
    div.className = "response";
    div.id = "response" + calledTimes;
    var p = document.createElement("p");
    p.className = "title";
    p.id = "title" + calledTimes;
    var p1 = document.createElement("p");
    p1.className = "extract";
    p1.id = "extract" + calledTimes;
    var a = document.createElement("a");
    a.className = "link";
    a.id = "link" + calledTimes;
    a.target = "_blank";
    document.querySelector(".responses").appendChild(div);
    document.querySelector("#response" + calledTimes).appendChild(a);
    document.querySelector("#link" + calledTimes).appendChild(p);
    document.querySelector("#response" + calledTimes).appendChild(p1);
    // Add border to responses
    document.querySelector("#response" + calledTimes).style["border-style"] = "solid";
    // Add JSONP response to dynamically created elements
    document.getElementById("title" + calledTimes).innerHTML = name[1];
    document.getElementById("extract" + calledTimes).innerHTML = "Offline" 
      // Add link to home page for each response
      document.getElementById("link" + calledTimes).setAttribute("href", streamObj._links.self);
  } else {
    // Online
    var streamObj = response.stream;
    console.log(streamObj);
    // regex to get name from streamObj.stream._links.self 
    var regex = /https\:\/\/api\.twitch\.tv\/kraken\/streams\/(\w+)/g;
    var name = regex.exec(streamObj.stream._links.self);
    console.log(name[1]);
    // Dynamically create elements for JSONP responses
    var div = document.createElement("div");
    div.className = "response";
    div.id = "response" + calledTimes;
    var p = document.createElement("p");
    p.className = "title";
    p.id = "title" + calledTimes;
    var p1 = document.createElement("p");
    p1.className = "extract";
    p1.id = "extract" + calledTimes;
    var a = document.createElement("a");
    a.className = "link";
    a.id = "link" + calledTimes;
    a.target = "_blank";
    document.querySelector(".responses").appendChild(div);
    document.querySelector("#response" + calledTimes).appendChild(a);
    document.querySelector("#link" + calledTimes).appendChild(p);
    document.querySelector("#response" + calledTimes).appendChild(p1);
    // Add border to responses
    document.querySelector("#response" + calledTimes).style["border-style"] = "solid";
    // Add JSONP response to dynamically created elements
    document.getElementById("title" + calledTimes).innerHTML = name[1];
    document.getElementById("extract" + calledTimes).innerHTML = streamObj.game;
    // Add link to home page for each response
    document.getElementById("link" + calledTimes).setAttribute("href", streamObj._links.self);
  };
};

// This is awful - ask Louis for scoping solution
calledTimes = 0;

function createSearchURL(username, index) {
  var searchURL;
  var baseURL = "https://api.twitch.tv/kraken/streams/";
  var callbackURL = "?callback=displayResponse";
  return searchURL = baseURL + username + callbackURL + "&" + index;
  return index;
};
