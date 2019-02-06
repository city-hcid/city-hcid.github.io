//var ctx = document.getElementById("4*-graph").getContext('2d');
//var threeStarGraph = document.getElementById("3*-graph").getContext('2d');

var app_id = "appYnSjlUbAA4VSHc";
var app_key = "keyC83ksN49wS10kX";

axios.get(
        //https://api.airtable.com/v0/appYnSjlUbAA4VSHc/outputs?api_key=keyC83ksN49wS10kX&view=cs-outputs-all
        //https://api.airtable.com/v0/appYnSjlUbAA4VSHc/outputs?api_key=keyC83ksN49wS10kX&view=city-cs-outputs
        "https://api.airtable.com/v0/" + app_id + "/outputs?api_key=keyC83ksN49wS10kX&view=city-cs-outputs", {
            headers: { Authorization: "Bearer " + app_key }
        })
    .then(function(response) {
        obj = response.data.records;
        var totalCite = 0;
        var cites = [];
        var citeCount = 0;

        for (var i = 0; i < obj.length; i++) {
            if (obj[i].fields["year"] < 2009) {

            }
            /* var uni = obj[i].fields['inst'];
            eval('var ' + obj[i].fields["inst"] + Cites + '= [];');
            if (obj[i].fields['inst'] == uni) {
                obj[i].fields["inst"] + Cites.push(obj[i].fields['citation');
            } */
        }

        console.log(overallDataArray[3]);
        console.log(staffDataArray);

        console.log(rhoOverall);
        console.log(rhoOutputs);
        console.log(rhoImpact);
        console.log(rhoEnvironment);

        /* var k = document.getElementById('rhos');
        k.insertAdjacentHTML("beforeend",
            '<tr>\n' +
            '<td>Overall</td>\n' +
            '<td>' + rhoOverall[0] + '</td>\n' +
            '<td>' + rhoOverall[1] + '</td>\n' +
            '<td>' + rhoOverall[2] + '</td>\n' +
            '<td>' + rhoOverall[3] + '</td>\n' +
            '<td>' + rhoOverall[4] + '</td>\n' +
            '</tr>\n' +

            '<tr>\n' +
            '<td>Outputs</td>\n' +
            '<td>' + rhoOutputs[0] + '</td>\n' +
            '<td>' + rhoOutputs[1] + '</td>\n' +
            '<td>' + rhoOutputs[2] + '</td>\n' +
            '<td>' + rhoOutputs[3] + '</td>\n' +
            '<td>' + rhoOutputs[4] + '</td>\n' +
            '</tr>\n' +

            '<tr>\n' +
            '<td>Impact</td>\n' +
            '<td>' + rhoImpact[0] + '</td>\n' +
            '<td>' + rhoImpact[1] + '</td>\n' +
            '<td>' + rhoImpact[2] + '</td>\n' +
            '<td>' + rhoImpact[3] + '</td>\n' +
            '<td>' + rhoImpact[4] + '</td>\n' +
            '</tr>\n' +

            '<tr>\n' +
            '<td>Environment</td>\n' +
            '<td>' + rhoEnvironment[0] + '</td>\n' +
            '<td>' + rhoEnvironment[1] + '</td>\n' +
            '<td>' + rhoEnvironment[2] + '</td>\n' +
            '<td>' + rhoEnvironment[3] + '</td>\n' +
            '<td>' + rhoEnvironment[4] + '</td>\n' +
            '</tr>'
        );


        var myChart = new Chart(ctx, {
            type: 'scatter',
            data: {
                label: "Outputs",
                datasets: [{
                    data: overallData[0],
                    label: "Overall",
                    backgroundColor: col_1,
                }, {
                    data: outputsData[0],
                    label: "Outputs",
                    backgroundColor: col_2,
                }, {
                    data: impactData[0],
                    label: "Impact",
                    backgroundColor: col_3,
                }, {
                    data: environmentData[0],
                    label: "Environment",
                    backgroundColor: col_4,
                }]
            },
            options: {
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

        var threeStarChart = new Chart(threeStarGraph, {
            type: 'scatter',
            data: {
                label: "Outputs",
                datasets: [{
                    data: overallData[3],
                    label: "Overall",
                    backgroundColor: col_1,
                }, {
                    data: outputsData[3],
                    label: "Outputs",
                    backgroundColor: col_2,
                }, {
                    data: impactData[3],
                    label: "Impact",
                    backgroundColor: col_3,
                }, {
                    data: environmentData[3],
                    label: "Environment",
                    backgroundColor: col_4,
                }]
            },
            options: {
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
                            output += "1* " + profile.fields['Profile'] + ": " + profile.fields['1*'];
                            return output;
                        }
                    }
                }
            }
        }); */


    })
    .catch(function(error) {
        console.log(error);
    });