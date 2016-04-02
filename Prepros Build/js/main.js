var app = app || {};

(function() {
    'use strict';

    var ViewModel = function(data) {
        var self = this;

        this.filter = ko.observable(""); // This is what user inputs in search field.

        this.locList = ko.observableArray([]); 

        // We start off by creating location list from our Model data.        
        this.initData = function(locationArray = app.Model) {

            var Location = function(location) {
                this.label = ko.observable(location.label);
                this.position = ko.observable(location.position);
                this.title = ko.observable(location.title);
                this.info = ko.observable(location.info);
                this.icon = ko.observable(location.icon);
                this.rubric = ko.observable(location.rubric);
            };

            var templist = [];

            locationArray.forEach(function(locItem) {
                var listItem = new Location(locItem);

                // For now, we filter locations only by its name(label), maybe we'll use some other options later on.
                listItem.isVisible = ko.computed(function() {
                    var list_Str = listItem.label().toLowerCase();
                    var search_Str = self.filter();

                    var isVisibleValue = (list_Str.indexOf(search_Str) > -1) ? true : false;

                    if (listItem.marker) {
                        listItem.marker.setVisible(isVisibleValue)
                    }

                    return isVisibleValue;
                }, this);

                templist.push(listItem);

            });
            self.locList(templist);
        };

        self.initData();

        this.lastMarker = false;

        // Describes what happens when user clicks either on map marker or location item in the list
        this.animateLocation = function(e) {

            var selectedMarker = e.marker ? e.marker : e;
            // Need code above because we have click events from 2 sources: map and locList, 
            // which may pass in 2 different objects (location object and it's marker)

            selectedMarker.infowindow.open(map, selectedMarker);

            if (self.lastMarker !== selectedMarker) {

                if (self.lastMarker) {
                    self.lastMarker.setAnimation(null);
                    self.lastMarker.infowindow.close();
                }

                self.lastMarker = selectedMarker;
                self.lastMarker.setAnimation(google.maps.Animation.BOUNCE);
                $('.wiki-container').show()
                self.loadData(self.lastMarker.name);
            };
        }

        // After user selects location wiki articles are generated automatically for that location
        this.loadData = function(locationName) {
            var $wikiElem = $('#wikipedia-links');
            var $wikiHeaderElem = $('#wikipedia-header');

            $wikiElem.empty();

            var wikiRequestTimeout = setTimeout(function() {
                $wikiElem.text('failed to load wiki articles');
            }, 8000);

            $.ajax({
                url: "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + locationName + "&format=json&callback=wikiCallback",
                dataType: "jsonp",
                success: function(data) {
                    var wikiArticlesList = [];
                    var wikiArticleHeadline = data[1];
                    var wikiArticleWebUrl = data[3];

                    for (var i = 0, respLength = data[1].length; i < respLength; i++) {
                        wikiArticlesList.push('<li class = "wiki-article">' +
                            '<a class="wiki-url" href=' + wikiArticleWebUrl[i] + '>'  + wikiArticleHeadline[i] + '</li>');
                    }

                    $wikiElem.append(wikiArticlesList);
                    clearTimeout(wikiRequestTimeout);

                },
                fail: function() {
                    $wikiHeaderElem.text("Sorry, could not load wiki links");
                }
            });
            return false;
        };

        // We also want to keep locations data up-to-date with cloud DB (Firebase).
        this.updateFirebase = function() {
            var myFirebaseRef = new Firebase("https://fend-p6.firebaseio.com/");

            myFirebaseRef.child("model").on("value", function(snapshot) {

                app.Model = snapshot.val();

                self.initData();
                app.Map.initMap()
            });
        }

        self.updateFirebase()
    };

    app.vm = new ViewModel();
    ko.applyBindings(app.vm);

})()