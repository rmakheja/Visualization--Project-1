
var currHistogram = 0;
var currVariable = 0;
var binCount = 5;
var variables =[[],[],[],[]];
var range = [];
var dataset = [];
for (var i = 0 ; i < binCount; i ++)
    dataset.push(0);
var sum = [];

function project() {
  this.histogram = document.getElementById('histogram');  
  loadFile(variables);
};

function loadFile(variables) {
  d3.csv("data/fishing.csv", function(data) {
        data.forEach(function(d) {
         this.variables[0].push((+d.totabund));
         this.variables[1].push(+d.density);
         this.variables[2].push(+d.meandepth);
         this.variables[3].push(+d.sweptarea);
        })
        loadArray(variables)
      })
  

};

function loadArray(variables) {
  for(i = 0; i < 4; i++)
  {
    var row = variables[i]
    var minimum = d3.min(row);
    var maximum = d3.max(row);
    range.push((maximum - minimum));
    sum.push(360/d3.sum(row));
  
  }
  loadDataset(variables)
};

function loadDataset(variables){
  document.getElementById("currBinCount").innerHTML = "Current bin count = " + this.binCount;
  this.dataset = [];
	for (var i = 0 ; i < this.binCount; i++)
    this.dataset.push(0);
	var minimum = d3.min(variables[currVariable]);
  var maximum = d3.max(variables[currVariable]);
  var r = range[currVariable] / binCount;
  
  for(var i=this.binCount; i--;) {
	
    variables[currVariable].forEach(function(d){
          var lower = maximum - r;
          if (d <= maximum && d > lower) {
              dataset[i]++;}

        });
    maximum -= r;
  }
  if(this.currHistogram == 0)
	 this.drawBarChart(variables, dataset)
  else
    this.drawPieChart(variables, dataset)
}
