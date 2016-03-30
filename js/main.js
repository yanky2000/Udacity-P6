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

    var ViewModel = function() {
        var self = this;
        this.filter = ko.observable("");

        this.locList = ko.observableArray([]);


        this.initData = function(list) {

            var Location = function(location) {
                this.label = ko.observable(location.label);
                this.position = ko.observable(location.position);
                this.title = ko.observable(location.title);
                this.info = ko.observable(location.info);
                this.icon = ko.observable(location.icon);
                this.rubric = ko.observable(location.rubric);
            };

            // self.locList = ko.observableArray([]);
            // We start off by creating a list of locations from Model data. 
            // the isVisible property is used to "filter" both location list and markers
            list.forEach(function(locItem) {
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
            console.log(self.locList()); // testing firebase
            console.log(self.locList()[0].label()); // testing firebase


        };
        self.initData(app.Model);

        this.lastMarker = false; // Updates by user actions

        this.selectLocation = function(e) {

            var selectedMarker = e.marker ? e.marker : e;
            // Need code above because we have 2 different click events (from map and locList)

            selectedMarker.infowindow.open(map, selectedMarker);

            /***Alternative marker animation style */
            // If we don't want inforwindow open, when user clicks on location list item.

            // if (selectedMarker === e) {
            //     selectedMarker.infowindow.open(map, e);
            //     // e.infowindow.open(map, e);
            // } else {
            //     e.marker.infowindow.open(map, e.marker);
            // }


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
                var message = (app.Model == snapshot.val()) ? "is up-to-date" : "has been updated";
                console.log("data " + message);
                console.log('appModel before is ' + app.Model[0].label);
                console.log('snapshot val is ' + snapshot.val()[0].label);
                // console.log('locList val is ' + self.locList()[0].label);


                // console.log(snapshot.val()[0].label);  // Alerts "San Francisco"
                app.Model = snapshot.val();
                // console.log('appModel before is ' + app.Model[0].label);

                self.initData(snapshot.val());
            });
            self.locList = ko.observableArray([]);

        }
        self.updateFirebase();

    };

    app.vm = new ViewModel();
    ko.applyBindings(app.vm);

})()