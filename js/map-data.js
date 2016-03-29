var app = app || {};
'use strict',

    app.Map = {
        initMap: function() {

            // First we begin by creating a map
            map = new google.maps.Map(document.getElementById('map'), {
                center: { lat: 55.7352057, lng: 37.5912406 },
                zoom: 13
            });

            app.vm.locList().forEach(function(item) {
                item.marker = new google.maps.Marker({
                    map: map,
                    animation: google.maps.Animation.DROP,
                    position: item.position(),
                    name: item.label(),
                    infowindow: new google.maps.InfoWindow({
                        content: item.label()
                    })
                });

                item.marker.addListener('click', function() {
                    app.vm.selectLocation(item.marker);
                });


            })



        }
    }







