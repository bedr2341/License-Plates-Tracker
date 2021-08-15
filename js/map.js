//--------Modification of  michellechandra's code (https://gist.github.com/michellechandra/0b2ce4923dc9b5809922#file-cities-lived-csv)
var width = 960;
var height = 500;

var projection = d3.geo.albersUsa()
				.translate([width/2, height/2])
				.scale([1000]);
			
var path = d3.geo.path().projection(projection);

var color = d3.scale.linear().range(["rgb(213,222,217)","rgb(253,208,162)","rgb(253,174,107)","rgb(253,141,60)","rgb(230,85,13)","rgb(166,54,3)"]);
var legendText = ["Very Common", "Common", "Uncommon", "Rare", "Very Rare", "Not Seen Yet"];

var svg = d3.select("body")
			.append("svg")
			.attr("width", width)
			.attr("height", height);
        
var div = d3.select("body")
		    .append("div")   
    		.attr("class", "tooltip")               
    		.style("opacity", 0);

var img = div.append("img")
			.attr("class", "license")
			.style("opacity", 0)

//removes any hanging license plates when clicking
d3.select("body").on("click", function(d) {
	div.style("opacity", 0);
	img.style("opacity", 0);
});

// Load in my states data!
d3.csv("data/states_spotted.csv", function(data) {
	color.domain([0,1,2,3,4,5]); // setting the range of the input data

	d3.json("data/us_states.json", function(json) {
		// Loop through each state data value in the .csv file
		for (var i = 0; i < data.length; i++) {
			var dataState = data[i].state;
			var dataValue = data[i].visited;

			for (var j = 0; j < json.features.length; j++)  {
				var jsonState = json.features[j].properties.name;

				if (dataState == jsonState) {
					json.features[j].properties.visited = dataValue; 
					break;
				}
			}
		}
			
		// Bind the data to the SVG and create one path per GeoJSON feature
		svg.selectAll("path")
			.data(json.features)
			.enter()
			.append("path")
			.attr("d", path)
			//license plate appears when hovering over state
			.on("mouseover", function(d) {     
				div.transition() 
					.duration(200)
					.style("opacity", 1)
					.style("left", (d3.event.pageX) + "px")
					.style("top", (d3.event.pageY - 28) + "px");
				img.attr('src', 'images/' + d.properties.name + '.jpg')
					.style("opacity", 1);
			})
			//opens the modal box on click
			.on("click", function(d) {
				var myModal = new bootstrap.Modal(document.getElementById('stateModal'))
				myModal.show();
				
				dropdownButton.innerText = d.properties.name;
				selectedState = d.properties.name;
			})
			.style("stroke", "#fff")
			.style("stroke-width", "1")
			.style("fill", function(d) {

			var value = d.properties.visited;
			if (value) {
				return color(value);
			} else {
				return color(0);
			}
		});  
			
		var legend = d3.select("body").append("svg")
						.attr("class", "legend")
						.attr("width", 140)
						.attr("height", 200)
						.selectAll("g")
						.data(color.domain().slice().reverse())
						.enter()
						.append("g")
						.attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

		legend.append("rect")
			.attr("width", 18)
			.attr("height", 18)
			.style("fill", color);

		legend.append("text")
			.data(legendText)
			.attr("x", 24)
			.attr("y", 9)
			.attr("dy", ".35em")
			.text(function(d) { return d; });
	});
});