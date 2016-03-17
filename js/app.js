var ViewModel, location, locationList;

locationData = [
  {
    label: 'yandex label',
    position: {
      lat: 55.7342446,
      lng: 37.5881678
    },
    title: 'Yandex LLC',
    info: 'Leading Russian IT company',
    icon: "url: or link",
    rubric: 'IT'
  }, {
    label: 'white crane',
    position: {
      lat: 55.730955,
      lng: 37.5912852
    },
    title: 'white crane',
    info: 'Good Korean restaurant',
    icon: "url: or link",
    rubric: 'cafe'
  }, {
    label: 'Ice skating rink',
    position: {
      lat: 55.7663318,
      lng: 37.4376556
    },
    title: 'Ice skating rink "Krylatskoe"',
    info: 'Good ice, large space, good for kids',
    icon: "url: or link",
    rubric: 'leasure'
  }, {
    label: 'The State Tretyakov Gallery',
    position: {
      lat: 55.741392,
      lng: 37.6186752
    },
    title: 'The State Tretyakov Gallery',
    info: 'Art museum featuring 21st-century Russian works, including avant-garde & Socialist Realism exhibits',
    icon: "url: or link",
    rubric: 'culture'
  }, {
    label: 'Luzhniki Stadium',
    position: {
      lat: 55.723336,
      lng: 37.5782536
    },
    title: 'Luzhniki Stadium',
    info: 'Olympic venue, national football ground & home to both Torpedo Moscow & Spartak Moscow soccer teams.',
    icon: "url: or link",
    rubric: 'leasure'
  }
];

Location = function(data) {
  this.label = ko.observable(data.label);
  this.position = ko.observable(data.position);
  this.title = ko.observable(data.title);
  this.info = ko.observable(data.info);
  this.icon = ko.observable(data.icon);
  this.rubric = ko.observable(data.rubric);
};

ViewModel = function() {
  var self = this;

  this.locationList = ko.observableArray([]);

  locationData.forEach(function(locItem){
    self.locationList.push(new Location(locItem));
  });

  this.userLocation = ko.observable("");

  //When user inputs some value in search box
  // new location list is rendered.

  var labelListToRender = ko.observableArray();
  // console.log(this.userLocation);
  for (var i = 0, labelListLength = locationData.length; i < labelListLength; i++ ) {
    // labelListToRender.push(locationData[i].label);
    var x = "y";
    if (self.userLocation.indexOf(locationData[i].label)) {
      labelListToRender.push(locationData[i].label);
      }
    // var result = userLocation.test()

  };
  console.log(labelListToRender);


 };

ko.applyBindings(new ViewModel());

