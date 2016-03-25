var app = app || {};
  'use strict',

app.Map = {
    initMap: function () {
        map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: 55.7352057, lng: 37.5912406},
            zoom: 13
        });
        
        // (function () {
            
            app.ViewModel.locList().forEach(function(item) {
            
                item.marker = new google.maps.Marker({
                    map: map,
                    // draggable: true,
                    animation: google.maps.Animation.DROP,
                    position: item.position()
                });
                
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
                
            })
        // }) ()
      
        
    }
}
            
    
    




