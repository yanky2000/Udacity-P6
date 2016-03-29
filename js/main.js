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

        var Location = function(location) {
            this.label = ko.observable(location.label);
            this.position = ko.observable(location.position);
            this.title = ko.observable(location.title);
            this.info = ko.observable(location.info);
            this.icon = ko.observable(location.icon);
            this.rubric = ko.observable(location.rubric);
        };

        this.initData = function() {

            // We start off by creating a list of locations from Model data. 
            // the isVisible property is used to "filter" both location list and markers
            app.Model.map(function(locItem) {
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

        };
        this.initData();

        this.currentMarker = false; // Updates by user actions

        this.getFocus = function(e) {

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


            if (self.currentMarker !== selectedMarker) {

                if (self.currentMarker) {
                    self.currentMarker.setAnimation(null);
                    self.currentMarker.infowindow.close();
                }

                self.currentMarker = selectedMarker;
                self.currentMarker.setAnimation(google.maps.Animation.BOUNCE);
                self.loadData(self.currentMarker.name);
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
        }

    };

    app.vm = new ViewModel;
    ko.applyBindings(app.vm);

})()