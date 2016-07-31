
var map, heatmap;

var csv1 = "EXPORT_Detection20160727";
var csv2 = "EXPORT_Sighting20160727";

var points = [];
var lat, lng;

var marker;


function initMap() {

	$.get(csv1 + ".csv", function(csvFile1) {
		points = parseCSVData(csvFile1);
	
	//$("#infoOne").text(parseCSVData(csvFile));
	
		$.get(csv2 + ".csv", function(csvFile2) {

			points = points.concat(parseCSVData(csvFile2));
			
		  map = new google.maps.Map(document.getElementById('map'), {
			zoom: 9,
			center: {lat: -32.9309, lng: 115.7818},
			mapTypeId: 'roadmap',
			minZoom: 9,
			maxZoom: 14
		  });
		 
		 

		
		google.maps.event.addListener(map, 'click', function( event ){
			if (marker) {
				marker.setMap(null);
			};
			placeMarker(event.latLng);
			lat = event.latLng.lat();
			lng = event.latLng.lng(); 
		});


		  heatmap = new google.maps.visualization.HeatmapLayer({
			data: points,
			map: map
		  });
		  
				heatmap.setOptions({
						dissipating: true,
						radius: 70,
						//dissipating: false
				});
		}, "text");
	}, "text");
}



function placeMarker(location) {
    marker = new google.maps.Marker({
        position: location, 
        map: map
    });
}


function parseCSVData(csvFile) {

	var data = [];
	
	//Split csv file into array of rows
	var lines = csvFile.split("\n");
	var today = new Date();
	var date;

	//Iterate through each row
	$.each(lines, function (lineNumber, line) {
	
		//Split line into array of columns
		var fields = line.split(",");
	
		//Push to data array if not empty
		if (fields != "") {
			
			if (fields.length<9) {
				date = Date.parse(fields[fields.length - 4]);
			} else date = Date.parse(fields[fields.length - 7]);
			
			
			
			var timeDif = today - date;
			
			var lo = parseFloat(fields[fields.length - 2]);
			var la = parseFloat(fields[fields.length - 1]);
		
			//var dist = timeDif*0.0000000000075;
		
			var wei = (timeDif/2592000000)/2;
			/*
			var lap = la - -dist;
			var lan = la - dist;
			var lop = lo - -dist;
			var lon = lo - dist;
			*/
			var rad = 0.0045;
			
			//$("#infoTwo").append(wei + "," + timeDif + ",");
			
			var dist = parseInt(wei*9);
		
			for (i=1; i<dist; i++) {
				if (lo < 115.7547756) {
				for (j=0; j<i+1; j++){
					data.push({location:new google.maps.LatLng(la - i*rad,lo - j*rad), weight: wei});
					data.push({location:new google.maps.LatLng(la - -i*rad,lo - j*rad), weight: wei});
				}
				for (k=1; k<2*i-1; k++) {
					data.push({location:new google.maps.LatLng(la - k*rad,lo - i*rad), weight: wei});
					data.push({location:new google.maps.LatLng(la - -k*rad,lo - i*rad), weight: wei});
				}
				}
				data.push({location:new google.maps.LatLng(la,lo), weight: wei});
				data.push({location:new google.maps.LatLng(la,lo - i*rad), weight: wei});
			}
		
			/*
			data.push({location:new google.maps.LatLng(la,lo), weight: wei});
			data.push({location:new google.maps.LatLng(lap,lo), weight: wei});
			//data.push({location:new google.maps.LatLng(la,lop), weight: wei});
			data.push({location:new google.maps.LatLng(lan,lo), weight: wei});
			data.push({location:new google.maps.LatLng(la,lon), weight: wei});
			//data.push({location:new google.maps.LatLng(lap,lop), weight: wei});
			//data.push({location:new google.maps.LatLng(lan,lop), weight: wei});
			data.push({location:new google.maps.LatLng(lap,lon), weight: wei});
			data.push({location:new google.maps.LatLng(lan,lon), weight: wei});
			*/
			
		}
		if (lineNumber == 30) return false;
	});
	return data;
}