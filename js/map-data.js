var app = app || {};
var marker;
var map;

function initMap() {
  'use strict';


    // init: function () {
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 55.7352057, lng: 37.5912406},
      zoom: 13
      // });
    });


    var mark = ko.computed(function (){
      my_list().forEach(function(item) {
        // console.log(item.position());
        // console.log(item.isVisible());
        var pos = (item.isVisible()) ? item.position() : null;
        marker = new google.maps.Marker({
          map: map,
          draggable: true,
          animation: google.maps.Animation.DROP,
          position: pos
        });

      });
    }, this);
        // debugger;

    ko.applyBindings(mark);


      /*=========== Marker Animations ===========*/
      marker.addListener('click', function() {
      	toggleBounce();
      	infowindow.open(map, marker);
      });


      var contentString = 'Put information here';

      var infowindow = new google.maps.InfoWindow({
        content: contentString
      });

      function toggleBounce() {
        if (marker.getAnimation() !== null) {
          marker.setAnimation(null);
        } else {
          marker.setAnimation(google.maps.Animation.BOUNCE);
        }
      }

}



function test (e) {
  e.map(function(item) {
    console.log(item.isVisible());
    if (item.isVisible()) {
      marker = new google.maps.Marker({
        map: map,
        draggable: true,
        animation: google.maps.Animation.DROP,
        position: item.position()
      });
    }
  });
}

function renderMarker (location) {
  marker = new google.maps.Marker({
    map: map,
    draggable: true,
    animation: google.maps.Animation.DROP,
    position: location.position()
  });
}


function showMarkers(markersArr) {
    markersArr.forEach(function(arrItem) {
      setMap();
      arrItem.setMap(map);
    });
   }