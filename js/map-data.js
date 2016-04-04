var app = app || {};
'use strict',
  
    /** Below is Google map related code*/
    app.Map = {

        /**
         * Creates google map and add map markers to locations
         * @param {array} obectsArray Locations array generated in app.vm
         */
        initMap: function(obectsArray = app.vm.locList()) {
            if (typeof google !== 'undefined') {

                map = new google.maps.Map(document.getElementById('map'), {
                    center: { lat: 55.7352057, lng: 37.5912406 },
                    zoom: 12
                });

                obectsArray.forEach(function(item) {
                    var string = '<strong>' + item.label() + '</strong>' + '<p>' + item.info();
                    item.marker = new google.maps.Marker({
                        map: map,
                        animation: google.maps.Animation.DROP,
                        position: item.position(),
                        name: item.label(),
                        // icon: item.icon(),
                        infowindow: new google.maps.InfoWindow({
                            // content: item.label()+" "+item.info()
                            content: string,
                            maxWidth: 200
                        })

                    });

                    item.marker.addListener('click', function() {
                        app.vm.animateLocation(item.marker);
                    });
                });
            }
            else {
                app.Map.googleErrorCase();
            }
        },

        /** 
         * Onerror function for google script in index.html
         * */
        googleErrorCase: function() {
            alert("Please, check for Internet connection.\nGoogle map service is out of reach!");
        }

    };