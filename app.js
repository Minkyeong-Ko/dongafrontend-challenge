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

// d3.json("world.json")
//     .then(data => {
//         const worldMap = data;
//         const geojson = topojson.feature(worldMap, worldMap.objects.countries);
//         const center = d3.geoCentroid(geojson);
//         // console.log(center);

//         const korea = geojson.features.find(element => element.id === '410');

//         const projection = d3.geoMercator()
//             .scale(1)
//             .translate([0, 0]);

//         const path = d3.geoPath(projection);

//         const g = svg.append('g').attr('class', 'mapg');
//         const bounds = path.bounds(geojson);
//         const widthScale = (bounds[1][0] - bounds[0][0]) / width; 
//         const heightScale = (bounds[1][1] - bounds[0][1]) / height; 
//         const scale = 1 /Math.max(widthScale, heightScale); //축척
//         const xoffset = width/2 - scale * (bounds[1][0] + bounds[0][0])/2; 
//         const yoffset = height/2 - scale * (bounds[1][1] + bounds[0][1])/2; 
//         const offset = [xoffset, yoffset];
//         projection.scale(scale).translate(offset);
//         // console.log(scale, offset);

//         var toggleKoreaFillColor = false;
//         var toggleWuhanCircleR = false;

//         g
//         .selectAll('path').data(geojson.features)
//         .enter().append('path')
//         .attr('class', 'country')
//         .attr('d', path)
//         .transition()
//         .duration(2000)
//         .style('fill', d => {
//             toggleKoreaFillColor = !toggleKoreaFillColor;
//             if (d.id === '410') {
//                 return 'red';
//             }
//             else return 'transparent';
//         })
//         .style('stroke', d => {
//             if (d.id === '410') {
//                 return 'red';
//             }
//         })
//         .on('end', repeat);

//         function repeat(d) {
//             if (d.id === '410') {
//                 d3.select(this)
//                 .transition()
//                 .duration(2000)
//                 .style('fill', toggleKoreaFillColor ? 'transparent' : 'red')
//                 .style('stroke', toggleKoreaFillColor ? null : 'red')
//                 .on('end', repeat);
//                 toggleKoreaFillColor = !toggleKoreaFillColor;
//             }
//         }

//         g.transition().style('background-color', 'blue');

//         const cur_brower = browserCheck();
//         const transforms = cur_brower === 'Chrome' ? '' : 'translate(' + -width*7 + ',' + -height*7 + ') scale(15)';

//         const icons = svg.append('g').selectAll('svg')
//             .data(mapInfo)
//             .enter()  
//             .append("rect")
//             .attr("width", 10)
//             .attr("height", 10)
//             .attr('fill', 'green')
//             .attr('x' ,  d => projection([d.lon, d.lat])[0])
//             .attr('y' ,  d => projection([d.lon, d.lat])[1])
//             .attr('opacity', 1)
//             .on('click', function(d, i) {
//                 // 여기서 plane append 해보기
//                 // const testplane = div2.append('i')
//                 //     .attr('x', 25)
//                 //     .attr('y', 25)
//                 //     .style('color', 'white')
//                 //     .style('font-size', '50px')
//                 //     .attr('class', 'fas fa-plane')
//                 //     .style('transform', 'rotate(-30deg)');
//                 // testplane.transition()
//                 //     .style('color', 'yellow');

//                 if (checkOnce) {
//                     const foreign = svg.append('foreignObject')
//                         .attr('width', 50)
//                         .attr('height', 50)
//                         .attr('x', width/2 - 25)
//                         .attr('y', height/2 - 25)
//                         .attr('fill', 'red');
//                     const div1 = foreign.append('xhtml:div');
//                     const div2 = div1.append('div')
//                         .attr('x', 25)
//                         .attr('y', 25)
//                         .attr('width', 50)
//                         .attr('height', 50);
                    
//                     const plane = div2.append('i');
//                     plane.attr('x', 25)
//                         .attr('y', 25)
//                         .style('color', 'white')
//                         .style('font-size', '20px')
//                         .attr('class', 'fas fa-plane');
                    
//                     foreign.transition()
//                         .duration(1000)
//                         .style('transform-origin', 'center')
//                         .attr('transform', 'rotate(30)');
//                     checkOnce = false;
//                 }

//                 var zoomLevel = 15;
//                 var multiplyLevel = 7;
//                 if (i.name === 'China') {
//                     zoomLevel = 10;
//                     multiplyLevel = 4.5;
//                 }
//                 // console.log(projection([i.lon, i.lat])[0]);

//                 // foreign.transition()
//                 // .duration(2000)
//                 // .ease(d3.easeLinear)
//                 // .attr('transform-origin', 'center')
//                 // .attr('transform', 'rotate(30)')
//                 // .transition()
//                 // .duration(0)
//                 // .attr('transform', 'rotate(-30)');




//                 g.transition()
//                 .duration(2000)
//                 .attr('transform-origin', 'center')
//                 .attr('transform', browserCheck() === 'Safari' ? ('translate(' + -width*multiplyLevel + ',' + -height*multiplyLevel + ') scale(' + zoomLevel + ')' + ' translate(' + (width/2-projection([i.lon, i.lat])[0]) + ',' + (height/2-projection([i.lon, i.lat])[1]) + ')') : ('scale(' + zoomLevel + ') translate(' + (width/2-projection([i.lon, i.lat])[0]) + ',' + (height/2-projection([i.lon, i.lat])[1]) + ')'));

//                 if (i.name === 'Wuhan') {
//                     svg.append('g').selectAll('svg')
//                         .data([0])
//                         .enter()
//                         .append('circle')
//                         .attr('cx', width/2)
//                         .attr('cy', height/2)
//                         .attr('r', 5)
//                         .attr('fill', 'orange')
//                         .attr('opacity', 0)
//                         .on('click', function() {
//                             toggleWuhanCircleR = !toggleWuhanCircleR;
//                             console.log('clicked');
//                             d3.select(this)
//                                 .transition()
//                                 .duration(200)
//                                 .attr('opacity', 1)
//                             svg.append('g').selectAll('svg')
//                                 .data([1])
//                                 .enter()
//                                 .append('circle')
//                                 .attr('cx', width/2)
//                                 .attr('cy', height/2)
//                                 .attr('r', 5)
//                                 .attr('fill', 'orange')
//                                 .attr('opacity', 0)
//                                 .transition()
//                                 .ease(d3.easeQuadIn)
//                                 .duration(1000)
//                                 .attr('opacity', 0.5)
//                                 .attr('r', 12)
//                                 .transition(500)
//                                 .ease(d3.easeQuadOut)
//                                 .attr('opacity', 0)
//                                 .on('end', repeatCircle);
//                             // d3.select(this)
//                             //     .transition()
//                             //     .duration(1000)
//                             //     .attr('opacity', 1);
//                         });
//                 }

//                 function repeatCircle(d) {
//                     // console.log('newCircle');
//                     d3.select(this)
//                     .attr('r', 5)
//                     .transition()
//                     .ease(d3.easeQuadIn)
//                     .duration(1000)
//                     .attr('opacity', 0.5)
//                     .attr('r', 12)
//                     .transition()
//                     .ease(d3.easeQuadOut)
//                     .duration(500)
//                     .attr('opacity', 0)
//                     .on('end', repeatCircle);
//                     toggleWuhanCircleR = !toggleWuhanCircleR;
//                 }
//             });
        
//         g
//         .transition()
//         .duration(3000)
//         .ease(d3.easePolyInOut)
//         .attr('transform-origin', 'center')
//         .attr('transform', 'scale(15) translate(' + (width/2-projection([newMapInfo.lon, newMapInfo.lat])[0]) + ',' + (height/2-projection([newMapInfo.lon, newMapInfo.lat])[1]) + ')');
        

//         // g.data(newMapInfo)
//         // .transition()
//         // .duration(2000)
//         // .attr('transform-origin', 'center')
//         // .attr('transform', function(d, i) {
//         //     console.log('test?');
//         //     return transforms + ' translate(' + (width/2-projection([i.lon, i.lat])[0]) + ',' + (height/2-projection([i.lon, i.lat])[1]) + ')'});

//         const testCenter = svg.append('g').selectAll('svg')
//             .data([center])
//             .enter()
//             .append("rect")
//             .attr("width", 10)
//             .attr("height", 10)
//             .attr('fill', 'blue')
//             .attr('x' ,  d => width/2 - 5)
//             .attr('y' ,  d => height/2 - 5)
//             .on('click', function(d, i) {
//                 // console.log(projection([i.lon, i.lat])[0]);
//                 g.transition()
//                 .duration(2000)
//                 .attr('transform-origin', 'center')
//                 .attr('transform', 'scale(1)');
//             });
//             // .attr('x' ,  d => projection([d[0], d[1]])[0])
//             // .attr('y' ,  d => projection([d[0], d[1]])[1]);
// }); 

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
    .attr('height', height);

var lines_g = verticalBarGraph.selectAll('g')
    .data([0, 1, 5, 10, 15, 20])
    .enter()
    .append('g');

var lines = lines_g
    .append('line')
    .attr('x1', 200)
    .attr('y1', d => 200 + d*(height-400)/20)
    .attr('x2', width*2 - 100)
    .attr('y2', d => 200 + d*(height-400)/20)
    .attr('stroke', '#666873');

lines_g.append('text')
    .attr('x', 100)
    .attr('y', d => 200 + d*(height-400)/20)
    .attr('dy', '.35em')
    .attr('fill', '#666873')
    .text(function(d) {return d + '만 명';})

const bar = verticalBarGraph.append('rect')
  .attr('width', width/2)
  .attr('height', 5)
  .attr('x', width - width/4)
  .attr('y', 200)
  .attr('fill', 'rgba(255, 0, 0, 0.801)');



const bottomText = verticalBarGraph.append('text')
            .text('2021년 8월 2일 0시 기준 20만1002명')
            .attr('x', width)
            .attr('y', 200 + (height-400)/20 * 20.1002 + 40)
            .attr('text-anchor', 'middle')
            .style('font-size', '1rem')
            .style('opacity', 0)
            .attr('fill', '#666873');
var toggleBtn = false;
const btn = verticalBarGraph
    .append('g')
    .on('click', function(d) {
        console.log('orange circle');
        if (!toggleBtn) {
          bar.transition()
            .duration(1000)
            .attr('height', (height-400)/20 * 20.5);
          bottomText.transition()
            .delay(1000)
            .duration(500)
            .style('opacity', 1);
        }

        else {
          bar.transition()
            .duration(1000)
            .attr('height', 1);
          bottomText.transition()
            .duration(500)
            .style('opacity', 0);
        }
        
        toggleBtn = !toggleBtn;
    });

const btnRect = btn.append('rect')
    .attr('x', width-100)
    .attr('y', 50)
    .attr('width', 200)
    .attr('height',50)
    .attr('fill', 'transparent')
    .attr('stroke', 'white')
    .attr('rx', 25)
    .attr('ry', 25)
    .attr('stroke-width', 1)
    .style('cursor', 'pointer');

const btnT = btn.append('text')
    .text('확진자 수 통계')
    .attr('x', width)
    .attr('y', 85)
    .attr('text-anchor', 'middle')
    .style('font-size', 20)
    .style('fill', 'white')
    .style('cursor', 'pointer');

btnRect.on('mouseover', function() {
  btnRect
  .transition()
  .duration(200)
  .attr('stroke-width', 5)
  .attr('stroke', 'rgba(255, 0, 0, 0.801)');
})
  .on('mouseleave', function() {
    btnRect
    .transition()
    .duration(200)
    .attr('stroke-width', 1)
    .attr('stroke', 'white');
  })

  btnT.on('mouseover', function() {
    btnRect
    .transition()
    .duration(200)
    .attr('stroke-width', 5)
    .attr('stroke', 'rgba(255, 0, 0, 0.801)');
  })
    .on('mouseleave', function() {
      btnRect
      .transition()
      .duration(200)
      .attr('stroke-width', 1)
      .attr('stroke', 'white');
    })

const timepass = verticalBarGraph.append('g');
const timepassRect = timepass.append('rect')
    .attr('x', width*2-200)
    .attr('y', 50)
    .attr('width', 300)
    .attr('height', 50);

timepass.append('text')
    .text(0)
    .attr('x', width*2 - 100)
    .attr('y', 85)
    .attr('text-anchor', 'end')
    .style('font-size', 15)
    .style('fill', 'white')
    .text('2020년 1월 20일 ~ 2021년 8월 2일');
    // .transition()
    // .duration(5000)
    // .tween('text', function() {
    //     // return d3.interpolateNumber(0, 31);
    //     var dates = [31, 30, 28, 29];
    //     var year = d3.interpolateRound(2020, 2021);
    //     return function(t) {
    //         d3.select(this).text(year(t) + '년');
    //     }
    // });

const monthText = timepass.append('text')
  .text(0)
  .attr('x', width*2 - 50)
  .attr('y', 35)
  .attr('text-anchor', 'end')
  .style('font-size', 15);

monthText.call(tweenMonth);

function tweenMonth() {
  monthText
    .transition()
    .duration(3000)
    .tween('text', function() {
        // return d3.interpolateNumber(0, 31);
        var dates = [31, 30, 28, 29];
        var month = d3.interpolateRound(1, 12);
        return function(t) {
            d3.select(this).text(month(t) + '월');
        }
    })
    .on('end', function() {
      tweenMonth();
    });
}

// const dayText = timepass.append('text')
//     .text(0)
//     .attr('x', width*2)
//     .attr('y', 35)
//     .attr('text-anchor', 'end')
//     .style('font-size', 15);

// dayText.call(tweenDate);

// function tweenDate(sm, sd, em, ed, du) {
//   var duration = du;
//   dayText
//   .transition()
//   .duration(1000)
//   .ease(d3.easeLinear)
//   .tween('text', function() {
//     var i = d3.interpolateRound(1, 31);
//     return function(t) {
//         d3.select(this).text(i(t) + '일');
//     }
//   })
//   .on('end', function() {
//     tweenDate();
//   });
// }

// var datesPerMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
// var duration;
// //  2020.1.20 ~ 2020.4.3
// duration = calcDuration(1, 20, 4, 3, duration);
// dayText.call(tweenDate(1, 20, 4, 3));
// monthText.call(tweenMonth(1, 20, 4, 3));

// function calcDuration(sm, sd, em, ed) {
//   return (em-sm-1)*1000 + (datesPerMonth[sm-1] - sd)/datesPerMonth[sm-1] + ed/datesPerMonth[em-1];
// }






// EXAMPLE CODE
// set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 30, left: 60},
    w = width*1.5 - margin.left - margin.right,
    h = height*0.5 - margin.top - margin.bottom;

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
      .attr("stroke", "rgba(255, 0, 0, 0.801")
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
    .style('stroke', 'transparent')
    .style('stroke-width', 0.3);

    const tooltip = svg_t.append('g');
    // svg_t.on('touchmove mousemove click', function(e) {
    //     console.log('hovered?');
    //     const date1 = x.invert(d3.pointer(e, this)[0]);
    //     const parseTime = d3.timeFormat("%_m/%_d/%Y");
    //     const new_date1 = parseTime(date1);
    //     console.log(new_date1.replace(/\s/g,''));
    //     const bisect = d3.bisector(function(d) {
    //         return d.date;
    //     }).left;
    //     const index = bisect(data, new_date1.replace(/\s/g,''));
    //     console.log(index);
    //     const a = data[index - 1];
    //     const b = data[index];
    //     console.log(a);
    //     console.log(b);
    //     const {date, number, domestic, foreign, death} = b && (date1 - a.date > b.date - date1) ? b : a;
    //     console.log(date, number, domestic, foreign, death);
    // });

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
var scaleFactor = 0.65
// autorotation speed
var degPerSec = 6
// start angles
var angles = { x: -20, y: 40, z: 0}
// colors
var colorWater = 'black'
var colorLand = 'white'
var colorGraticule = 'darkgray'
var colorCountry = 'rgb(0, 193, 0)'

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
  current.transition()
    .duration(50)
    .attr('opacity', 0)
    .transition()
    .duration(50)
    .text(country && country.name || '')
    .attr('opacity', 1);
  currentPercent
    .transition()
    .duration(50)
    .attr('opacity', 0)
    .transition()
    .duration(50)
    .text(country && country.fullyVaccinated || '')
    .attr('opacity', 1);
}

function leave(country) {
  current.transition()
  .duration(500).text('')
  currentPercent.transition()
  .duration(500).text('');
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

setAngles()

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
const ww = window.innerWidth/2, hh = window.innerHeight;
const svgKOR = d3.select('.korea-map')
  .append('svg')
  .attr('width', ww)
  .attr('height', hh)
  .style('position', 'absolute')
  .style('right', 0);



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
      .range(['white', 'rgb(255, 100, 100)', 'rgb(255, 50, 50)']);
          // .range(['white', 'rgb(0, 128, 255)', 'rgb(0, 76, 255)']);

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

      const seoul = d3.select('.korea-map').select('svg').select('g').select('#id11').attr('fill', 'red');
      console.log('================');
      console.log(seoul.node().parentNode);
      console.log('================');
      seoul.node().parentNode.appendChild(seoul.node());

      var currentText = d3.select('.korea-map').append('text')
        .text('')
        .attr('x', 100)
        .attr('y', 40)
        .attr('fill', 'white')
        .attr('text-anchor', 'left')
        .style('font-size', 20)
        .style('color', 'white')
        .style('font-weight', 'bold')
        .attr('class', 'kmapText1');

      var sumText = d3.select('.korea-map').append('text')
        .attr('x', 100)
        .attr('y', 80)
        .attr('fill', 'white')
        .attr('text-anchor', 'left')
        .style('font-size', 15)
        .style('color', 'rgba(255, 0, 0, 0.801)')
        .style('font-weight', 'bold')
        .attr('class', 'kmapText2');
      
      var diffText = d3.select('.korea-map').append('text')
        .attr('x', 100)
        .attr('y', 120)
        .attr('fill', 'white')
        .attr('text-anchor', 'left')
        .style('color', '#BEBDBF')
        .style('font-size', 12)
        .attr('class', 'kmapText3');

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
        diffText.text('+' + temp_text.diff);
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
var okayToProceed1 = true;
var okayToProceed1_1 =true;
var okayToProceed2 = true;
var okayToProceed3 = true;
var okayToProceed4 = true;
var okayToProceed5 = true;
var okayToProceed6 = true;

var okayToProceedFO = true;

var okayToProceedLast = true;
var okayToProceedHover = true;


var toggleWuhanCircleR = false;
var circleOnce = false;
var circle1, circle2;

var repeatOn = true;

var foreign, div1, div2, plane;

var feverCon = document.querySelector('.fever');
var redText2 = document.querySelector('.red-text2');
var underline2 = document.createElement('div');
underline2.setAttribute('id', 'underline2');
// underline.style.width = redText.getClientRects()[0].width + 'px';
underline2.style.top = window.scrollY + redText2.getClientRects()[0].y + redText2.getClientRects()[0].height - 5 + 'px';
underline2.style.left = redText2.getClientRects()[0].x + 'px';
feverCon.appendChild(underline2);

const storyCons = document.getElementsByClassName('story-container');

window.addEventListener('wheel', function(e) {
  
  console.log(window.scrollY);
    // 한국만 확대
    if (window.scrollY > 0 && window.scrollY < screenHeight) {
      document.querySelector('#iconArrow').style.opacity = 0;
      
      // gWRLD.transition()
      //   .duration(2000)
      //   .attr('transform-origin', 'center')
      //   .attr('transform', browserCheck() === 'Safari' ? ('translate(' + -width*7 + ',' + -height*7 + ') scale(' + 15 + ')' + ' translate(' + (width/2-projection([newMapInfo.lon, newMapInfo.lat])[0]) + ',' + (height/2-projection([newMapInfo.lon, newMapInfo.lat])[1]) + ')') : ('scale(' + 15 + ') translate(' + (width/2-projection([newMapInfo.lon, newMapInfo.lat])[0]) + ',' + (height/2-projection([newMapInfo.lon, newMapInfo.lat])[1]) + ')'));
    }

    // if (window.scrollY > screenHeight && window.scrollY < screenHeight + screenHeight/2) {
    //   document.querySelector('.firstCenterText').style.animation = 'unshow-text 0.5s ease-in-out forwards';
    // }

    if (window.scrollY > screenHeight + screenHeight/2 && window.scrollY < screenHeight*2 && e.deltaY > 0) {
      document.querySelector('.firstCenterText').style.animation = 'show-text 0.5s ease-in-out forwards';

      if (okayToProceed1) {
        okayToProceed1 = false;
        console.log('turn gray');
        repeatOn = false;
        gWRLD.selectAll('path')
          .transition()
          .duration(1000)
          .style('stroke', '#66687375');
          // .style('fill', '#666873');
        d3.select('#korea')
          .transition()
          .delay(500)
          .duration(1000)
          .style('fill', 'transparent')
          .style('stroke', '#66687375')
          // .on('end', () => okayToProceed = true);

        console.log('to China')
        gWRLD.transition()
          .duration(1000)
          .attr('transform-origin', 'center')
          .attr('transform', browserCheck() === 'Safari' ? ('translate(' + -width*3.5 + ',' + -height*3.5 + ') scale(' + 8 + ')' + ' translate(' + (width/2-projectionWRLD([mapInfo[1].lon, mapInfo[0].lat])[0]) + ',' + (height/2-projectionWRLD([mapInfo[1].lon, mapInfo[1].lat])[1]) + ')') : 'scale(8)  translate(' + (width/2-projectionWRLD([mapInfo[1].lon, mapInfo[1].lat])[0]) + ',' + (height/2-projectionWRLD([mapInfo[1].lon, mapInfo[1].lat])[1]) + ')');
      }
    }

    if (window.scrollY > screenHeight*2 + 300 && window.scrollY < screenHeight*3 && e.deltaY > 0) {
      document.querySelector('.firstCenterText').style.animation = 'unshow-text 0.3s ease-in-out forwards';
    }

    if (window.scrollY > screenHeight*2 && window.scrollY < screenHeight*3) {

      
    } 

    // if (window.scrollY > screenHeight + 200) {
    //   document.querySelector('.firstCenterText').style.animation = 'unshow-text 0.5s ease-in-out forwards';
    // }

    
    if (window.scrollY > screenHeight*3 - 300 && window.scrollY < screenHeight*4 && e.deltaY > 0) {
      console.log('zoom wu');
      if (okayToProceed2) {
        okayToProceed2 = false;
        //1
        storyCons[0].lastChild.animate([
          {width: '0px'},
          {width: storyCons[0].children[0].children[0].getClientRects()[0].width + 'px'}
        ], {
          // delay: 500,
          duration: 500,
          easing: 'ease-in-out',
          fill: 'forwards',
          // interations: Infinity
        });

      // this.setTimeout(() => okayToProceed = true, 2000)

      d3.select('#china')
        .transition()
        .style('stroke', '#6D7BA6');

        console.log('wuhan circle');
      gWRLD.transition()
        .duration(1000)
        .attr('transform-origin', 'center')
        .attr('transform', browserCheck() === 'Safari' ? ('translate(' + -width*4.5 + ',' + -height*4.5 + ') scale(' + 10 + ')' + ' translate(' + (width/2-projectionWRLD([mapInfo[2].lon, mapInfo[2].lat])[0]) + ',' + (height/2-projectionWRLD([mapInfo[2].lon, mapInfo[2].lat])[1]) + ')') : 'scale(10)  translate(' + (width/2-projectionWRLD([mapInfo[2].lon, mapInfo[2].lat])[0]) + ',' + (height/2-projectionWRLD([mapInfo[2].lon, mapInfo[2].lat])[1]) + ')');

      if (!circleOnce) {
        circleOnce = true;

        circle1 = svg.append('g').selectAll('svg')
        .data([0])
        .enter()
        .append('circle')
        .attr('cx', width/2)
        .attr('cy', height/2)
        .attr('r', 10)
        .attr('fill', 'white')
        .attr('opacity', 0);

        circle1
        .transition()
        .delay(1000)
        .duration(1000)
        .attr('opacity', 0.5);

        circle2 = svg.append('g').selectAll('svg')
        .data([1])
        .enter()
        .append('circle')
        .attr('cx', width/2)
        .attr('cy', height/2)
        .attr('r', 10)
        .attr('fill', 'white')
        .attr('opacity', 0);

        circle2
        .transition()
        .delay(1000)
        .ease(d3.easeQuadIn)
        .duration(1000)
        .attr('opacity', 0.5)
        .attr('r', 20)
        .transition()
        .duration(800)
        .ease(d3.easeQuadOut)
        .attr('opacity', 0)
        .on('end', repeatCircle);
        
        function repeatCircle(d) {
          toggleWuhanCircleR = !toggleWuhanCircleR;
          d3.select(this)
            .attr('r', 10)
            .transition()
            .ease(d3.easeQuadIn)
            .duration(800)
            .attr('opacity', 0.5)
            .attr('r', 20)
            .transition()
            .ease(d3.easeQuadOut)
            .duration(500)
            .attr('opacity', 0)
            .on('end', repeatCircle);
            toggleWuhanCircleR = !toggleWuhanCircleR;
        }
      }
      }
    } 
    
    if (window.scrollY > screenHeight*4 - 300 && window.scrollY < screenHeight*5 && e.deltaY > 0) {
      if (okayToProceed3) {
        okayToProceed3 = false;
        //2
      storyCons[1].lastChild.animate([
        {width: '0px'},
        {width: storyCons[1].children[0].children[0].getClientRects()[0].width + 'px'}
      ], {
        // delay: 500,
        duration: 500,
        easing: 'ease-in-out',
        fill: 'forwards',
        // interations: Infinity
      });


      console.log('plane');
      foreign = svg.append('foreignObject')
        .attr('width', 50)
        .attr('height', 50)
        .attr('x', width/2 - 25)
        .attr('y', height/2 - 25)
        .attr('opacity', 0);

      div1 = foreign.append('xhtml:div');
      div2 = div1.append('div')
          .attr('x', 25)
          .attr('y', 25)
          .attr('width', 50)
          .attr('height', 50);
      
      plane = div2.append('i');
      plane.attr('x', 25)
          .attr('y', 25)
          .style('color', 'white')
          .style('font-size', '20px')
          .attr('class', 'fas fa-plane');

      foreign.transition()
        .duration(500)
        .attr('opacity', 1);

      d3.select('#china')
        .transition()
        .style('stroke', '#66687375');
          
      console.log('fly');
      gWRLD.transition()
      .duration(2000)
      .attr('transform-origin', 'center')
      .attr('transform', browserCheck() === 'Safari' ? ('translate(' + -width*4.5 + ',' + -height*4.5 + ') scale(' + 10 + ')' + ' translate(' + (width/2-projectionWRLD([newMapInfo.lon, newMapInfo.lat])[0]) + ',' + (height/2-projectionWRLD([newMapInfo.lon, newMapInfo.lat])[1]) + ')') : ('scale(' + 10 + ') translate(' + (width/2-projectionWRLD([newMapInfo.lon, newMapInfo.lat])[0]) + ',' + (height/2-projectionWRLD([newMapInfo.lon, newMapInfo.lat])[1]) + ')'))

      d3.select('#korea')
          .transition()
          .style('stroke', '#6D7BA6')
      // .on('end', () => okayToProceed = true);
      }
    }

    if (window.scrollY > screenHeight*5 - 300 && window.scrollY < screenHeight*6 && e.deltaY > 0) {
      if (okayToProceed4) {
        okayToProceed4 = false;

        underline2.animate([
          {width: '0px'},
          {width: redText2.getClientRects()[0].width + 'px'}
        ], {
          delay: 500,
          duration: 500,
          easing: 'ease-in-out',
          fill: 'forwards',
          // interations: Infinity
        });

        //3
        storyCons[2].lastChild.animate([
          {width: '0px'},
          {width: storyCons[2].children[0].children[0].getClientRects()[0].width + 'px'}
        ], {
          // delay: 500,
          duration: 500,
          easing: 'ease-in-out',
          fill: 'forwards',
          // interations: Infinity
        });
    

        foreign.transition()
          .duration(500)
          .attr('opacity', 0)

        d3.select('#korea')
          .transition()
          .style('stroke', 'red')
          // .on('end', () => okayToProceed = true);
      }
    }

    if (window.scrollY > screenHeight*6 - 300 && window.scrollY < screenHeight*7 && e.deltaY > 0) {
      if (okayToProceed5) {
        okayToProceed5 = false;
        //4
        storyCons[3].lastChild.animate([
          {width: '0px'},
          {width: storyCons[3].children[0].children[0].getClientRects()[0].width + 'px'}
        ], {
          // delay: 500,
          duration: 500,
          easing: 'ease-in-out',
          fill: 'forwards',
          // interations: Infinity
        });

        
          // .on('end', () => okayToProceed = true);
      }
    }

    if (window.scrollY > screenHeight*7 - 300 && window.scrollY < screenHeight*8 && e.deltaY > 0) {
      if (okayToProceed6) {
        okayToProceed6 = false;
        //5
      storyCons[4].lastChild.animate([
        {width: '0px'},
        {width: storyCons[4].children[0].children[0].getClientRects()[0].width + 'px'}
      ], {
        // delay: 500,
        duration: 500,
        easing: 'ease-in-out',
        fill: 'forwards',
        // interations: Infinity
      });

      // this.setTimeout(() => okayToProceed = false, 1000);

      console.log('corona - red');
      circle1
        .transition()
        .ease(d3.easeQuadIn)
        .duration(1000)
        .attr('fill', 'red')
        .attr('r', 20);

      circle2
        .transition()
        .ease(d3.easeQuadIn)
        .duration(1000)
        .attr('opacity', 0.5)
        .attr('r', 100)
        .attr('fill', 'red')
        .transition()
        .duration(800)
        .ease(d3.easeQuadOut)
        .attr('opacity', 0)
        .on('end', repeatCircleBigger);

        function repeatCircleBigger() {
          toggleWuhanCircleR = !toggleWuhanCircleR;
          d3.select(this)
            .attr('r', 20)
            .transition()
            .ease(d3.easeQuadIn)
            .duration(800)
            .attr('opacity', 0.5)
            .attr('r', 100)
            .transition()
            .ease(d3.easeQuadOut)
            .duration(500)
            .attr('opacity', 0)
            .on('end', repeatCircleBigger);
            toggleWuhanCircleR = !toggleWuhanCircleR;
        }
      }
    }

  if (window.scrollY > screenHeight*7 + 300 && e.deltaY > 0) {
    if (okayToProceedFO) {
      okayToProceedFO = false;
      svg.transition().duration(1000).style('opacity', 0);
    }
  }
  if (window.scrollY > screenHeight*8 && window.scrollY < screenHeight*10 && e.deltaY > 0) {
    console.log('VIDEO');
  }

  if (window.scrollY > screenHeight*10 + screenHeight/2 && window.scrollY < screenHeight*11) {
    console.log('TEXT 1');
    document.querySelector('.secondCenterText').style.animation = 'show-text 0.5s ease-in-out forwards';
  }

  if (window.scrollY > screenHeight*11 + 300 && window.scrollY < screenHeight*12 && e.deltaY > 0) {
    document.querySelector('.secondCenterText').style.animation = 'unshow-text 0.3s ease-in-out forwards';
  }

  if (window.scrollY > screenHeight*12 + screenHeight/2 && window.scrollY < screenHeight*13) {
    document.querySelector('.thirdCenterText').style.animation = 'show-text 0.5s ease-in-out forwards';
  }

  if (window.scrollY > screenHeight*13 + 300 && window.scrollY < screenHeight*14 && e.deltaY > 0) {
    document.querySelector('.thirdCenterText').style.animation = 'unshow-text 0.3s ease-in-out forwards';
  }

  if (window.scrollY > screenHeight*14 && window.scrollY < screenHeight*15) {
    console.log('VERTICAL CHART');

  }

  if (window.scrollY > screenHeight*15 && window.scrollY < screenHeight*16) {
    console.log('LINE CHART');
  }

  if (window.scrollY > screenHeight*16 && window.scrollY < screenHeight*17) {
    console.log('TEXT V');
  }

  if (window.scrollY > screenHeight*17 && window.scrollY < screenHeight*18) {
    console.log('3D MAP');
  }

  if (window.scrollY > screenHeight*18 && window.scrollY < screenHeight*19) {
    if (okayToProceedHover){
      okayToProceedHover = false;
      console.log('HOVER CHART');
      tempRect.animate([
        {width: '0px'},
        {width: tempText.getClientRects()[0].width + 'px'}
      ], {
        duration: 500,
        easing: 'ease-in-out',
        fill: 'forwards',
      });
    }
  }

  if (window.scrollY > screenHeight*16 && window.scrollY < screenHeight*17) {
    console.log('2D MAP');
  }

  if (window.scrollY >= screenHeight*20 + screenHeight/2 ) {
    document.querySelector('body').style.overflow = 'hidden';
    console.log('LAST');
    if (okayToProceedLast) {
      okayToProceedLast = false;
      const leftT = document.querySelector('.leftText');
      const rightT = document.querySelector('.rightText');
      const leftB = document.querySelector('.leftBox');
      const rightB = document.querySelector('.rightBox');
      const middleL = document.querySelector('.middleLine');
      leftT.style.animation = 'distanceLeftText 1s ease-in-out forwards';
      rightT.style.animation = 'distanceRightText 1s ease-in-out forwards';
      leftB.style.animation = 'distanceLeft 1s ease-in-out forwards';
      rightB.style.animation = 'distanceRight 1s ease-in-out forwards';
      middleL.style.animation = 'distanceLine 1s ease-in-out forwards';

      document.querySelector('.mask').style.animation = 'cough 0.8s ease-out forwards';
      maskRect.animate([
        {height: '0px'},
        {height: maskText.getClientRects()[0].height + 'px'}
      ], {
        duration: 500,
        easing: 'ease-in-out',
        fill: 'forwards',
      });
    }
  }
});



var worldMap, geojsonWRLD, center, korea;

function loadDataMap(cb) {
  console.log('loadDataMap');
  d3.json('world.json')
      .then(function(data) {
        cb(data);
      });       
}


loadDataMap(function(wrldMap) {
  console.log('cb');

  // 데이터 가져오기
  worldMap = wrldMap;
  geojsonWRLD = topojson.feature(worldMap, worldMap.objects.countries);
  center = d3.geoCentroid(geojsonWRLD);

  // 한국 지도
  korea = geojsonWRLD.features.find(element => element.id === '410');

  basicSetting();
});

var projectionWRLD, pathWRLD, bounds, gWRLD;
// 기본 설정
function basicSetting() {
  projectionWRLD = d3.geoMercator()
    .scale(1)
    .translate([0, 0]);
  pathWRLD = d3.geoPath(projectionWRLD);
  gWRLD = svg.append('g').attr('class', 'mapg');
  console.log('got gwrld');
  bounds = pathWRLD.bounds(geojsonWRLD);
  const widthScale = (bounds[1][0] - bounds[0][0]) / width; 
  const heightScale = (bounds[1][1] - bounds[0][1]) / height; 
  const scaleWRLD = 1 /Math.max(widthScale, heightScale); //축척
  const xoffset = width/2 - scaleWRLD * (bounds[1][0] + bounds[0][0])/2; 
  const yoffset = height/2 - scaleWRLD * (bounds[1][1] + bounds[0][1])/2; 
  const offset = [xoffset, yoffset];
  projectionWRLD.scale(scaleWRLD).translate(offset);

  fillKorea(gWRLD, geojsonWRLD, pathWRLD);
}


function fillKorea(gWRLD, geojsonWRLD, pathWRLD) {
  console.log('........................');
  console.log(gWRLD);
  console.log(geojsonWRLD);
  console.log('........................');
  // 지도 그리고 한국 배경 색 트랜지션 반복
  var toggleKoreaFillColor = false;

  gWRLD
  .selectAll('path').data(geojsonWRLD.features)
  .enter().append('path')
  .attr('class', 'country')
  .attr('d', pathWRLD)
  .attr('id', d => {
    if (d.id === '410') return 'korea';
    else if (d.id === '156') {
      return 'china';
    }
  })
  .transition()
  .duration(2000)
  .style('fill', d => {
      toggleKoreaFillColor = !toggleKoreaFillColor;
      if (d.id === '410') {
          return '#F21905';
      }
      // else return 'rgba(245, 245, 245, 0.1)';
  })
  .style('stroke', d => {
      if (d.id === '410') {
          return '#F21905';
      }
  })
  .on('end', repeat);

  function repeat(d) {
      if (d.id === '410' && repeatOn) {
          d3.select(this)
          .transition()
          .duration(1000)
          .ease(d3.easeQuadIn)
          .style('fill', toggleKoreaFillColor ? 'transparent' : '#F21905')
          .style('stroke', toggleKoreaFillColor ? '#696969' : '#F21905')
          .on('end', repeat);
          toggleKoreaFillColor = !toggleKoreaFillColor;
      }
  }

  console.log('ZOOM KOREA');
  gWRLD.transition()
    .duration(2000)
    .attr('transform-origin', 'center')
    // .attr('transform', 'scale(5)');
    .attr('transform', browserCheck() === 'Safari' ? ('translate(' + -width*7 + ',' + -height*7 + ') scale(' + 15 + ')' + ' translate(' + (width/2-projectionWRLD([newMapInfo.lon, newMapInfo.lat])[0]) + ',' + (height/2-projectionWRLD([newMapInfo.lon, newMapInfo.lat])[1]) + ')') : 'scale(15)  translate(' + (width/2-projectionWRLD([newMapInfo.lon, newMapInfo.lat])[0]) + ',' + (height/2-projectionWRLD([newMapInfo.lon, newMapInfo.lat])[1]) + ')');
}


const titleCon = document.querySelector('.title-container');
titleCon.animate([
  {opacity: 0},
  {opacity: 1}
], {
  delay: 1000,
  duration: 1500,
  fill: 'forwards',
})

// red-text 줄긋기
var redText1 = document.querySelector('.red-text1');
var underline = document.createElement('div');
underline.setAttribute('id', 'underline');
// underline.style.width = redText.getClientRects()[0].width + 'px';
underline.style.top = redText1.getClientRects()[0].y + redText1.getClientRects()[0].height + 'px';
underline.style.left = redText1.getClientRects()[0].x + 'px';

underline.animate([
  {width: '0px'},
  {width: redText1.getClientRects()[0].width + 'px'}
], {
  delay: 1500,
  duration: 500,
  easing: 'ease-in-out',
  fill: 'forwards',
  // interations: Infinity
});
titleCon.appendChild(underline);





for (let story of storyCons) {
  // black-story-text 줄긋기
  // let blackText = document.querySelector('.black-story-text');
  let blackText = story.children[0].children[0];
  let underlineBlack = document.createElement('div');
  underlineBlack.setAttribute('id', 'underlineBlack');
  // underline.style.width = redText.getClientRects()[0].width + 'px';
  underlineBlack.style.top = window.scrollY + blackText.getClientRects()[0].y + blackText.getClientRects()[0].height + 'px';
  underlineBlack.style.left = blackText.getClientRects()[0].x + 'px';

  story.appendChild(underlineBlack);
}


const lastCon = document.querySelector('.last');
const maskText = document.querySelector('.mask');
var maskRect = document.createElement('div');
maskRect.setAttribute('id', 'maskRect');

maskRect.style.width = maskText.getClientRects()[0].width + 'px';
maskRect.style.top = window.scrollY + maskText.getClientRects()[0].y + 'px';
maskRect.style.left = maskText.getClientRects()[0].x + 'px';

lastCon.appendChild(maskRect);


const tempCon = document.querySelector('.temp-container');
const tempText = document.querySelector('.green-text');
var tempRect = document.createElement('div');
tempRect.setAttribute('id', 'tempRect');

// tempRect.style.width = tempText.getClientRects()[0].width + 'px';
tempRect.style.top = window.scrollY + tempText.getClientRects()[0].y + tempText.getClientRects()[0].height + 'px';
tempRect.style.left = tempText.getClientRects()[0].x + 'px';



tempCon.appendChild(tempRect);