function drawGraph() {
  if (localStorage.getItem("tbRecords") ===
    null) {
    alert("No records exist.");

    $(location).attr("href", "#pageMenu");
  } else {
    setupCanvas();

    var BMIarr = new Array();
    var Datearr = new Array();
    getBMIhistory(BMIarr, Datearr);

    var bmiLower = new Array(2);
    var bmiUpper = new Array(2);
    getBMIbounds(bmiLower, bmiUpper);

    drawLines(BMIarr, bmiUpper, bmiLower,Datearr);
    labelAxes();
  }
}

function setupCanvas() {

  var c = document.getElementById("GraphCanvas");
  var ctx = c.getContext("2d");

  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0, 0, 500, 500);

}

function getBMIhistory(BMIarr, Datearr) {
  var tbRecords = JSON.parse(localStorage.getItem(
    "tbRecords")); //tb records where does it ship

  tbRecords.sort(compareDates);

  for (var i = 0; i < tbRecords.length; i++) {
    var date = new Date(tbRecords[i].Date);

    /*These methods start at 0, must increment
     * by one to compensate
     */
    var m = date.getMonth() + 1;
    var d = date.getDate() + 1;

    //The x-axis label
    Datearr[i] = (m + "/" + d);

    //The point to plot
    BMIarr[i] = parseFloat(tbRecords[i].weight/Math.pow(tbRecords[i].height,2));
  }
}

function getBMIbounds(bmiLower, bmiUpper) {
  //Get users cancer stage
  //var user = JSON.parse(localStorage.getItem(
  //  "user"));
  //var TSHLevel = user.TSHRange;

  /*These lines show upper and lower bounds
   * of acceptable TSH levels (for each
   * stage)
   */

  bmiLower[0] = bmiUpper[1] = 0.5;
  bmiLower[0] = bmiUpper[1] = 0.1;

  /*
  if (TSHLevel == "StageA") {
    tshUpper[0] = tshUpper[1] = 0.1;
    tshLower[0] = tshLower[1] = 0.01;
  } else if (TSHLevel == "StageB") {
    tshUpper[0] = tshUpper[1] = 0.5;
    tshLower[0] = tshLower[1] = 0.1;
  } else {
    tshUpper[0] = tshUpper[1] = 2.0;
    tshLower[0] = tshLower[1] = 0.35;
  }*/
}

function drawLines(TSHarr, tshUpper, tshLower,
  Datearr) {
  var TSHline = new RGraph.Line("GraphCanvas",
      TSHarr, tshUpper, tshLower)
    .Set("labels", Datearr)
    .Set("colors", ["blue"])
    .Set("shadow", true)
    .Set("shadow.offsetx", 1)
    .Set("shadow.offsety", 1)
    .Set("linewidth", 1)
    .Set("numxticks", 6)
    .Set("scale.decimals", 2)
    .Set("xaxispos", "bottom")
    .Set("gutter.left", 40)
    .Set("tickmarks", "filledcircle")
    .Set("ticksize", 5)
    .Set("chart.labels.ingraph", [, , ["BMI",
      "blue", "yellow", 1, 80
    ], , ])
    .Set("chart.title", "BMI")
    .Draw();
}

function labelAxes() {
  var c = document.getElementById("GraphCanvas");
  var ctx = c.getContext("2d");
  ctx.font = "11px Georgia";
  ctx.fillStyle = "green";
  ctx.fillText("Date(MM/DD)", 400, 470);
  ctx.rotate(-Math.PI / 2);
  ctx.textAlign = "center";
  ctx.fillText("BMI Value", -250, 10);
}