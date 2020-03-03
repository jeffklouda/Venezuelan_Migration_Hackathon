// Set the dimensions of the canvas / graph
var margin = {top: 30, right: 20, bottom: 30, left: 100},
    width = 800 - margin.left - margin.right,
    height = 800 - margin.top - margin.bottom;

// Parse the date / time
var parseDate = d3.time.format("%y-%b").parse;
var formatTime = d3.time.format("%B %Y");

// Set the ranges
var x = d3.time.scale().range([0, width]);
var y = d3.scale.linear().range([height, 0]);

// Define the axes
var xAxis = d3.svg.axis().scale(x)
    .orient("bottom").ticks(3);

var yAxis = d3.svg.axis().scale(y)
    .orient("left").ticks(4);

var departments = [
    "Antioquia",
    "Atlantico",
    "Bogota",
    "Boyaca",
    "Bolivar",
    "Caldas",
    "Caqueta",
    "Cauca",
    "Cesar",
    "Cordoba",
    "Cundinamarca",
    "Choco",
    "Huila",
    "LaGuajira",
    "Magdalena",
    "Meta",
    "Narino",
    "NorteDeSantander",
    "Quindio",
    "Risaralda",
    "Santander",
    "Sucre",
    "Tolima",
    "ValleDelCauca"
]

// Define the lines
var valuelines = {};

valuelines["Antioquia"] = d3.svg.line()
    .x(function(d) { return x(d.Date); })
    .y(function(d) { return y(d.Antioquia); });

valuelines["Atlantico"] = d3.svg.line()
    .x(function(d) { return x(d.Date); })
    .y(function(d) { return y(d.Atlantico); });

valuelines["Bogota"] = d3.svg.line()
    .x(function(d) { return x(d.Date); })
    .y(function(d) { return y(d.Bogota); });

valuelines["Boyaca"] = d3.svg.line()
    .x(function(d) { return x(d.Date); })
    .y(function(d) { return y(d.Boyaca); });

valuelines["Bolivar"] = d3.svg.line()
    .x(function(d) { return x(d.Date); })
    .y(function(d) { return y(d.Bolivar); });

valuelines["Caldas"] = d3.svg.line()
    .x(function(d) { return x(d.Date); })
    .y(function(d) { return y(d.Caldas); });

valuelines["Caqueta"] = d3.svg.line()
    .x(function(d) { return x(d.Date); })
    .y(function(d) { return y(d.Caqueta); });

valuelines["Cauca"] = d3.svg.line()
    .x(function(d) { return x(d.Date); })
    .y(function(d) { return y(d.Cauca); });

valuelines["Cesar"] = d3.svg.line()
    .x(function(d) { return x(d.Date); })
    .y(function(d) { return y(d.Cesar); });

valuelines["Cordoba"] = d3.svg.line()
    .x(function(d) { return x(d.Date); })
    .y(function(d) { return y(d.Cordoba); });

valuelines["Cundinamarca"] = d3.svg.line()
    .x(function(d) { return x(d.Date); })
    .y(function(d) { return y(d.Cundinamarca); });

valuelines["Choco"] = d3.svg.line()
    .x(function(d) { return x(d.Date); })
    .y(function(d) { return y(d.Choco); });

valuelines["Huila"] = d3.svg.line()
    .x(function(d) { return x(d.Date); })
    .y(function(d) { return y(d.Huila); });

valuelines["LaGuajira"] = d3.svg.line()
    .x(function(d) { return x(d.Date); })
    .y(function(d) { return y(d.LaGuajira); });

valuelines["Magdalena"] = d3.svg.line()
    .x(function(d) { return x(d.Date); })
    .y(function(d) { return y(d.Magdalena); });

valuelines["Meta"] = d3.svg.line()
    .x(function(d) { return x(d.Date); })
    .y(function(d) { return y(d.Meta); });

valuelines["Narino"] = d3.svg.line()
    .x(function(d) { return x(d.Date); })
    .y(function(d) { return y(d.Narino); });

valuelines["NorteDeSantander"] = d3.svg.line()
    .x(function(d) { return x(d.Date); })
    .y(function(d) { return y(d.NorteDeSantander); });

valuelines["Quindio"] = d3.svg.line()
    .x(function(d) { return x(d.Date); })
    .y(function(d) { return y(d.Quindio); });

valuelines["Risaralda"] = d3.svg.line()
    .x(function(d) { return x(d.Date); })
    .y(function(d) { return y(d.Risaralda); });

valuelines["Santander"] = d3.svg.line()
    .x(function(d) { return x(d.Date); })
    .y(function(d) { return y(d.Santander); });

valuelines["Sucre"] = d3.svg.line()
    .x(function(d) { return x(d.Date); })
    .y(function(d) { return y(d.Sucre); });

valuelines["Tolima"] = d3.svg.line()
    .x(function(d) { return x(d.Date); })
    .y(function(d) { return y(d.Tolima); });

valuelines["ValleDelCauca"] = d3.svg.line()
    .x(function(d) { return x(d.Date); })
    .y(function(d) { return y(d.ValleDelCauca); });

// Define the div for the tooltip
var div = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

// Adds the svg canvas
var svg = d3.select("#viz")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");
var dSelector = {};
for (var i = 0; i < departments.length; i++) {
    dSelector[departments[i]] = true;
}

var maxValue = 0;

updateData();

for (var i = 0; i < departments.length; i++) {
    document.getElementById(departments[i]).onclick = function(d) {
        var dept = d.srcElement.id;
        dSelector[dept] = !dSelector[dept];
        d3.select(("#" + dept))
            .transition()
            .duration(250)
            .style("fill", "#BBBBBB");
        updateData();
    };
}

document.getElementById("ViewAll").onclick = function(d) {
    for (var i = 0; i < departments.length; i++) {
        dSelector[departments[i]] = true;
    }
    updateData();
}

// Get the data
function updateData() {

    svg.selectAll("*").remove();
    var yMax = 0;

    d3.csv("data.csv", function(error, data) {
        data.forEach(function(d) {
            d.Date = parseDate(d.Date);
            for (var i = 0; i < departments.length; i++) {
                if (dSelector[departments[i]]) {
                    d[departments[i]] = +d[departments[i]];
                    var m = d3.max(data, function(d){ return d[departments[i]] });
                    if (m > maxValue) maxValue = m;
                    if (m > yMax) yMax = m;
                }
            }
        });

    console.log(maxValue);
    // Scale the range of the data
    x.domain(d3.extent(data, function(d) { return d.Date; }));
    y.domain([0, yMax*1.1]);

    var paths = [];

    function addLine(paths, data, line, localMax, max, id) {
        // Add the valueline path
        var deptColor = d3.interpolatePlasma(1 - localMax/max);
        paths.push(svg.append("path")
            .data([data])
            .attr("class", "line")
            .style("stroke", deptColor)
            .attr("d", line));
        d3.select(id)
            .transition()
            .duration(250)
            .style("fill", deptColor);
    }

    /*for (var i = 0; i < departments.length; i++) {
        addLine(paths, data, valuelines[departments[i]], d3.max(data, function(d) { return d[departments[i]]; }), maxValue, ("#"+departments[i]));
    }*/

    for (var i = 0; i < departments.length; i++) {
        if (dSelector[departments[i]]) {
            addLine(paths, data, valuelines[departments[i]], d3.max(data, function(d) { return d[departments[i]]; }), maxValue, ("#" + departments[i]));
        } else {
            d3.select(("#" + departments[i]))
                .transition()
                .duration(250)
                .style("fill", "#BBBBBB");
        }
    }

    // Add the X Axis
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    // Add the Y Axis
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);

    d3.selectAll('g.tick')
    .select('line')
    .style('stroke', "black");

    //First animation duration
    /*for (i = 0; i < paths.length; i++) {
        var totalLength = paths[i][0][0].getTotalLength();
        d3.select(paths[i][0][0])
            .attr("stroke-dasharray", totalLength/2 + " " + totalLength )
            .attr("stroke-dashoffset", totalLength/2)
            .transition()
                .duration(3000)
                .ease("linear")
                .attr("stroke-dashoffset", 0);
    }

    //Second animation duration
    window.setTimeout(function() {
    for (i = 0; i < paths.length; i++) {
        var totalLength = paths[i][0][0].getTotalLength();
        d3.select(paths[i][0][0])
            .attr("stroke-dasharray", totalLength + " " + totalLength)
            .attr("stroke-dashoffset", totalLength/2)
            .transition()
                .duration(3000)
                .ease("linear")
                .attr("stroke-dashoffset", 0);
    }}, 6000);*/

    var maxArea = 10000;

    function getRadiusFromArea(area) {
        return Math.sqrt(area/3.14);
    }

    function getColor(x) {
        return
    }

    // Add interactive functionality
    for (var i = 0; i < departments.length; i++) {
        if (dSelector[departments[i]]) {
            svg.selectAll("dot")
                .data(data)
            .enter().append("circle")
                .attr("r", 5)
                .attr("department", departments[i])
                .style("opacity", 0 )
                .attr("cx", function(d) { return x(d.Date); })
                .attr("cy", function(d) { return y(d[departments[i]]); })
                .on("mouseover", function(d) {
                    var dept = this.attributes.department.nodeValue;
                    console.log(this);
                    div.transition()
                        .duration(200)
                        .style("opacity", .5);
                    var cArea = maxArea*(d[dept]/maxValue);
                    var cr = getRadiusFromArea(cArea); // circle radius
                    div
                        .style("left", (d3.event.pageX - cr) + "px")
                        .style("top", (d3.event.pageY - cr) + "px")
                        .style("height", (cr*2) + "px")
                        .style("width", (cr*2) + "px")
                        .style("background", d3.interpolatePlasma(1 - (d3.max(data, function(d) { return d[dept]; })/maxValue)))
                        .style("border-radius", (cr*2) + "px");
                    })
                .on("mouseout", function(d) {
                    div.transition()
                        .duration(500)
                        .style("opacity", 0)})
                .on("click", function(d) {
                    div.transition()
                        .duration(500)
                        .style("opacity", 0);
                    for (var i = 0; i < departments.length; i++) {
                        dSelector[departments[i]] = false;
                    }
                    dSelector[this.attributes.department.nodeValue] = true;
                    updateData();
                });
        }
    }
})};
