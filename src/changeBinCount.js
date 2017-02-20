function changeBinCount(){


		d3.select("#changeBinCount").on("mousedown", function() {
			var div = d3.select(this)
	      	  .classed("active", true);
			var xPos = d3.mouse(div.node())[0]
			var w = d3.select(window)
		      .on("mousemove", mousemove)
		      .on("mouseup", function(){
		      	div.classed("active", false);
	    		w.on("mousemove", null).on("mouseup", null);
		      });				
		        function mousemove() {
	  			if(d3.mouse(div.node())[0] + 10 < xPos){
	  				
	  				decreaseBinCount();
	  				
					xPos = d3.mouse(div.node())[0];

	  			}
	  			else if(d3.mouse(div.node())[0] - 10 > xPos){
	  				
	  				increaseBinCount();
				xPos = d3.mouse(div.node())[0];
	  			}
	  			
	  			
	  		}

		});
}

function slider(val) {
  
  this.binCount = parseInt(val);
  loadDataset(this.variables);
}

function increaseBinCount(){
var slider = this.document.getElementById("slider")
slider.value = this.binCount
.value = this.binCount;
  if(this.binCount == 15)
    return;
  this.binCount +=1;
  loadDataset(variables);
}

function decreaseBinCount(){
  this.document.getElementById("slider").value = this.binCount;
  if(this.binCount == 2)
    return;
  this.binCount -=1;
  loadDataset(variables);
}

