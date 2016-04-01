var app = app || {};
'use strict',

    app.Map = {
        initMap: function(obectsArray = app.vm.locList()) {

            map = new google.maps.Map(document.getElementById('map'), {
                center: { lat: 55.7352057, lng: 37.5912406 },
                zoom: 12
            });

            obectsArray.forEach(function(item) {
                var string = '<strong>' + item.label() + '</strong>' + '<p>' + item.info()
                item.marker = new google.maps.Marker({
                    map: map,
                    animation: google.maps.Animation.DROP,
                    position: item.position(),
                    name: item.label(),
                    infowindow: new google.maps.InfoWindow({
                        // content: item.label()+" "+item.info()
                        content: string,
                        maxWidth: 200
                    })

                });

                item.marker.addListener('click', function() {
                    app.vm.animateLocation(item.marker);
                });
            })
        }
    }







