var Model = function () {
'use strict';
  this.all_locations = [
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
  return this.all_locations;
};

var initLocList = new Model();

var Location = function(data) {
  this.label = ko.observable(data.label);
  this.position = ko.observable(data.position);
  this.title = ko.observable(data.title);
  this.info = ko.observable(data.info);
  this.icon = ko.observable(data.icon);
  this.rubric = ko.observable(data.rubric);
  debugger;
  this.isVisible = ko.computed(function(){
    return (this.label().toLowerCase().indexOf(matchString) == -1) ? false : true;
  });
};



var ViewModel = function() {
  var self = this;


  this.my_list = ko.observableArray([]);
  initLocList.forEach(function(loc){
    self.my_list.push(new Location(loc));
  });

  console.log(self.my_list());



  /* =============== Locations filter ================= */
  this.filter = ko.observable("");

  var matchString = self.filter().toLowerCase();


  // this.changeVisible = function () {

  //   if (!matchString) {
  //     return true;
  //     }
  //     else {
  //       for (var i=0, loc_length = my_list.length; i < loc_length; i++) {
  //         my_list[i].isVisible = (my_list[i].label.toLowerCase().indexOf(matchString) == -1) ? false : true;
  //         }
  //       }
  //   };



};

ko.applyBindings(new ViewModel());


