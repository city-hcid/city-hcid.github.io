var ctx = document.getElementById("4*-graph");
var threeStarGraph = document.getElementById("3*-graph");

axios.get(
        "https://api.airtable.com/v0/appunQ0V4X7SQIIk7/results?view=uoa-cs", {
            headers: { Authorization: "Bearer " + app_key }
        })
    .then(function(response) {
        obj = response.data.records;
        var staffDataArray = [];
        var overallData = [
            [],
            [],
            [],
            [],
            [],
        ];
        var outputsData = [
            [],
            [],
            [],
            [],
            [],
        ];
        var impactData = [
            [],
            [],
            [],
            [],
            [],
        ];
        var environmentData = [
            [],
            [],
            [],
            [],
            [],
        ];
        var overallDataArray = [
            [],
            [],
            [],
            [],
            [],
        ];
        var outputsDataArray = [
            [],
            [],
            [],
            [],
            []
        ];
        var impactDataArray = [
            [],
            [],
            [],
            [],
            []
        ];
        var environmentDataArray = [
            [],
            [],
            [],
            [],
            []
        ];
        let rhoOverall = [];
        let rhoOutputs = [];
        let rhoImpact = [];
        let rhoEnvironment = [];

        for (var i = 0; i < obj.length; i++) {
            if (obj[i].fields['Profile'] == 'Overall') {
                staffDataArray.push(obj[i].fields['staff-a']);
                overallData[0].push({ x: obj[i].fields['staff-a'], y: obj[i].fields['4*'], id: i });
                overallData[1].push({ x: obj[i].fields['staff-a'], y: obj[i].fields['3*'], id: i });
                overallData[2].push({ x: obj[i].fields['staff-a'], y: obj[i].fields['2*'], id: i });
                overallData[3].push({ x: obj[i].fields['staff-a'], y: obj[i].fields['1*'], id: i });
                overallData[4].push({ x: obj[i].fields['staff-a'], y: obj[i].fields['N/C'], id: i });
                overallDataArray[0].push(obj[i].fields['4*']);
                overallDataArray[1].push(obj[i].fields['3*']);
                overallDataArray[2].push(obj[i].fields['2*']);
                overallDataArray[3].push(obj[i].fields['1*']);
                overallDataArray[4].push(obj[i].fields['N/C']);
            }
            if (obj[i].fields['Profile'] == 'Outputs') {
                outputsData[0].push({ x: obj[i].fields['staff-a'], y: obj[i].fields['4*'], id: i });
                outputsData[1].push({ x: obj[i].fields['staff-a'], y: obj[i].fields['3*'], id: i });
                outputsData[2].push({ x: obj[i].fields['staff-a'], y: obj[i].fields['2*'], id: i });
                outputsData[3].push({ x: obj[i].fields['staff-a'], y: obj[i].fields['1*'], id: i });
                outputsData[4].push({ x: obj[i].fields['staff-a'], y: obj[i].fields['N/C'], id: i });
                outputsDataArray[0].push(obj[i].fields['4*']);
                outputsDataArray[1].push(obj[i].fields['3*']);
                outputsDataArray[2].push(obj[i].fields['2*']);
                outputsDataArray[3].push(obj[i].fields['1*']);
                outputsDataArray[4].push(obj[i].fields['N/C']);
            }
            if (obj[i].fields['Profile'] == 'Impact') {
                impactData[0].push({ x: obj[i].fields['staff-a'], y: obj[i].fields['4*'], id: i });
                impactData[1].push({ x: obj[i].fields['staff-a'], y: obj[i].fields['3*'], id: i });
                impactData[2].push({ x: obj[i].fields['staff-a'], y: obj[i].fields['2*'], id: i });
                impactData[3].push({ x: obj[i].fields['staff-a'], y: obj[i].fields['1*'], id: i });
                impactData[4].push({ x: obj[i].fields['staff-a'], y: obj[i].fields['N/C'], id: i });
                impactDataArray[0].push(obj[i].fields['4*']);
                impactDataArray[1].push(obj[i].fields['3*']);
                impactDataArray[2].push(obj[i].fields['2*']);
                impactDataArray[3].push(obj[i].fields['1*']);
                impactDataArray[4].push(obj[i].fields['N/C']);
            }
            if (obj[i].fields['Profile'] == 'Environment') {
                environmentData[0].push({ x: obj[i].fields['staff-a'], y: obj[i].fields['4*'], id: i });
                environmentData[1].push({ x: obj[i].fields['staff-a'], y: obj[i].fields['3*'], id: i });
                environmentData[2].push({ x: obj[i].fields['staff-a'], y: obj[i].fields['2*'], id: i });
                environmentData[3].push({ x: obj[i].fields['staff-a'], y: obj[i].fields['1*'], id: i });
                environmentData[4].push({ x: obj[i].fields['staff-a'], y: obj[i].fields['N/C'], id: i });
                environmentDataArray[0].push(obj[i].fields['4*']);
                environmentDataArray[1].push(obj[i].fields['3*']);
                environmentDataArray[2].push(obj[i].fields['2*']);
                environmentDataArray[3].push(obj[i].fields['1*']);
                environmentDataArray[4].push(obj[i].fields['N/C']);
            }
        }

        for (var j = 0; j < 5; j++) {
            rhoOverall[j] = Math.round(pearsonCorrelation(staffDataArray, overallDataArray[j]) * 100) / 100;
            rhoOutputs[j] = Math.round(pearsonCorrelation(staffDataArray, outputsDataArray[j]) * 100) / 100;
            rhoImpact[j] = Math.round(pearsonCorrelation(staffDataArray, impactDataArray[j]) * 100) / 100;
            rhoEnvironment[j] = Math.round(pearsonCorrelation(staffDataArray, environmentDataArray[j]) * 100) / 100;
        }

        console.log(overallDataArray[3]);
        console.log(staffDataArray);

        console.log(rhoOverall);
        console.log(rhoOutputs);
        console.log(rhoImpact);
        console.log(rhoEnvironment);

        var k = document.getElementById('rhos');
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
        });


    })
    .catch(function(error) {
        console.log(error);
    });