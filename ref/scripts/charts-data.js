var app_id = "appunQ0V4X7SQIIk7";
var app_key = "key8l5YZtQ9FyUoxF";

// Labels along the x-axis
var levels = ["4*", "3*", "2*", "1*", "U/C"];
var profiles = ["Overall", "Outputs", "Impact", "Environment"]
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
var raw_5 = '201, 203, 207';

// alphas
var a_1 = '0.1';
var a_2 = '0.4';
var a_3 = '0.7';
var a_4 = '1.0';
var a_5 = '0.1';

// Colors for levels - NB 5 = n/c
var col_1 = 'rgb(' + raw_1 + ')';
var col_2 = 'rgb(' + raw_2 + ')';
var col_3 = 'rgb(' + raw_3 + ')';
var col_4 = 'rgb(' + raw_4 + ')';
var col_5 = 'rgb(' + raw_5 + ')';
var col_array = [col_4, col_3, col_2, col_1, col_5];

// Colors: https://coolors.co/728474-853c2d-d36135-282b28-83bca9
// var backgroundColorOverall = 'rgba(40, 43, 40, 0.9)';
var backgroundColorOverall = ['rgba(' + raw_4 + ', ' + a_4 + ')', 'rgba(' + raw_3 + ', ' + a_4 + ')', 'rgba(' + raw_2 + ', ' + a_4 + ')', 'rgba(' + raw_1 + ', ' + a_4 + ')', 'rgba(' + raw_5 + ', ' + a_4 + ')'];
var borderColorOverall = col_array;
var backgroundColorOutputs = ['rgba(' + raw_4 + ', ' + a_3 + ')', 'rgba(' + raw_3 + ', ' + a_3 + ')', 'rgba(' + raw_2 + ', ' + a_3 + ')', 'rgba(' + raw_1 + ', ' + a_3 + ')', 'rgba(' + raw_5 + ', ' + a_3 + ')'];
var borderColorOutputs = col_array;
var backgroundColorImpact = ['rgba(' + raw_4 + ', ' + a_2 + ')', 'rgba(' + raw_3 + ', ' + a_2 + ')', 'rgba(' + raw_2 + ', ' + a_2 + ')', 'rgba(' + raw_1 + ', ' + a_2 + ')', 'rgba(' + raw_5 + ', ' + a_2 + ')'];
var borderColorImpact = col_array;
var backgroundColorEnvironment = ['rgba(' + raw_4 + ', ' + a_1 + ')', 'rgba(' + raw_3 + ', ' + a_1 + ')', 'rgba(' + raw_2 + ', ' + a_1 + ')', 'rgba(' + raw_1 + ', ' + a_1 + ')', 'rgba(' + raw_5 + ', ' + a_1 + ')'];
var borderColorEnvironment = col_array;

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
                suggestedMax: 60,
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
    layout: {
        padding: {
            left: 5,
            right: 5,
            top: 5,
            bottom: 5
        }
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
            maxTicksLimit: 5,
            max: 60
        }
    }
};

var polarOptionsC = {
    legend: { display: false },
    tooltips: {
        displayColors: false
    },
    layout: {
        padding: {
            left: 5,
            right: 5,
            top: 5,
            bottom: 5
        }
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
            maxTicksLimit: 4,
            max: 100
        }
    }
};

function chartOutputs(response) {
    self.items = response.data.records;
    obj = response.data.records;
    var h = document.getElementById("top-inst-data");

    for (i in obj) {
        //Set data for each entry
        eval(obj[i].fields['Profile'] + obj[i].fields['code'] + ' = ' + obj[i].fields['array'] + ";");
        //Set chart dataset for each entry
        eval('var ' + obj[i].fields['Profile'] + obj[i].fields['code'] + 'Dataset  = { data: ' + obj[i].fields['Profile'] + obj[i].fields['code'] + ',' + 'backgroundColor: backgroundColor' + obj[i].fields['Profile'] + ', borderColor: col_array, borderWidth: 1 }');
        console.log(obj[i].fields['inst'] + " " + obj[i].fields['Profile'])
        var b = obj[i].fields['inst'] + obj[i].fields['uoa'] + obj[i].fields['Profile'] + '_' + obj[i].fields['year'];
        var c = obj[i].fields['Profile'] + obj[i].fields['code'] + 'Dataset';
        var k = document.getElementById(obj[i].fields['inst']);

        if (k === null) {
            h.insertAdjacentHTML("beforeend",
                '<div class="columns is-centered mt-4" id="' + obj[i].fields['inst'] + '">\n' +

                '<div class="column is-1 mb-1" id="' + obj[i].fields['inst'] + '-title">\n' +
                '<div class="rotate">\n' +
                '<h1 class="has-text-grey-dark has-text-weight-semibold is-size-6">' + obj[i].fields['inst'] + '</h1>\n' +
                '</div>\n' +
                '</div>\n' +

                '<div class="column is-2">\n' +
                '<canvas id="' + obj[i].fields['inst'] + obj[i].fields['uoa'] + 'Overall_2014" width="200 " height="200 "></canvas>\n' +
                '</div>\n' +

                '<div class="column is-2">\n' +
                '<canvas id="' + obj[i].fields['inst'] + obj[i].fields['uoa'] + 'Outputs_2014" width="200" height="200"></canvas>\n' +
                '</div>\n' +

                '<div class="column is-2">\n' +
                '<canvas id="' + obj[i].fields['inst'] + obj[i].fields['uoa'] + 'Impact_2014" width="200" height="200"></canvas>\n' +
                '</div>\n' +

                '<div class="column is-2">\n' +
                '<canvas id="' + obj[i].fields['inst'] + obj[i].fields['uoa'] + 'Environment_2014" width="200" height="200"></canvas>\n' +
                '</div>\n' +

                '<div class="column is-1 is-offset-1 is-centered my-auto" id="' + obj[i].fields['inst'] + '-staff"><h1 class="is-size-3 has-text-grey-dark has-text-weight-semibold has-text-left">' + obj[i].fields['staff-a'] + '</h1></div>\n' +

                '</div>\n');
        }
        var a = document.getElementById(b);
        if (a !== null) {
            this.b = new Chart(a, {
                type: 'polarArea',
                data: {
                    labels: levels,
                    datasets: [
                        eval(c)
                    ]
                },
                options: polarOptionsC
            });
        }
    }
}