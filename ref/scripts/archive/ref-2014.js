// Labels along the x-axis
var levels = ["4*", "3*", "2*", "1*", "U/C"];
// Quality scores
var overallCityCS = [15, 47, 36, 2, 0];
var outputsCityCS = [10.5, 47.6, 38.7, 3.2, 0];
var impactCityCS = [40, 50, 10, 0, 0];
var environmentCityCS = [0, 4, 6, 0, 0];
var cityOverall2014 = {
    // A labels array that can contain any sort of values
    labels: levels,
    // Our series array that contains series objects or in this case series data arrays
    series: [{
        className: 'overall-series',
        data: overallCityCS,
    }]
};
var cityOutputs2014 = {
    // A labels array that can contain any sort of values
    labels: levels,
    // Our series array that contains series objects or in this case series data arrays
    series: [{
        className: 'outputs-series',
        data: outputsCityCS,
    }]
};
var cityImpact2014 = {
    // A labels array that can contain any sort of values
    labels: levels,
    // Our series array that contains series objects or in this case series data arrays
    series: [{
        className: 'impact-series',
        data: impactCityCS,
    }]
};
var cityEnvironment2014 = {
    // A labels array that can contain any sort of values
    labels: levels,
    // Our series array that contains series objects or in this case series data arrays
    series: [{
        className: 'environment-series',
        data: environmentCityCS,
    }]
};
var cityAll2014 = {
    // A labels array that can contain any sort of values
    labels: levels,
    // Our series array that contains series objects or in this case series data arrays
    series: [
        overallCityCS,
        outputsCityCS,
        impactCityCS,
        environmentCityCS
    ]
};
// As options we currently only set a static size of 300x200 px. We can also omit this and use aspect ratio containers
// as you saw in the previous example
var options = {
    seriesBarDistance: 12,
    horizontalBars: true,
    axisX: {
        // We can disable the grid for this axis
        showGrid: false,
        high: 50
    },
};
var options2 = {
    seriesBarDistance: 12,
    axisX: {
        // We can disable the grid for this axis
        showGrid: false,
        high: 50
    },
};
var responsiveOptions = [
    ['screen and (min-width: 641px) and (max-width: 1024px)', {
        seriesBarDistance: 10,
        axisX: {
            labelInterpolationFnc: function(value) {
                return value;
            }
        }
    }],
    ['screen and (max-width: 640px)', {
        seriesBarDistance: 8,
        axisX: {
            labelInterpolationFnc: function(value) {
                return value[0];
            }
        }
    }]
];
// Create a new line chart object where as first parameter we pass in a selector
// that is resolving to our chart container element. The Second parameter
// is the actual data object.
new Chartist.Bar('#city-overall-2014', cityOverall2014, options, responsiveOptions);
new Chartist.Bar('#city-outputs-2014', cityOutputs2014, options, responsiveOptions);
new Chartist.Bar('#city-impact-2014', cityImpact2014, options, responsiveOptions);
new Chartist.Bar('#city-environment-2014', cityEnvironment2014, options, responsiveOptions);
new Chartist.Bar('#city-all-2014', cityAll2014, options2, responsiveOptions);