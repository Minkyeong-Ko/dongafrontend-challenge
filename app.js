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
                var zoomLevel = 15;
                var multiplyLevel = 7;
                if (i.name === 'China') {
                    zoomLevel = 10;
                    multiplyLevel = 4.5;
                }
                console.log(projection([i.lon, i.lat])[0]);
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
                    console.log('newCircle');
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
        .duration(0)
        .attr('transform-origin', 'center')
        .attr('transform', 'translate(' + (width/2-projection([newMapInfo.lon, newMapInfo.lat])[0]) + ',' + (height/2-projection([newMapInfo.lon, newMapInfo.lat])[1]) + ')');

        const foreign = svg.append('foreignObject')
            .attr('width', 50)
            .attr('height', 50)
            .attr('x', width/2 - 25)
            .attr('y', height/2 - 25);
        foreign.append('xhtml:div')
            .append('div')
            .attr('x', 25)
            .attr('y', 25)
            .attr('width', 50)
            .attr('height', 50)
            .append('i')
            .attr('x', 25)
            .attr('y', 25)
            .style('color', 'white')
            .style('font-size', '50px')
            .attr('class', 'fas fa-plane');
        

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
                console.log(projection([i.lon, i.lat])[0]);
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