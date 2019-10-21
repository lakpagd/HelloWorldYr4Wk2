/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

// Function = VIBRATION
function shake(){
    navigator.vibrate(3000);
}

// Function = CAMERA
function pics(){
    navigator.camera.getPicture(cameraCallback, onError);
}
function onError(){
    console.log(Error);

}

function cameraCallback(imageData){
    var image = document.getElementById('myImage');
    //take a photo using mobile camera
    image.src = imageData;
    
    //take a photo using web browser
    //image.src = "data:image/jpeg;base64," + imageData;
}

// FUNCTION = GEO-LOCATION

function getLocation(){
    navigator.geolocation.getCurrentPosition(geoCallback, onError);
}

function geoCallback(position){
    cosole.log(position.coords.latitude);

    var lat = position.coords.latitude;
    var long = position.coords.longitude;

    var textToDisplay = "Latitude: " + lat + " Longitude: " + long;
    document.getElementById('pos').innerHTML = textToDisplay;

    updatetMap(lat, long);
}

function initMap() {
    var cct = {lat: 53.346, lng: -6.2588};
    var map = new google.maps.Map(document.getElementById('map'), { zoom: 4,
        center: cct
      }
    );
    var marker = new google.maps.Marker({
        position: cct,
        map: map
    });    
}

function updatetMap(latitude, longitude) {
    var cct = {lat: latitude, lng: longitude};
    var map = new google.maps.Map(document.getElementById('map'), { zoom: 4,
        center: location
      }
    );
    var marker = new google.maps.Marker({
        position: location,
        map: map
    });    
}

function openCageApi() {
    var http = new XMLHttpRequest();
    const url = 'https://api.opencagedata.com/geocode/v1/json?q=53.346+-6.2588&key=f576d3fbe1d84392b909860a541915d0';
    http.open("GET", url);
    http.send();
    
    http.onreadystatechange = (e) => {
        var response = http.responseText;
        var responseJSON = JSON.parse(response);
        console.log(response);
        console.log(responseJSON);

        var country = responseJSON.results[0].components.country;
        document.getElementById('pos').innerHTML = country;
    }
}

function newsApi(){
    var http = new XMLHttpRequest();
    const url = 'https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=cfa755e72a1c43b5b18566990622ffed';
    http.open("GET", url);
    http.send();

    http.onreadystatechange = (e) => {
        var response = http.responseText;
        var responseJSON = JSON.parse(response);
        console.log(response)
        console.log(responseJSON);

       // var newss = responseJSON.articles[1].title;
       // console.log(articles);
       //document.getElementById('newsPos').innerHTML = articles;
        
        var news = "<table>";
        for (var i = 0; i < 10; i++){
            news = news + "<tr><td>";
            news += responseJSON.articles[i].title;
            news += "</td><td>" + responseJSON.articles[i].content + "</td></tr>"
        }
        news += "</table>"

        document.getElementById('newsPos').innerHTML = news;
    
    }
}


