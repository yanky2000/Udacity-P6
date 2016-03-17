// # TODO:

// # Display 5 markers on the map by default

// # Add functionality to animate marker when list item or marker is selected

// ## Markers styles should be different ways depending on the data set


// # On selection (list item & marker) -> info window + animation of marker


var map, 
	marker

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 55.7352057, lng: 37.5912406},
    zoom: 13
  });

  /*=========== Marker Data ===========*/
  marker = new google.maps.Marker({
    map: map,
    draggable: true,
    animation: google.maps.Animation.DROP,
    position: {lat: 55.7342446, lng: 37.5881678} // TODO: CHANGE default marker locations
  });

  /*=========== Marker Animations ===========*/
  marker.addListener('click', function() {
  	toggleBounce();
  	infowindow.open(map, marker);
  });


  //TODO: Define a content for infowindow
  var contentString = 'Put information here';

  var infowindow = new google.maps.InfoWindow({
    content: contentString 
  });

}


function toggleBounce() {
  if (marker.getAnimation() !== null) {
    marker.setAnimation(null);
  } else {
    marker.setAnimation(google.maps.Animation.BOUNCE);
  }
}