/** TODO:
 * - sort location items in the list
 * - travis search form and mobile nav
 * - inject web font
 * - set font size and marging
 * - Put good title for the map
 * - style wiki pane
 */


var app = app || {};

(function() {
    'use strict';

    var ViewModel = function(data) {
        var self = this;

        this.filter = ko.observable(""); // This is what user types in search form 
        this.locList = ko.observableArray([]); // It'll be our generated location list we operate on.

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
            // Need code above because we have 2 different click events (from map and locList)

            selectedMarker.infowindow.open(map, selectedMarker);

            if (self.lastMarker !== selectedMarker) {

                if (self.lastMarker) {
                    self.lastMarker.setAnimation(null);
                    self.lastMarker.infowindow.close();
                }

                self.lastMarker = selectedMarker;
                self.lastMarker.setAnimation(google.maps.Animation.BOUNCE);
                self.loadData(self.lastMarker.name);
            };
        }

        // After user selects location wiki articles are generated automatically
        this.loadData = function(locationName) {
            // var $body = $('body');
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
                        wikiArticlesList.push('<li class = "wiki-article">' + wikiArticleHeadline[i] +
                            '<a href=' + wikiArticleWebUrl[i] + '>' + wikiArticleWebUrl[i] + '</li>');
                    }

                    $wikiElem.append(wikiArticlesList);
                    clearTimeout(wikiRequestTimeout);

                },
            });
            return false;
        };

        // We also want to keep locations data up-to-date with cloud DB.
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