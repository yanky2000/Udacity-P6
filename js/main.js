// 1. Create a list of location from Model
//1.1 Create observables
//1.2 Create filter and set isVisible property
//1.3 Apply bindings

// 2. Once google is loaded: 
//2.1 Create a map
//2.2 Create markers
//2.2.1 Attach markers to the location list
//2.2.2 Link markers map value to isVisible property
var app = app || {};
(function() {
    'use strict';
    var self = this;



    app.ViewModel = {
        filter: ko.observable(""),

        locList: ko.observableArray([]),

        init: function() {

            var Location = function(location) {
                this.label = ko.observable(location.label);
                this.position = ko.observable(location.position);
                this.title = ko.observable(location.title);
                this.info = ko.observable(location.info);
                this.icon = ko.observable(location.icon);
                this.rubric = ko.observable(location.rubric);
                // this.isVisible = ko.computed(function() {return location.isVisible;});
            };

            // We start of by creating a list of locations from Model data. 
            // the isVisible property is used to "filter" both location list and markers
            app.Model.map(function(locItem) {
                var listItem = new Location(locItem);

                listItem.isVisible = ko.computed(function() {
                    var list_Str = listItem.label().toLowerCase();
                    var search_Str = app.ViewModel.filter();

                    var isVisibleValue = (list_Str.indexOf(search_Str) > -1) ? true : false;

                    if (listItem.marker) {
                        listItem.marker.setVisible(isVisibleValue)
                    }

                    return isVisibleValue;
                }, this);

                app.ViewModel.locList.push(listItem);
            });

        },
        currentMarker: false, // Updates by user actions

        getFocus: function(e) {

            // if location selected from list location OBJECT itself has been passed here
            // if invocation comes from map marker 'click' event - we have an OBJECT PROP (a marker). To process further, we get both cases to a "marker case" 
            var selectedMarker = e.marker ? e.marker : e;

            // We want infowindow to be displayed only if map marker (not list item) has been clicked. If user selects location from the search list, location's name (which is infowindow content) is already known.
            if (selectedMarker === e) {
                e.infowindow.open(map, e);
            }


            if (app.ViewModel.currentMarker) {
                app.ViewModel.currentMarker.setAnimation(null);
                app.ViewModel.currentMarker.infowindow.close();
            }

            app.ViewModel.currentMarker = selectedMarker;
            app.ViewModel.currentMarker.setAnimation(google.maps.Animation.BOUNCE);
        }


    };
    ko.applyBindings(app.ViewModel.init);

})()