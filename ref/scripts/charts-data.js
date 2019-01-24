// Labels along the x-axis
var levels = ["4*", "3*", "2*", "1*", "U/C"];
// Quality scores
var overallCityCS2014 = [15, 47, 36, 2, 0];
var outputsCityCS2014 = [10.5, 47.6, 38.7, 3.2, 0];
var impactCityCS2014 = [40, 50, 10, 0, 0];
var environmentCityCS2014 = [0, 4, 6, 0, 0];

// Raw numbers for colors
var raw_1 = '81, 192, 191';
var raw_2 = '253, 101, 133';
var raw_3 = '253, 193, 68';
var raw_4 = '61, 163, 232';
var raw_nc = '201, 203, 207';

// Colors for levels
var col_1 = 'rgb(' + raw_1 + ')';
var col_2 = 'rgb(' + raw_2 + ')';
var col_3 = 'rgb(' + raw_3 + ')';
var col_4 = 'rgb(' + raw_4 + ')';
var col_nc = 'rgb(' + raw_nc + ')';
var col_array = [col_4, col_3, col_2, col_1, col_nc];

// Colors: https://coolors.co/728474-853c2d-d36135-282b28-83bca9
var backgroundColorOverall = 'rgba(40, 43, 40, 0.9)';
var borderColorOverall = 'rgba(40,43,40, 1)';
var backgroundColorOutputs = 'rgba(211, 97, 53, 0.9)';
var borderColorOutputs = 'rgba(211, 97, 53, 1)';
var backgroundColorImpact = 'rgba(133, 60, 45, 0.9)';
var borderColorImpact = 'rgba(133, 60, 45, 1)';
var backgroundColorEnvironment = 'rgba(114, 132, 116, 0.9)';
var borderColorEnvironment = 'rgba(114, 132, 116, 1)';

var options = {
    legend: false,
    tooltips: {
        displayColors: false
    },
    scales: {
        xAxes: [{
            barPercentage: 11,
            categoryPercentage: 1,
            maxBarThickness: 11,
        }],
        yAxes: [{
            ticks: {
                beginAtZero: true,
                suggestedMax: 50,
            }
        }]
    }
};

var polarOptionsA = {
    legend: {
        display: true,
        position: 'left'
    },
    tooltips: {
        displayColors: false
    },
    scale: {
        label: {
            display: false
        },
        gridLines: {
            color: 'rgba(201, 203, 207, 0.2)'
        },
        ticks: {
            backdropColor: 'rgba(201, 203, 207, 0.1)',
            fontColor: 'rgba(80, 80, 80, 0.3)',
            max: 80
        }
    }
};

var polarOptionsB = {
    legend: { display: false },
    tooltips: {
        displayColors: false
    },
    scale: {
        //display: false,

        gridLines: {
            color: 'rgba(201, 203, 207, 0.2)'
        },
        ticks: {
            color: 'rgb(201, 203, 207)',
            max: 80
        }
    }
};