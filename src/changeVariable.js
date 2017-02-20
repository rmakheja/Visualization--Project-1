function tb() {
  this.currVariable = 0;
  loadDataset(variables);
  if(currHistogram == 0)
    drawBarChart(variables, dataset);
  else
    drawPieChart(variables, dataset);

}

function density() {
  this.currVariable = 1;
  loadDataset(variables);
  if(currHistogram == 0)
    drawBarChart(variables, dataset);
  else
    drawPieChart(variables, dataset);

}

function depth() {
  this.currVariable = 2;
  loadDataset(variables);
  if(currHistogram == 0)
    drawBarChart(variables, dataset);
  else
    drawPieChart(variables, dataset);

}

function area() {
  this.currVariable = 3;
  loadDataset(variables);
  if(currHistogram == 0)
    drawBarChart(variables, dataset);
  else
    drawPieChart(variables, dataset);

}