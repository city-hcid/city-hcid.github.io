var ctx = document.getElementById("graph").getContext('2d');

var app_id = "appYnSjlUbAA4VSHc";
var app_key = "keyC83ksN49wS10kX";

axios.get(
        "https://api.airtable.com/v0/" + app_id + "/results?view=uoa-cs&filterByFormula=IF(%7Buoa%7D+%3D+%22CS%22%2C+%22true%22%2C+%22%22)", {
            headers: { Authorization: "Bearer " + app_key }
        })
    .then(function(response) {
        obj = response.data.records;
        var overall4Data = [];
        var outputs4Data = [];
        var impact4Data = [];
        var environment4Data = [];
        var staffDataArray = [];
        var overall4DataArray = [];
        var outputs4DataArray = [];
        var impact4DataArray = [];
        var environment4DataArray = [];
        let rhoOverall = 0;
        let rhoOutputs = 0;
        let rhoImpact = 0;
        let rhoEnvironment = 0;

        for (var i = 0; i < obj.length; i++) {
            staffDataArray.push(obj[i].fields['staff-a']);
            i = i + 3;
        }

        for (var i = 3; i < obj.length; i++) {
            overall4Data.push({ x: obj[i].fields['staff-a'], y: obj[i].fields['4*'], id: i });
            overall4DataArray.push(obj[i].fields['4*']);
            i = i + 3;
        }
        for (var i = 0; i < obj.length; i++) {
            outputs4Data.push({ x: obj[i].fields['staff-a'], y: obj[i].fields['4*'], id: i });
            outputs4DataArray.push(obj[i].fields['4*']);
            i = i + 3;
        }
        for (var i = 1; i < obj.length; i++) {
            impact4Data.push({ x: obj[i].fields['staff-a'], y: obj[i].fields['4*'], id: i });
            impact4DataArray.push(obj[i].fields['4*']);
            i = i + 3;
        }
        for (var i = 2; i < obj.length; i++) {
            environment4Data.push({ x: obj[i].fields['staff-a'], y: obj[i].fields['4*'], id: i });
            environment4DataArray.push(obj[i].fields['4*']);
            i = i + 3;
        }

        rhoOverall = Math.round(pearsonCorrelation(staffDataArray, overall4DataArray) * 100) / 100;
        rhoOutputs = Math.round(pearsonCorrelation(staffDataArray, outputs4DataArray) * 100) / 100;
        rhoImpact = Math.round(pearsonCorrelation(staffDataArray, impact4DataArray) * 100) / 100;
        rhoEnvironment = Math.round(pearsonCorrelation(staffDataArray, environment4DataArray) * 100) / 100;
        console.log(rhoOverall);
        console.log(rhoOutputs);
        console.log(rhoImpact);
        console.log(rhoEnvironment);

        var k = document.getElementById('rhos');
        k.insertAdjacentHTML("beforeend",
            '<tr>\n' +
            '<td>Overall</td>\n' +
            '<td>' + rhoOverall + '</td>\n' +
            '</tr>\n' +

            '<tr>\n' +
            '<td>Outputs</td>\n' +
            '<td>' + rhoOutputs + '</td>\n' +
            '</tr>\n' +

            '<tr>\n' +
            '<td>Impact</td>\n' +
            '<td>' + rhoImpact + '</td>\n' +
            '</tr>\n' +

            '<tr>\n' +
            '<td>Environment</td>\n' +
            '<td>' + rhoEnvironment + '</td>\n' +
            '</tr>'
        );


        var myChart = new Chart(ctx, {
            type: 'scatter',
            data: {
                label: "Outputs",
                datasets: [{
                    data: overall4Data,
                    label: "Overall",
                    backgroundColor: col_1,
                }, {
                    data: outputs4Data,
                    label: "Outputs",
                    backgroundColor: col_2,
                }, {
                    data: impact4Data,
                    label: "Impact",
                    backgroundColor: col_3,
                }, {
                    data: environment4Data,
                    label: "Environment",
                    backgroundColor: col_4,
                }]
            },
            options: {
                //responsive: true,
                title: {
                    display: false
                },
                legend: {
                    display: true,
                    position: 'right',
                    labels: {
                        boxWidth: 12
                    }
                },
                showLines: false,
                scales: {
                    yAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Profile Score',
                            fontSize: 16
                        },
                        ticks: {
                            beginAtZero: true,
                            fontSize: 14
                        }
                    }],
                    xAxes: [{
                        type: 'linear',
                        position: 'bottom',
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Staff Size',
                            fontSize: 16
                        },
                        gridLines: {
                            display: true
                        },
                        ticks: {
                            beginAtZero: false,
                            fontSize: 14,
                        }
                    }]
                },
                tooltips: {
                    displayColors: false,
                    callbacks: {
                        title: function(tooltipItems, data) {
                            var index = tooltipItems[0].index;
                            var datasetIndex = tooltipItems[0].datasetIndex;
                            var dataset = data.datasets[datasetIndex];
                            var datasetItem = dataset.data[index];

                            var uni = obj[datasetItem.id];
                            return uni.fields['inst-full'];
                        },
                        label: function(tooltipItems, data) {
                            var output = "";
                            var index = tooltipItems.index;
                            var datasetIndex = tooltipItems.datasetIndex;
                            var dataset = data.datasets[datasetIndex];
                            var datasetItem = dataset.data[index];

                            var profile = obj[datasetItem.id];

                            output += "Staff: " + profile.fields['staff-a'] + "\n | \n";
                            output += "4* " + profile.fields['Profile'] + ": " + profile.fields['4*'];
                            return output;
                        }
                    }
                }
            }
        });
    })
    .catch(function(error) {
        console.log(error);
    });