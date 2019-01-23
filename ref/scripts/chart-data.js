// Labels along the x-axis
var levels = ["4*", "3*", "2*", "1*", "U/C"];
// Quality scores
var overallCityCS2014 = [15, 47, 36, 2, 0];
var outputsCityCS2014 = [10.5, 47.6, 38.7, 3.2, 0];
var impactCityCS2014 = [40, 50, 10, 0, 0];
var environmentCityCS2014 = [0, 4, 6, 0, 0];

var loading = false;

// Colors: https://coolors.co/728474-853c2d-d36135-282b28-83bca9
var backgroundColorOverall = 'rgba(40, 43, 40, 0.2)';
var borderColorOverall = 'rgba(40,43,40, 1)';
var backgroundColorOutputs = 'rgba(211, 97, 53, 0.2)';
var borderColorOutputs = 'rgba(211, 97, 53, 1)';
var backgroundColorImpact = 'rgba(133, 60, 45, 0.2)';
var borderColorImpact = 'rgba(133, 60, 45, 1)';
var backgroundColorEnvironment = 'rgba(114, 132, 116, 0.2)';
var borderColorEnvironment = 'rgba(114, 132, 116, 1)';

var options = {
    legend: false,
    tooltips: {
        displayColors: false
    },
    scales: {
        xAxes: [{
            barPercentage: 13,
            categoryPercentage: 1,
            maxBarThickness: 14,
        }],
        yAxes: [{
            ticks: {
                beginAtZero: true
            }
        }]
    }
};