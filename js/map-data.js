var app = app || {},
  markerList = [],
  map;

function initMap() {
  'use strict';


  // init: function () {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 55.7352057, lng: 37.5912406},
    zoom: 13
    // });
  });

  app.map = map;


  
  my_list().forEach(function(item){
    
    item.marker = new google.maps.Marker({
        map: app.map,
        // draggable: true,
        animation: google.maps.Animation.DROP,
        position: item.position()
      });

    markerList.push(item.marker);
    debugger;

    /*=========== Marker Animations ===========*/
    item.marker.addListener('click', function() {
    	toggleBounce();
    	infowindow.open(map, marker);
    });


    var contentString = 'Put information here';

    var infowindow = new google.maps.InfoWindow({
      content: contentString
    });

    function toggleBounce() {
      if (item.marker.getAnimation() !== null) {
        item.marker.setAnimation(null);
      } else {
        item.marker.setAnimation(google.maps.Animation.BOUNCE);
      }
    }

  });

}

  function updateMarkers (markerItem) {
    // markerArray.forEach(function(markerItem){
      markerItem.setMap(markerItem.map);
    // });
  };
  

