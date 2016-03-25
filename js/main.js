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
(function () {
    'use strict'; 
    // var filter,
        // locList,
        var self = this;
    
    
    app.ViewModel = {
        filter: ko.observable(""),

        locList: ko.observableArray([]),
        
        init: function () {
            
            var Location = function(location) {
                this.label = ko.observable(location.label);
                this.position = ko.observable(location.position);
                this.title = ko.observable(location.title);
                this.info = ko.observable(location.info);
                this.icon = ko.observable(location.icon);
                this.rubric = ko.observable(location.rubric);
                // this.isVisible = ko.computed(function() {return location.isVisible;});
                };

                        
            // We start of by creating a list of locations from Model data
            // and add bolean isVisible property which will react to user filter value
            app.Model.map(function(locItem) {
                var listItem = new Location(locItem);
                
                listItem.isVisible = ko.computed(function() {
                    var toggleValue = (listItem.label().toLowerCase().indexOf(app.ViewModel.filter().toLowerCase()) > -1) ? true : false;
                
                    return toggleValue;
                }, this);
                
                app.ViewModel.locList.push(listItem);
            });
        }, 
        
                
        bindMarkers: function () {
            //This will render only those markers which contains user's location    
            this.locList().forEach(function(location) {
                
                location.marker.map = ko.computed(function () {
                    return location.marker.map = location.isVisible() ? map : null;
                    
                }, this);

            });
        },
        
        test: function () {
            
            this.locList().forEach(function(location) {
                
                console.log(location.label())
                console.log('map is Object?')
                console.log(location.marker.map instanceof Object)
                console.log(location.marker.map)
                
                // console.log(map instanceof Function);
                // console.log(location.marker.map instanceof Function)
               
                
                // console.log(location.marker)
            });
        }, 
        
        loader: function () {
            console.log('google is loaded')
            // app.ViewModel.init();
            app.Map.initMap();
            app.ViewModel.bindMarkers();
        }

    };
    ko.applyBindings(app.ViewModel.init);
    
}) ()