const width = 1127;
const height = 796;

const svg = d3.select('div').append('svg').attr('width', width).attr('height', height).attr('cursor', 'pointer');

const projection = d3.geoMercator().scale(150)
.translate([width/2, height/1.5]);
const path = d3.geoPath(projection);

const g = svg.append('g');

d3.json('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json')
    .then(data => {
    
        const countries = topojson.feature(data, data.objects.countries);
        const center = d3.geoCentroid(countries);
        var zoomLevel = 5;
        g.transition()
        .duration(zoomSettings.ease)
        .attr('transform', 'translate(' + width/2 + ',' + height/2 + ') scale(' + zoomLevel + ') translate(' + -center[0] + ',' + -center[1] + ')');

        console.log(center);
        // const test = topojson.feature(data, data.objects.countries.geometries[0].properties);

        g.selectAll('path').data(countries.features).enter().append('path').attr('class', 'country').attr('d', path).on('click', dta => clicked(dta));
});


const zoomSettings = {
    duration: 1000,
    ease: d3.easeCubicOut,
    zoomLevel: 5,   //higer, more zoom
}

function clicked(d) {
    console.log(d.path);
    var x;
    var y;
    var zoomLevel;

    if (d) {
        var centroid = d3.geoCentroid();
        console.log(centroid);
        x = centroid[0];
        y = centroid[1];
        zoomLevel = zoomSettings.zoomLevel;
        centered = d;
    }
    else {
        x = width/2;
        y = height/2;
        zoomLevel = 1;
        centered = null;
    }

    g.transition()
        .duration(zoomSettings.ease)
        .attr('transform', 'translate(' + width/2 + ',' + height/2 + ') scale(' + zoomLevel + ') translate(' + -x + ',' + -y + ')');
}