var loadHTML = function() {
  window.location = "forceDirected.html"
}
function changeHistogram() {
	
	if(this.currHistogram == 0) {
		drawPieChart();
		this.currHistogram == 1;
	}
	else {
		drawBarChart();
		this.currHistogram == 0;
	}
};

function drawBarChart(variables, dataset) {
  document.getElementById("histogram").innerHTML = '';
  this.document.getElementById("buttons").hidden = false;
  this.currHistogram = 0;
	var w = 500;
	var h = 350;
	var maximum = d3.max(dataset);
	var scaleHeight = (0.9*h/maximum);
	var barPadding = 6;
  var color = []
  color.push("#e65100");
  color.push("#ef6c00");
  color.push("#ff9800");
  color.push("#ffb74d");
  color.push("#ffe0b2");
  color.push("#ffb74d");
  color.push("#ff9800");
  color.push("#ef6c00");

	var svg = d3.select("#histogram")
				.append("svg")
				.attr("width", w+25)
				.attr("height", h + 100).append("g");
  var xScale = d3.scaleLinear()
    .domain([0, d3.max(variables[currVariable])])
    .range([25, w + 25]);

var yScale = d3.scaleLinear()
    .domain([0, d3.max(dataset)])
     .range([h, 0]);


var i = -1;
	var rects =	svg.selectAll("rect")
		   .data(dataset)
		   .enter()
		   .append("rect")
		   .attr("x", function(d, i) {
		   		return (i * (w / dataset.length)+25);
		   })
		   .attr("y", function(d) {
		   		return h - (d * scaleHeight);
		   })
		   .attr("width", w / dataset.length - barPadding)
		   .attr("height", function(d) {
		   		return d * scaleHeight ;

		   })
		   .attr("fill", function() {
        i++;
			return color[i%8];
		   })
		   .on("mouseover", function(d,i) {
		   	d3.select(this)
		   	.attr("y",d3.select(this).attr("y") - 15)
            	.attr("height",parseInt(d3.select(this).attr("height")) + 15)
            	.attr("x",i * (w / dataset.length) + 25) 
                .attr("width",w / dataset.length - barPadding + 5)
	            d3.selectAll("text")
               .select(function(d, ind) { return ind === i ? this : null; })
                  .style("opacity",100)

             })
             .on("mouseout", function(d,i) {
                  d3.select(this)
                  .attr("width", w / dataset.length - barPadding)
                  .attr("y",parseInt(d3.select(this).attr("y")) + 15)
                  .attr("x",i * (w / dataset.length) + 25) 
                  .attr("height",parseInt(d3.select(this).attr("height")) - 15)
                  
                  d3.selectAll("text")
                  .select(function(d, ind) { return ind === i ? this : null; })
                  .style("opacity",0)})
             .on("click",function(){drawPieChart(variables, dataset)});


  var text = svg.selectAll("text")
             .data(dataset)
             .enter()
             .append("text")
             .text(function(d) {
                return d;
             })
             .attr("text-anchor", "middle")
             .attr("x", function(d, i) {
                return i * (w / dataset.length) + (w / dataset.length - barPadding) / 2 + 25;
             })
             .attr("y", function(d) {
                  return h - (d * scaleHeight) - 20;
             })
             .attr("font-family", "sans-serif")
             .attr("font-size", 20)
             .attr("fill", "black")
                   .style("opacity",0);

svg.append("g")
        .attr("transform", "translate(0," + h + ")")
        .call(d3.axisBottom(xScale));

    // add the y Axis
    svg.append("g")
    .attr("transform", "translate(25)")
        .call(d3.axisLeft(yScale));

};

function drawPieChart(variables, dataset) {
  this.currHistogram = 1;
	document.getElementById("histogram").innerHTML='';
  document.getElementById('buttons').hidden = false;
	var radius = 150;
	var w = 500;
	var h = 400;
  var i = -1;
  var mulRatio = sum[currVariable];
  var color = []
  color.push("#e65100");
  color.push("#ef6c00");
  color.push("#ff9800");
  color.push("#ffb74d");
  color.push("#ffe0b2");
  color.push("#ffb74d");
  color.push("#ff9800");
  color.push("#ef6c00");
  var svg = d3.select("#histogram")
            .append("svg")
            .attr("width", w)
            .attr("height", h)
            .append('g')
            .attr('transform', 'translate(' + 1.3*radius + ',' + 1.3*radius + ')');;

  var pie = d3.pie()
            .value(function(d) {return mulRatio * d;});
  var arc = d3.arc()
            .outerRadius(radius)
            .innerRadius(0);

  var arc2 = d3.arc()
            .innerRadius(0)
            .outerRadius(radius + 20);


  var pieC = svg.selectAll("path")
            .data(pie(dataset))
            .enter()
            .append("path")
            .attr('d', arc)   
            .attr('fill', function(){
              i++;
              return color[i%8];
            })
            .on("mouseover", function(d,i) {
              d3.select(this)
                .attr("stroke", "brown")
                .attr("d", arc2)
                .attr("stroke-width", 2);
              
              svg.append("text")
              .attr("transform", function() {
                    var c = arc.centroid(d);
                   return "translate(" + c[0] * 1.5 +"," + c[1]* 1.5 + ")";
              })
              .style("text-anchor", "middle")
              .style("font-size", 15)
              .attr("class", "label")
              .style("opacity",100)
              .text(d.data);

            })
            .on("mouseout", function(d,i) {
              d3.select(this)
              .attr("d",arc)
              .attr("stroke", "none");
              svg.selectAll("text")
                      .style("opacity",0);
              
            })
            .on("click",function(){drawBarChart(variables, dataset)});
};

