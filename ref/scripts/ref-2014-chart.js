// Labels along the x-axis
var levels = ["4*", "3*", "2*", "1*", "U/C"];
// Quality scores
var overallCityCS2014 = [15, 47, 36, 2, 0];
var outputsCityCS2014 = [10.5, 47.6, 38.7, 3.2, 0];
var impactCityCS2014 = [40, 50, 10, 0, 0];
var environmentCityCS2014 = [0, 4, 6, 0, 0];
var backgroundColorOverall = 'rgba(40, 43, 40, 0.2)';
var borderColorOverall = 'rgba(40,43,40, 1)';
var backgroundColorOutputs = 'rgba(211, 97, 53, 0.2)';
var borderColorOutputs = 'rgba(211, 97, 53, 1)';
var backgroundColorImpact = 'rgba(133, 60, 45, 0.2)';
var borderColorImpact = 'rgba(133, 60, 45, 1)';
var backgroundColorEnvironment = 'rgba(114, 132, 116, 0.2)';
var borderColorEnvironment = 'rgba(114, 132, 116, 1)';
var overallCityCS2014Dataset = {
    data: overallCityCS2014,
    backgroundColor: backgroundColorOverall,
    borderColor: borderColorOverall,
    borderWidth: 1
};
var options = {
    legend: false,
    tooltips: {
        displayColors: false
    },
    scales: {
        xAxes: [{
            barPercentage: 25,
            categoryPercentage: 1,
            maxBarThickness: 30,
        }],
        yAxes: [{
            ticks: {
                beginAtZero: true
            }
        }]
    }
};

var citycsc = document.getElementById("city-cs-combined-2014").getContext('2d');
var citycscChart = new Chart(citycsc, {
    type: 'bar',
    data: {
        labels: levels,
        datasets: [{
                data: overallCityCS2014,
                backgroundColor: backgroundColorOverall,
                borderColor: borderColorOverall,
                borderWidth: 1
            },
            {
                data: outputsCityCS2014,
                backgroundColor: backgroundColorOutputs,
                borderColor: borderColorOutputs,
                borderWidth: 1
            },
            {
                data: impactCityCS2014,
                backgroundColor: backgroundColorImpact,
                borderColor: borderColorImpact,
                borderWidth: 1
            },
            {
                data: environmentCityCS2014,
                backgroundColor: backgroundColorEnvironment,
                borderColor: borderColorEnvironment,
                borderWidth: 1
            }
        ]
    },
    options: options
});

var citycso = document.getElementById("city-cs-overall-2014").getContext('2d');
var citycsoChart = new Chart(citycso, {
    type: 'bar',
    data: {
        labels: levels,
        datasets: [overallCityCS2014Dataset]
    },
    options: options
});