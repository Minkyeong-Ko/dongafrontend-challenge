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
        "name": "New York",
        "lat" : "40.730610",
        "lon" : "-73.935242"
    }
];

const newMapInfo = {
    "name":"South Korea",
    "lat" : "37.532600",
    "lon" : "127.024612"
};

d3.json("world.json")
    .then(data => {
        const worldMap = data;
        const geojson = topojson.feature(worldMap, worldMap.objects.countries);
        const center = d3.geoCentroid(geojson);
        console.log(center);

        const korea = geojson.features.find(element => element.id === '410');
        console.log(korea);

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
        console.log(scale, offset);

        var toggleKoreaFillColor = false;

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
            console.log('new');
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
        const transforms = cur_brower === 'Chrome' ? 'scale(15)' : 'translate(' + -width*7 + ',' + -height*7 + ') scale(' + 15 + ')';

        // const icons = svg.append('g').selectAll('svg')
        //     .data(mapInfo)
        //     .enter()  
        //     .append("rect")
        //     .attr("width", 10)
        //     .attr("height", 10)
        //     .attr('fill', 'green')
        //     .attr('x' ,  d => projection([d.lon, d.lat])[0])
        //     .attr('y' ,  d => projection([d.lon, d.lat])[1])
        //     .attr('opacity', 1)
        //     .on('click', function(d, i) {
        //         console.log(projection([i.lon, i.lat])[0]);
        //         g.transition()
        //         .duration(2000)
        //         .attr('transform-origin', 'center')
        //         .attr('transform', transforms + ' translate(' + (width/2-projection([i.lon, i.lat])[0]) + ',' + (height/2-projection([i.lon, i.lat])[1]) + ')');
        //     });
        
        g
        .transition()
        .duration(0)
        .attr('transform-origin', 'center')
        .attr('transform', transforms + ' translate(' + (width/2-projection([newMapInfo.lon, newMapInfo.lat])[0]) + ',' + (height/2-projection([newMapInfo.lon, newMapInfo.lat])[1]) + ')');

        // g.data(newMapInfo)
        // .transition()
        // .duration(2000)
        // .attr('transform-origin', 'center')
        // .attr('transform', function(d, i) {
        //     console.log('test?');
        //     return transforms + ' translate(' + (width/2-projection([i.lon, i.lat])[0]) + ',' + (height/2-projection([i.lon, i.lat])[1]) + ')'});

        // const testCenter = svg.append('g').selectAll('svg')
        //     .data([center])
        //     .enter()
        //     .append("rect")
        //     .attr("width", 10)
        //     .attr("height", 10)
        //     .attr('fill', 'blue')
        //     .attr('x' ,  d => width/2 - 5)
        //     .attr('y' ,  d => height/2 - 5);
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