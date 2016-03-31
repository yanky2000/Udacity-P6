var app = app || {};

(function() {
    'use strict';

    var ViewModel = function() {
        var self = this;
        this.filter = ko.observable("");

        this.locList = ko.observableArray([]);

        /*** Creating location list for view */
        this.initData = function(locArray = app.Model) {
            console.log("locList at entry of initData(): " + self.locList());

            self.locList = ko.observableArray([]);
            /** THE BUG IS HERE!!!
             * after self.updateFirebase() fires self.locList() becomes empty, but View still has them! The question is "What does View actually display: an element of locList() array or some other instance?"
             * Apparently sel.locList = ko.observableArray([]) doesn't clear locations out from the View!
            */

            console.log("locList after clearing in initData(): " + self.locList());

            var Location = function(location) {
                this.label = ko.observable(location.label);
                this.position = ko.observable(location.position);
                this.title = ko.observable(location.title);
                this.info = ko.observable(location.info);
                this.icon = ko.observable(location.icon);
                this.rubric = ko.observable(location.rubric);
            };

            // We start off by creating a list of locations from Model data. 
            // the isVisible property is used to "filter" both location list and markers
            locArray.forEach(function(locItem) {
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

                self.locList.push(listItem);
            });
            console.log("yandex value in Model: " + app.Model[0].label);
            console.log("yandex value in locList: " + (self.locList()[0] ? self.locList()[0].label() : "no data yet"));
        };

        self.initData(app.Model);

        
        this.lastMarker = false; // Updates by user actions

        this.selectLocation = function(e) {

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

        this.loadData = function(locationName) {
            var $body = $('body');
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

        this.updateFirebase = function() {
            var myFirebaseRef = new Firebase("https://fend-p6.firebaseio.com/");

            myFirebaseRef.child("model").on("value", function(snapshot) {
                /*** should check if new data differs from app.Model, if true - update app.Model */
                console.log("data " + ((app.Model == snapshot.val()) ? "is up-to-date" : "has been updated"));

                app.Model = snapshot.val();
                self.initData();
                app.Map.initMap()
            });
        }
    };

    app.vm = new ViewModel();
    ko.applyBindings(app.vm);

})()