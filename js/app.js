

var locMasterList = [
  // 'use strict',
  {
    label: 'yandex',
    position: {
      lat: 55.7342446,
      lng: 37.5881678
    },
    title: 'Yandex LLC',
    info: 'Leading Russian IT company',
    icon: "url: or link",
    rubric: 'IT',
    isVisible: true
  }, {
    label: 'white crane',
    position: {
      lat: 55.730955,
      lng: 37.5912852
    },
    title: 'white crane',
    info: 'Good Korean restaurant',
    icon: "url: or link",
    rubric: 'cafe',
    isVisible: true
  }, {
    label: 'Ice skating rink',
    position: {
      lat: 55.7663318,
      lng: 37.4376556
    },
    title: 'Ice skating rink "Krylatskoe"',
    info: 'Good ice, large space, good for kids',
    icon: "url: or link",
    rubric: 'leasure',
    isVisible: true
  }, {
    label: 'The State Tretyakov Gallery',
    position: {
      lat: 55.741392,
      lng: 37.6186752
    },
    title: 'The State Tretyakov Gallery',
    info: 'Art museum featuring 21st-century Russian works, including avant-garde & Socialist Realism exhibits',
    icon: "url: or link",
    rubric: 'culture',
    isVisible: true
  }, {
    label: 'Luzhniki Stadium',
    position: {
      lat: 55.723336,
      lng: 37.5782536
    },
    title: 'Luzhniki Stadium',
    info: 'Olympic venue, national football ground & home to both Torpedo Moscow & Spartak Moscow soccer teams.',
    icon: "url: or link",
    rubric: 'leasure',
    isVisible: true
  }
];


var Location = function(location) {
  // var self = this;
  this.label = ko.observable(location.label);
  this.position = ko.observable(location.position);
  this.title = ko.observable(location.title);
  this.info = ko.observable(location.info);
  this.icon = ko.observable(location.icon);
  this.rubric = ko.observable(location.rubric);
  this.isVisible = ko.computed(function() {return location.isVisible;});

};

var ViewModel = function() {
  var self = this;
  
  this.filter = ko.observable("");

  this.my_list = ko.observableArray([]);

  /*====== List of locations for rendering =======*/
  // We setup 'isVisible' method here in VM to have access to filter(). It will serve as a conditional parameter for rendering.
  // Other (abandonded)approach was to filter locations and make another 'list' of results. 
  locMasterList.map(function(locItem) {

    var x = new Location(locItem);

    // With conditional statement in index.html observable isVisible property allow us to get 'live' update of search results
    x.isVisible = ko.computed(function() {
      return (x.label().toLowerCase().indexOf(self.filter().toLowerCase()) > -1) ? true : false;
      }, this);

    self.my_list.push(x);

  });

 

};

ko.applyBindings(new ViewModel());


