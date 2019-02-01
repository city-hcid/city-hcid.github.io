var app = new Vue({
            el: '#app',
            data: {
                items: [],
                chart: null,
                chartsoc: null
            },
            mounted: function() {
                this.loadItems();
            },
            methods: {
                loadItems: function() {
                    var self = this;
                    var app_id = "appYnSjlUbAA4VSHc";
                    var app_key = "keyC83ksN49wS10kX";
                    this.items = [];
                    axios.get(
                            "https://api.airtable.com/v0/" + app_id + "/results?view=uoa-cs&filterByFormula=IF(%7Buoa%7D+%3D+%22CS%22%2C+%22true%22%2C+%22%22)", {
                                headers: {
                                    Authorization: "Bearer " + app_key
                                }
                            })
                        .then(function(response) {
                                var i = "";
                                var c = "";
                                var sizeData = [];
                                var overallData = [];

                                self.items = response.data.records;
                                obj = response.data.records;

                                for (i in obj) {
                                    sizeData.push(obj[i].fields['staff-a']);
                                    overallData.push(obj[i].fields['4*']);
                                    console.log(sizeData);
                                    console.log(overallData);
                                }

                                sizeDataLength = sizelData.length;
                                overallDataLength = overallData.length;

                                var ctx = document.getElementById("dataGraph");
                                this.dataGraph = new Chart(ctx, {
                                        type: 'scatter',
                                        data: {
                                            label: 'Scatter Dataset',
                                            datasets: [{
                                                    data: [{
                                                            x: sizeData[0],
                                                            y: overallData[0]
                                                        },
                                                        {
                                                            x: sizeData[1],
                                                            y: overallData[1]
                                                        }
                                                    ],
                                                    label: '4*'
                                                }
                                            },
                                            options: {
                                                title: {
                                                    display: true,
                                                    text: "35 Fastest times up Alpe d'Huez"
                                                },
                                                legend: {
                                                    display: true,
                                                },
                                                showLines: false,
                                                scales: {
                                                    yAxes: [{
                                                        display: true,
                                                        scaleLabel: {
                                                            display: true,
                                                            labelString: 'Rank',
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
                                                            labelString: 'Time (Minutes)',
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
                                                    displayColors: false
                                                }
                                            }
                                        });
                                })
                            .catch(function(error) {
                                console.log(error);
                            });
                        }
                }
            })