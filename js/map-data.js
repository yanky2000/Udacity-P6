var app = app || {};
  'use strict',

app.Map = {
    initMap: function () {
        
        // First we begin by creating a map
        map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: 55.7352057, lng: 37.5912406},
            zoom: 13
        });
        
        // Then we add map marker for each location as it's property 
        app.ViewModel.locList().forEach(function(item) {
            item.marker = new google.maps.Marker({
                map: map,
                animation: google.maps.Animation.DROP,
                position: item.position()
            });
            
            /*=========== Styling for all markers ===========*/
            item.marker.addListener('click', function() {
                toggleBounce();
                infowindow.open(map, item.marker);
            });

            var infowindow = new google.maps.InfoWindow({
            content: item.label()
            });

            function toggleBounce() {
                if (item.marker.getAnimation() !== null) {
                    item.marker.setAnimation(null);
                } else {
                    item.marker.setAnimation(google.maps.Animation.BOUNCE);
                }
            }
            
        })
     
     
             
    }
}
            
    
    




