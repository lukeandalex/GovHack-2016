var map, heatmap;

var csv = "EXPORT_Detection20160727";

var points = [];

function initMap() {
	

	
	$.get(csv + ".csv", function(csvFile) {

	//Parse data into Highstocks format
	points = parseCSVData(csvFile);
		$("#test").text(points);
	
	

  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13,
    center: {lat: -32.3492, lng: 115.7334},
    mapTypeId: 'map'
  });
	/*
  heatmap = new google.maps.visualization.HeatmapLayer({
    data: points,
    map: map
  });*/
  //}, "text");
}

function toggleHeatmap() {
  heatmap.setMap(heatmap.getMap() ? null : map);
}

function changeGradient() {
  var gradient = [
    'rgba(0, 255, 255, 0)',
    'rgba(0, 255, 255, 1)',
    'rgba(0, 191, 255, 1)',
    'rgba(0, 127, 255, 1)',
    'rgba(0, 63, 255, 1)',
    'rgba(0, 0, 255, 1)',
    'rgba(0, 0, 223, 1)',
    'rgba(0, 0, 191, 1)',
    'rgba(0, 0, 159, 1)',
    'rgba(0, 0, 127, 1)',
    'rgba(63, 0, 91, 1)',
    'rgba(127, 0, 63, 1)',
    'rgba(191, 0, 31, 1)',
    'rgba(255, 0, 0, 1)'
  ]
  heatmap.set('gradient', heatmap.get('gradient') ? null : gradient);
}

function changeRadius() {
  heatmap.set('radius', heatmap.get('radius') ? null : 20);
}

function changeOpacity() {
  heatmap.set('opacity', heatmap.get('opacity') ? null : 0.2);
}





function parseCSVData(csvFile) {

	var data = [];

	//Split csv file into array of rows
	var lines = csvFile.split("\n");


	//Iterate through each row
	$.each(lines, function (lineNumber, line) {
	
		//Split line into array of columns
		var fields = line.split(",");
	
		//Push to data array if not empty
		if (fields != "") {
		
			
			var lo = parseFloat(fields[5]);
			var la = parseFloat(fields[6]);
		
			data.push("new google.maps.LatLng(" + la + "," + lo + ")"); 
		}
	});
	return data;
}