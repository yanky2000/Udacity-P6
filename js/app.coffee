# TODO:

# List view of locations on the left

# Place filter (input field) for both list view and the map markers
## Additional functionality (keyboard shortcut, autocomplete, filter on multiple fields)

# 3d party API info when map marker or list view is clicked, add error handling

# Responsive design (hamburger menu)

# data persists when app is closed and reopened via localStorage or ext database(firebase)

# Comments



################### MARKERS #####################

locationList = [
	{
		label: 'yandex label'
		position: 
			lat: 55.7342446 
			lng: 37.5881678
		title: 'Yandex LLC'
		info: 'Leading Russian IT company'
		icon: "url: or link" #depends on data set
		rubric: 'IT'
	}, 
	
	{
		label: 'white crane'
		position: 
			lat: 55.730955 
			lng: 37.5912852
		title: 'white crane'
		info: 'Good Korean restaurant'
		icon: "url: or link" #depends on data set
		rubric: 'cafe'
	},
	{
		label: 'Ice skating rink'
		position: 
			lat: 55.7663318 
			lng: 37.4376556
		title: 'Ice skating rink "Krylatskoe"'
		info: 'Good ice, large space, good for kids'
		icon: "url: or link" #depends on data set
		rubric: 'leasure'
	}, 
	{
		label: 'The State Tretyakov Gallery'
		position: 
			lat: 55.741392
			lng: 37.6186752
		title: 'The State Tretyakov Gallery'
		info: 'Art museum featuring 21st-century Russian works, including avant-garde & Socialist Realism exhibits'
		icon: "url: or link" #depends on data set
		rubric: 'culture'
	}, 
	{
		label: 'Luzhniki Stadium'
		position: 
			lat: 55.723336
			lng: 37.5782536
		title: 'Luzhniki Stadium'
		info: 'Olympic venue, national football ground & home to both Torpedo Moscow & Spartak Moscow soccer teams.'
		icon: "url: or link" #depends on data set
		rubric: 'leasure'
	}, 
]


location = (data) -> # marker to be displayed
	#name, position .... of list 
	this.label = ko.observable(data.label)
	this.position = ko.observable(data.position)
	this.title = ko.observable(data.title)
	this.info = ko.observable(data.info)
	this.icon = ko.observable(data.icon)
	this.rubric = ko.observable(data.rubric)


ViewModel= ->
	#functions
	self = this
	
