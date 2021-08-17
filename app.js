const width = window.innerWidth/2;
const height = window.innerHeight;

const svg = d3.select('div').append('svg').attr('width', width).attr('height', height).attr('cursor', 'pointer').attr('class', 'svgG');

const mapInfo = [
    {
        "name":"South Korea",
        "lat" : "37.532600",
        "lon" : "127.024612"
    },
    {
        "name": "China",
        "lat" : "35.0000",
        "lon" : "103.0000"
    },
    {
        "name": "Wuhan",
        "lat" : "30.583332",
        "lon" : "114.283333"
    }
];

const newMapInfo = {
    "name":"South Korea",
    "lat" : "37.532600",
    "lon" : "127.024612"
};

var checkOnce = true;

d3.json("world.json")
    .then(data => {
        const worldMap = data;
        const geojson = topojson.feature(worldMap, worldMap.objects.countries);
        const center = d3.geoCentroid(geojson);
        // console.log(center);

        const korea = geojson.features.find(element => element.id === '410');

        const projection = d3.geoMercator()
            .scale(1)
            .translate([0, 0]);

        const path = d3.geoPath(projection);

        const g = svg.append('g').attr('class', 'mapg');
        const bounds = path.bounds(geojson);
        const widthScale = (bounds[1][0] - bounds[0][0]) / width; 
        const heightScale = (bounds[1][1] - bounds[0][1]) / height; 
        const scale = 1 /Math.max(widthScale, heightScale); //축척
        const xoffset = width/2 - scale * (bounds[1][0] + bounds[0][0])/2; 
        const yoffset = height/2 - scale * (bounds[1][1] + bounds[0][1])/2; 
        const offset = [xoffset, yoffset];
        projection.scale(scale).translate(offset);
        // console.log(scale, offset);

        var toggleKoreaFillColor = false;
        var toggleWuhanCircleR = false;

        g
        .selectAll('path').data(geojson.features)
        .enter().append('path')
        .attr('class', 'country')
        .attr('d', path)
        .transition()
        .duration(2000)
        .style('fill', d => {
            toggleKoreaFillColor = !toggleKoreaFillColor;
            if (d.id === '410') {
                return 'red';
            }
            else return 'transparent';
        })
        .style('stroke', d => {
            if (d.id === '410') {
                return 'red';
            }
        })
        .on('end', repeat);

        function repeat(d) {
            if (d.id === '410') {
                d3.select(this)
                .transition()
                .duration(2000)
                .style('fill', toggleKoreaFillColor ? 'transparent' : 'red')
                .style('stroke', toggleKoreaFillColor ? null : 'red')
                .on('end', repeat);
                toggleKoreaFillColor = !toggleKoreaFillColor;
            }
        }

        g.transition().style('background-color', 'blue');

        const cur_brower = browserCheck();
        const transforms = cur_brower === 'Chrome' ? '' : 'translate(' + -width*7 + ',' + -height*7 + ') scale(15)';

        const icons = svg.append('g').selectAll('svg')
            .data(mapInfo)
            .enter()  
            .append("rect")
            .attr("width", 10)
            .attr("height", 10)
            .attr('fill', 'green')
            .attr('x' ,  d => projection([d.lon, d.lat])[0])
            .attr('y' ,  d => projection([d.lon, d.lat])[1])
            .attr('opacity', 1)
            .on('click', function(d, i) {
                // 여기서 plane append 해보기
                // const testplane = div2.append('i')
                //     .attr('x', 25)
                //     .attr('y', 25)
                //     .style('color', 'white')
                //     .style('font-size', '50px')
                //     .attr('class', 'fas fa-plane')
                //     .style('transform', 'rotate(-30deg)');
                // testplane.transition()
                //     .style('color', 'yellow');

                if (checkOnce) {
                    const foreign = svg.append('foreignObject')
                        .attr('width', 50)
                        .attr('height', 50)
                        .attr('x', width/2 - 25)
                        .attr('y', height/2 - 25)
                        .attr('fill', 'red');
                    const div1 = foreign.append('xhtml:div');
                    const div2 = div1.append('div')
                        .attr('x', 25)
                        .attr('y', 25)
                        .attr('width', 50)
                        .attr('height', 50);
                    
                    const plane = div2.append('i');
                    plane.attr('x', 25)
                        .attr('y', 25)
                        .style('color', 'white')
                        .style('font-size', '20px')
                        .attr('class', 'fas fa-plane');
                    
                    foreign.transition()
                        .duration(1000)
                        .style('transform-origin', 'center')
                        .attr('transform', 'rotate(30)');
                    checkOnce = false;
                }

                var zoomLevel = 15;
                var multiplyLevel = 7;
                if (i.name === 'China') {
                    zoomLevel = 10;
                    multiplyLevel = 4.5;
                }
                // console.log(projection([i.lon, i.lat])[0]);

                // foreign.transition()
                // .duration(2000)
                // .ease(d3.easeLinear)
                // .attr('transform-origin', 'center')
                // .attr('transform', 'rotate(30)')
                // .transition()
                // .duration(0)
                // .attr('transform', 'rotate(-30)');




                g.transition()
                .duration(2000)
                .attr('transform-origin', 'center')
                .attr('transform', browserCheck() === 'Safari' ? ('translate(' + -width*multiplyLevel + ',' + -height*multiplyLevel + ') scale(' + zoomLevel + ')' + ' translate(' + (width/2-projection([i.lon, i.lat])[0]) + ',' + (height/2-projection([i.lon, i.lat])[1]) + ')') : ('scale(' + zoomLevel + ') translate(' + (width/2-projection([i.lon, i.lat])[0]) + ',' + (height/2-projection([i.lon, i.lat])[1]) + ')'));

                if (i.name === 'Wuhan') {
                    svg.append('g').selectAll('svg')
                        .data([0])
                        .enter()
                        .append('circle')
                        .attr('cx', width/2)
                        .attr('cy', height/2)
                        .attr('r', 5)
                        .attr('fill', 'orange')
                        .attr('opacity', 0)
                        .on('click', function() {
                            toggleWuhanCircleR = !toggleWuhanCircleR;
                            console.log('clicked');
                            d3.select(this)
                                .transition()
                                .duration(200)
                                .attr('opacity', 1)
                            svg.append('g').selectAll('svg')
                                .data([1])
                                .enter()
                                .append('circle')
                                .attr('cx', width/2)
                                .attr('cy', height/2)
                                .attr('r', 5)
                                .attr('fill', 'orange')
                                .attr('opacity', 0)
                                .transition()
                                .ease(d3.easeQuadIn)
                                .duration(1000)
                                .attr('opacity', 0.5)
                                .attr('r', 12)
                                .transition(500)
                                .ease(d3.easeQuadOut)
                                .attr('opacity', 0)
                                .on('end', repeatCircle);
                            // d3.select(this)
                            //     .transition()
                            //     .duration(1000)
                            //     .attr('opacity', 1);
                        });
                }

                function repeatCircle(d) {
                    // console.log('newCircle');
                    d3.select(this)
                    .attr('r', 5)
                    .transition()
                    .ease(d3.easeQuadIn)
                    .duration(1000)
                    .attr('opacity', 0.5)
                    .attr('r', 12)
                    .transition()
                    .ease(d3.easeQuadOut)
                    .duration(500)
                    .attr('opacity', 0)
                    .on('end', repeatCircle);
                    toggleWuhanCircleR = !toggleWuhanCircleR;
                }
            });
        
        g
        .transition()
        .duration(3000)
        .ease(d3.easePolyInOut)
        .attr('transform-origin', 'center')
        .attr('transform', 'scale(15) translate(' + (width/2-projection([newMapInfo.lon, newMapInfo.lat])[0]) + ',' + (height/2-projection([newMapInfo.lon, newMapInfo.lat])[1]) + ')');
        

        // g.data(newMapInfo)
        // .transition()
        // .duration(2000)
        // .attr('transform-origin', 'center')
        // .attr('transform', function(d, i) {
        //     console.log('test?');
        //     return transforms + ' translate(' + (width/2-projection([i.lon, i.lat])[0]) + ',' + (height/2-projection([i.lon, i.lat])[1]) + ')'});

        const testCenter = svg.append('g').selectAll('svg')
            .data([center])
            .enter()
            .append("rect")
            .attr("width", 10)
            .attr("height", 10)
            .attr('fill', 'blue')
            .attr('x' ,  d => width/2 - 5)
            .attr('y' ,  d => height/2 - 5)
            .on('click', function(d, i) {
                // console.log(projection([i.lon, i.lat])[0]);
                g.transition()
                .duration(2000)
                .attr('transform-origin', 'center')
                .attr('transform', 'scale(1)');
            });
            // .attr('x' ,  d => projection([d[0], d[1]])[0])
            // .attr('y' ,  d => projection([d[0], d[1]])[1]);
}); 

function browserCheck(){ 
	const agt = navigator.userAgent.toLowerCase(); 
	if (agt.indexOf("chrome") != -1) return 'Chrome'; 
	if (agt.indexOf("opera") != -1) return 'Opera'; 
	if (agt.indexOf("staroffice") != -1) return 'Star Office'; 
	if (agt.indexOf("webtv") != -1) return 'WebTV'; 
	if (agt.indexOf("beonex") != -1) return 'Beonex'; 
	if (agt.indexOf("chimera") != -1) return 'Chimera'; 
	if (agt.indexOf("netpositive") != -1) return 'NetPositive'; 
	if (agt.indexOf("phoenix") != -1) return 'Phoenix'; 
	if (agt.indexOf("firefox") != -1) return 'Firefox'; 
	if (agt.indexOf("safari") != -1) return 'Safari'; 
	if (agt.indexOf("skipstone") != -1) return 'SkipStone'; 
	if (agt.indexOf("netscape") != -1) return 'Netscape'; 
	if (agt.indexOf("mozilla/5.0") != -1) return 'Mozilla'; 
	if (agt.indexOf("msie") != -1) { 
    	let rv = -1; 
		if (navigator.appName == 'Microsoft Internet Explorer') { 
			let ua = navigator.userAgent; var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})"); 
		if (re.exec(ua) != null) 
			rv = parseFloat(RegExp.$1); 
		} 
		return 'Internet Explorer '+rv; 
	} 
}


const verticalBarGraph = d3.select('.vertical-statistics-container')
    .append('svg')
    .attr('width', width*2)
    .attr('height', height*0.9)
    .style('background-color', 'gray');

const bar = verticalBarGraph.append('rect')
    .attr('width', width/2)
    .attr('height', height/20)
    .attr('x', width - width/4)
    .attr('y', height*0.9/7)
    .attr('fill', 'blue');

var lines_g = verticalBarGraph.selectAll('g')
    .data([1, 2, 3, 4, 5, 6])
    .enter()
    .append('g');

var lines = lines_g
    .append('line')
    .attr('x1', '0')
    .attr('y1', d => d*height*0.9/7)
    .attr('x2', width*2)
    .attr('y2', d => d*height*0.9/7)
    .attr('stroke', 'white');

lines_g.append('text')
    .attr('x', 0)
    .attr('y', d => d*height*0.9/7)
    .attr('dy', '.35em')
    .text(function(d) {return d;})


const btn = verticalBarGraph
    .append('g')
    .on('click', function(d) {
        console.log('orange circle');
        bar.transition()
            .duration(1000)
            .attr('height', height*0.68);
        
        const bottomText = verticalBarGraph.append('text')
            .text('2021년 8월 2일 0시 기준 20만1002명')
            .attr('x', width)
            .attr('y', height*0.9 - 40)
            .attr('text-anchor', 'middle')
            .style('font-size', 20)
            .style('opacity', 0);
        bottomText.transition()
            .delay(1000)
            .duration(500)
            .style('opacity', 1);
    });

const btnRect = btn.append('rect')
    .attr('x', width-150)
    .attr('y', 0)
    .attr('width', 300)
    .attr('height',50)
    .attr('fill', 'orange');

btn.append('text')
    .text('확진자 수 통계')
    .attr('x', width)
    .attr('y', 35)
    .attr('text-anchor', 'middle')
    .style('font-size', 30);

const timepass = verticalBarGraph.append('g');
const timepassRect = timepass.append('rect')
    .attr('x', width*2-200)
    .attr('y', 0)
    .attr('width', 200)
    .attr('height', 50)
    .attr('fill', 'white');

timepass.append('text')
    .text(0)
    .attr('x', width*2)
    .attr('y', 35)
    .attr('text-anchor', 'end')
    .style('font-size', 25)
    .transition()
    .duration(1000)
    .tween('text', function() {
        // return d3.interpolateNumber(0, 31);
        var i = d3.interpolateRound(0, 31);
        return function(t) {
            d3.select(this).text(i(t));
        }
    });

// EXAMPLE CODE
// set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 30, left: 60},
    w = width*1.9 - margin.left - margin.right,
    h = height*0.6 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg_t = d3.select(".tooltip-statistics-container")
  .append("svg")
    .attr("width", w + margin.left + margin.right)
    .attr("height", h + margin.top + margin.bottom);

var svg_tooltip = svg_t
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

//Read the data
d3.csv("accum.csv")
  // When reading the csv, I must format variables:
  .then(
// function(d){
//     return { date : d3.timeParse("%Y-%m-%d")(d.date), value : d.value }
//   },

  // Now I can use this dataset:
  function(data) {
    // Add X axis --> it is a date format
    var x = d3.scaleTime()
      .domain(d3.extent(data, function(d) { 
        // const parseTimeFull = d3.timeParse("%m/%d/%y");
        return d3.timeParse("%m/%d/%y")(d.date); 
        // console.log(parseTimeFull(d.date));
        // return parseTimeFull(d.date);
    }))
      .range([ 0, w ]);

        svg_tooltip.append("g")
        .attr("transform", "translate(0," + h + ")")
        .call(d3.axisBottom(x).tickFormat(d3.timeFormat("%b")));

    // Add Y axis
    var test = 0;
    var y = d3.scaleLinear()
      .domain([0, d3.max(data, function(d) { 
          test += parseInt(d.number);
          return +(test.toString()); 
        })])
      .range([ h, 0 ]);
    svg_tooltip.append("g")

      .call(d3.axisLeft(y));

    // Add the line
    var cummulate_test = 0;
    svg_tooltip.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", d3.line()
        .x(function(d) { 
            // const parseTimeFull = d3.timeParse("%m/%d/%y");
            // return x(parseTimeFull(d.date));
            return x(d3.timeParse("%m/%d/%y")(d.date)) 
        })
        .y(function(d) { 
            cummulate_test += parseInt(d.number);
            return y(cummulate_test.toString()) }
        )
    );

    const tooltipLine = svg_t.append('line')
    .attr('x1', width)
    .attr('y1', 0)
    .attr('x2', width)
    .attr('y2', h)
    .style('stroke', 'gray')
    .style('stroke-width', 0.3);

    const tooltip = svg_t.append('g');
    svg_t.on('touchmove mousemove click', function(e) {
        console.log('hovered?');
        const date1 = x.invert(d3.pointer(e, this)[0]);
        const parseTime = d3.timeFormat("%_m/%_d/%Y");
        const new_date1 = parseTime(date1);
        console.log(new_date1.replace(/\s/g,''));
        const bisect = d3.bisector(function(d) {
            return d.date;
        }).left;
        const index = bisect(data, new_date1.replace(/\s/g,''));
        console.log(index);
        const a = data[index - 1];
        const b = data[index];
        console.log(a);
        console.log(b);
        const {date, number, domestic, foreign, death} = b && (date1 - a.date > b.date - date1) ? b : a;
        console.log(date, number, domestic, foreign, death);
    });

    })
    .catch( function(err) {console.log(err)});

// svg.on("touchend mouseleave", () => tooltip.call(callout, null));

// // example line chart with tooltips
// var margin = { top: 30, right: 120, bottom: 30, left: 50 },
//     w = 960 - margin.left - margin.right,
//     h = 500 - margin.top - margin.bottom,
//     tooltip = { width: 100, height: 100, x: 10, y: -30 };
// //이건 위치랑 크기 조정하는 것 같고

// var parseDate = d3.timeParse("%m/%e/%Y"),
//     bisectDate = d3.bisector(function(d) { return d.date; }).left,
//     formatValue = d3.format(","),
//     dateFormatter = d3.timeParse("%m/%d/%y");
// //이거는 아직 잘 모르겠고

// var x = d3.scaleTime()
//         .range([0, w]);
// // 시간 폭 지정하는 듯

// var y = d3.scaleLinear()
//         .range([h, 0]);
// // 이거는 그냥 세로 지정?

// var xAxis = d3.axisBottom(x)
//     .tickFormat(dateFormatter);
// // ?

// var yAxis = d3.axisLeft(y)
//     .tickFormat(d3.format("s"))
// // ?

// var line = d3.line()
//     .x(function(d) { return x(d.date); })
//     .y(function(d) { return y(d.likes); });

// var svgTooltip = d3.select(".tooltip-statistics-container").append("svg")
//     .attr("width", w + margin.left + margin.right)
//     .attr("height", h + margin.top + margin.bottom)
//     .append("g")
//     .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
// // svg 생성

// d3.tsv("data.tsv")
//     .then(function(data) {

//     data.forEach(function(d) {
//         d.date = parseDate(d.date);
//         d.likes = +d.likes;
//     });

//     data.sort(function(a, b) {
//         return a.date - b.date;
//     });

//     x.domain([data[0].date, data[data.length - 1].date]);
//     y.domain(d3.extent(data, function(d) { return d.likes; }));

//     svgTooltip.append("g")
//         .attr("class", "x axis")
//         .attr("transform", "translate(0," + h + ")")
//         .call(xAxis);

//     svgTooltip.append("g")
//         .attr("class", "y axis")
//         .call(yAxis)
//         .append("text")
//         .attr("transform", "rotate(-90)")
//         .attr("y", 6)
//         .attr("dy", ".71em")
//         .style("text-anchor", "end")
//         .text("Number of Likes");

//     svgTooltip.append("path")
//         .datum(data)
//         .attr("class", "line")
//         .attr("d", line);

//     var focus = svgTooltip.append("g")
//         .attr("class", "focus")
//         .style("display", "none");

//     focus.append("circle")
//         .attr("r", 5);

//     focus.append("rect")
//         .attr("class", "tooltip")
//         .attr("width", 100)
//         .attr("height", 50)
//         .attr("x", 10)
//         .attr("y", -22)
//         .attr("rx", 4)
//         .attr("ry", 4);

//     focus.append("text")
//         .attr("class", "tooltip-date")
//         .attr("x", 18)
//         .attr("y", -2);

//     focus.append("text")
//         .attr("x", 18)
//         .attr("y", 18)
//         .text("Likes:");

//     focus.append("text")
//         .attr("class", "tooltip-likes")
//         .attr("x", 60)
//         .attr("y", 18);

//     svgTooltip.append("rect")
//         .attr("class", "overlay")
//         .attr("width", w)
//         .attr("height", h)
//         .on("mouseover", function() { focus.style("display", null); })
//         .on("mouseout", function() { focus.style("display", "none"); })
//         .on("mousemove", mousemove);

//     function mousemove() {
//         var x0 = x.invert(d3.pointer(this)[0]),
//             i = bisectDate(data, x0, 1),
//             d0 = data[i - 1],
//             d1 = data[i],
//             d = x0 - d0.date > d1.date - x0 ? d1 : d0;
//         focus.attr("transform", "translate(" + x(d.date) + "," + y(d.likes) + ")");
//         focus.select(".tooltip-date").text(dateFormatter(d.date));
//         focus.select(".tooltip-likes").text(formatValue(d.likes));
//     }
// })
//     .catch(function(error) {
//         if (error) throw error;
//     });




// 3D GLOBE EXAMPLE CODE

//
// Configuration
//

// ms to wait after dragging before auto-rotating
var rotationDelay = 3000
// scale of the globe (not the canvas element)
var scaleFactor = 0.9
// autorotation speed
var degPerSec = 6
// start angles
var angles = { x: -20, y: 40, z: 0}
// colors
var colorWater = '#fff'
var colorLand = '#111'
var colorGraticule = '#ccc'
var colorCountry = '#a00'

var currentPercent = d3.select('#percent');


//
// Handler
//

function enter(country) {
  var country = countryList.find(function(c) {
    return parseInt(c.id, 10) === parseInt(country.id, 10)
  })
  console.log('enter, get country: ');
  console.log(country);
  current.text(country && country.name || '');
  currentPercent.text(country && country.fullyVaccinated || '');
}

function leave(country) {
  current.text('')
  currentPercent.text('');
}

//
// Variables
//

var current = d3.select('#current')
var canvas = d3.select('#globe')
var context = canvas.node().getContext('2d')
var water = {type: 'Sphere'}
var projection = d3.geoOrthographic().precision(0.1)
var graticule = d3.geoGraticule10()
var path = d3.geoPath(projection).context(context)
var v0 // Mouse position in Cartesian coordinates at start of drag gesture.
var r0 // Projection rotation as Euler angles at start.
var q0 // Projection rotation as versor at start.
var lastTime = d3.now()
var degPerMs = degPerSec / 1000
var cwidth, cheight
var land, countries
var countryList
var autorotate, now, diff, roation
var currentCountry

//
// Functions
//

function setAngles() {
  var rotation = projection.rotate()
  rotation[0] = angles.y
  rotation[1] = angles.x
  rotation[2] = angles.z
  projection.rotate(rotation)
}

function scale() {
  cwidth = document.documentElement.clientWidth
  cheight = document.documentElement.clientHeight
  canvas.attr('width', cwidth).attr('height', cheight)
  projection
    .scale((scaleFactor * Math.min(cwidth, cheight)) / 2)
    .translate([cwidth / 2, cheight / 2])
  render()
}

function startRotation(delay) {
  autorotate.restart(rotate, delay || 0)
}

function stopRotation() {
  autorotate.stop()
}

function dragstarted(e) {
  console.log('dragstarted');
  v0 = versor.cartesian(projection.invert(d3.pointer(e, this)));
  // v0 = versor.cartesian(projection.invert(d3.pointer(this)));
  r0 = projection.rotate()
  q0 = versor(r0)
  stopRotation()
}

function dragged(e) {
  console.log('dragged');
  var v1 = versor.cartesian(projection.rotate(r0).invert(d3.pointer(e, this)));
  var q1 = versor.multiply(q0, versor.delta(v0, v1))
  var r1 = versor.rotation(q1)
  projection.rotate(r1)
  render()
}

function dragended() {
  console.log('dragended');
  startRotation(rotationDelay)
}

function render() {
  context.clearRect(0, 0, cwidth, cheight)
  fill(water, colorWater)
  stroke(graticule, colorGraticule)
  fill(land, colorLand)
  if (currentCountry) {
    fill(currentCountry, colorCountry)
  }
}

function fill(obj, color) {
  context.beginPath()
  path(obj)
  context.fillStyle = color
  context.fill()
}

function stroke(obj, color) {
  context.beginPath()
  path(obj)
  context.strokeStyle = color
  context.stroke()
}

function rotate(elapsed) {
  now = d3.now()
  diff = now - lastTime
  if (diff < elapsed) {
    var rotation = projection.rotate()
    rotation[0] += diff * degPerMs
    projection.rotate(rotation)
    render()
  }
  lastTime = now
}

// function loadData(cb) {
//   d3.json('https://unpkg.com/world-atlas@1/world/110m.json', function(error, world) {
//     if (error) throw error
//     d3.tsv('https://gist.githubusercontent.com/mbostock/4090846/raw/07e73f3c2d21558489604a0bc434b3a5cf41a867/world-country-names.tsv', function(error, countries) {
//       if (error) throw error
//       cb(world, countries)
//     })
//   })
// }

function loadData(cb) {
    console.log('loadData');
    d3.json('https://unpkg.com/world-atlas@1/world/110m.json')
        .then(function(world) {
            // d3.tsv('vaccinated_full.tsv')
            d3.csv('percent_noworld.csv')
                .then(function(countries) {
                    cb(world, countries);
                })
            // d3.tsv('fullyVaccinated.tsv')
            // .then(function(countries) {
            //     cb(world, countries);
            // })
  });          
}

// https://github.com/d3/d3-polygon
function polygonContains(polygon, point) {
  var n = polygon.length
  var p = polygon[n - 1]
  var x = point[0], y = point[1]
  var x0 = p[0], y0 = p[1]
  var x1, y1
  var inside = false
  for (var i = 0; i < n; ++i) {
    p = polygon[i], x1 = p[0], y1 = p[1]
    if (((y1 > y) !== (y0 > y)) && (x < (x0 - x1) * (y - y1) / (y0 - y1) + x1)) inside = !inside
    x0 = x1, y0 = y1
  }
  return inside
}

function mousemove(e) {
  console.log('mousemove');
  var c = getCountry(e);
  console.log('!!!!!!!!!!!!!!!!!!!!!!!!!');
  console.log(c);
  console.log('!!!!!!!!!!!!!!!!!!!!!!!!!');
  if (!c) {
    if (currentCountry) {
      leave(currentCountry);
      currentCountry = undefined;
      render();
    }
    return
  }
  if (c === currentCountry) {
    return
  }
  currentCountry = c
  render()
  enter(c)
}

function getCountry(event) {
  console.log('getCountry');
  var pos = projection.invert(d3.pointer(event))
  console.log(pos);
  return countries.features.find(function(f) {
    return f.geometry.coordinates.find(function(c1) {
      return polygonContains(c1, pos) || c1.find(function(c2) {
        return polygonContains(c2, pos)
      })
    })
  })
}


//
// Initialization
//

setAngles() //set angle

canvas
  .call(d3.drag()
    .on('start', dragstarted)
    .on('drag', dragged)
    .on('end', dragended)
   )
  .on('mousemove', mousemove)

loadData(function(world, cList) {
  land = topojson.feature(world, world.objects.land)
  countries = topojson.feature(world, world.objects.countries)
  countryList = cList
  
  window.addEventListener('resize', scale)
  scale()
  autorotate = d3.timer(rotate)
})




// KOREA MAP
const ww = window.innerWidth, hh = window.innerHeight;
const svgKOR = d3.select('.korea-map')
  .append('svg')
  .attr('width', ww)
  .attr('height', hh);



// 우리나라 지도
d3.json('korea.json')
  .then(data => {
    d3.csv('korea_code_sum_diff.csv')
        .then(function(infoData) {
      const koreaMap = data;
      console.log(koreaMap);
      const geojson = topojson.feature(koreaMap, koreaMap.objects.skorea_provinces_2018_geo);
      const center = d3.geoCentroid(geojson);

      const k_projection = d3.geoMercator()
        .scale(1)
        .translate([0, 0]);
      
      const mappath = d3.geoPath(k_projection);

      const g = svgKOR.append('g').attr('class', 'koreamap');
      const bounds = mappath.bounds(geojson);
      const widthScale = (bounds[1][0] - bounds[0][0]) / ww; 
      const heightScale = (bounds[1][1] - bounds[0][1]) / hh; 
      const scale = 1 /Math.max(widthScale, heightScale); //축척
      const xoffset = ww/2 - scale * (bounds[1][0] + bounds[0][0])/2; 
      const yoffset = hh/2 - scale * (bounds[1][1] + bounds[0][1])/2; 
      const offset = [xoffset, yoffset];
      k_projection.scale(scale).translate(offset);

      const colorScale = d3.scaleLinear().domain([0, 10000, 50000, 100000])
          .range(['white', 'rgb(0, 128, 255)', 'rgb(0, 76, 255)']);

      g
        .selectAll('path')
        .data(geojson.features)
        .enter().append('path')
        .attr('class', 'province')
        .attr('id', dta => 'id' + dta.properties.code)
        .attr('d', mappath)
        .attr('fill', 'orange')   //나중에 colorScale 만들기
        .attr('stroke', 'transparent')
        .attr('fill', function(d) {
          console.log(d);
          const temp_fill = infoData.find(dta => dta.code === d.properties.code);
          console.log(parseInt(temp_fill.sum.replace(',', ''), 10));
          console.log(colorScale(parseInt(temp_fill.sum.replace(',', ''), 10)));
          return colorScale(parseInt(temp_fill.sum.replace(',', ''), 10));
        })
        .on('mouseover', mouseOver)
        .on('mouseleave', mouseLeave);

      const seoul = d3.select('.korea-map').select('svg').select('g').select('#id11').attr('fill', 'blue');
      console.log('================');
      console.log(seoul.node().parentNode);
      console.log('================');
      seoul.node().parentNode.appendChild(seoul.node());

      var currentText = svgKOR.append('text')
        .text('test')
        .attr('x', 100)
        .attr('y', 40)
        .attr('fill', 'white')
        .attr('text-anchor', 'left')
        .style('font-size', 20);

      var sumText = svgKOR.append('text')
        .attr('x', 100)
        .attr('y', 80)
        .attr('fill', 'white')
        .attr('text-anchor', 'left')
        .style('font-size', 15);
      
      var diffText = svgKOR.append('text')
        .attr('x', 100)
        .attr('y', 120)
        .attr('fill', 'white')
        .attr('text-anchor', 'left')
        .style('color', 'gray')
        .style('font-size', 12);

      function mouseOver(d, i) {
        this.parentNode.appendChild(this);//the path group is on the top with in its parent group
        d3.select(this).style('stroke', 'black');
        // currentText.text(i.properties.name);

        const temp_text = infoData.find(d => d.code === i.properties.code);
        currentText.text(temp_text.area);
        console.log(temp_text);
        console.log(temp_text.sum)
        console.log(temp_text.diff)
        sumText.text(temp_text.sum);
        diffText.text(temp_text.diff);
      }

      function mouseLeave(d) {
        d3.select(this)
          .style("stroke", "transparent");
        currentText.text('');
        sumText.text('');
        diffText.text('');
      }
    });
});

const screenHeight = window.innerHeight;
window.addEventListener('wheel', function(e) {

  if (window.scrollY < screenHeight*7) {
    
  }

  console.log(window.scrollY);
  // if (window.scrollY < screenHeight) {
  //   console.log('TITLE');
  // }

  // if (window.scrollY > screenHeight && window.scrollY < screenHeight*2) {
  //   console.log('DATE');
  // }

  // if (window.scrollY > screenHeight*2 && window.scrollY < screenHeight*3) {
  //   console.log('STORY 1');
  // }

  // if (window.scrollY > screenHeight*3 && window.scrollY < screenHeight*4) {
  //   console.log('STORY 2');
  // }

  // if (window.scrollY > screenHeight*4 && window.scrollY < screenHeight*5) {
  //   console.log('STORY 3');
  // }

  // if (window.scrollY > screenHeight*5 && window.scrollY < screenHeight*6) {
  //   console.log('STORY 4');
  // }

  // if (window.scrollY > screenHeight*6 && window.scrollY < screenHeight*7) {
  //   console.log('STORY 5');
  // }

  if (window.scrollY > screenHeight*7 && window.scrollY < screenHeight*9) {
    console.log('VIDEO');
  }

  if (window.scrollY > screenHeight*9 && window.scrollY < screenHeight*10) {
    console.log('TEXT 1');
  }

  if (window.scrollY > screenHeight*10 && window.scrollY < screenHeight*11) {
    console.log('TEXT 2');
  }

  if (window.scrollY > screenHeight*11 && window.scrollY < screenHeight*12) {
    console.log('VERTICAL CHART');
  }

  if (window.scrollY > screenHeight*12 && window.scrollY < screenHeight*13) {
    console.log('LINE CHART');
  }

  if (window.scrollY > screenHeight*13 && window.scrollY < screenHeight*14) {
    console.log('TEXT V');
  }

  if (window.scrollY > screenHeight*14 && window.scrollY < screenHeight*15) {
    console.log('3D MAP');
  }

  if (window.scrollY > screenHeight*15 && window.scrollY < screenHeight*16) {
    console.log('HOVER CHART');
  }

  if (window.scrollY > screenHeight*16 && window.scrollY < screenHeight*17) {
    console.log('2D MAP');
  }

  if (window.scrollY === screenHeight*17) {
    console.log('LAST');
  }
});