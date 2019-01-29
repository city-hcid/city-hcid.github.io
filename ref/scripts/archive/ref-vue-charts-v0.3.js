var app = new Vue({
    el: '#app-2',
    data: {
        items: [],
        message: 'Combined',
        chart: null,
        loading: false
    },
    mounted: function() {
        this.loadItems();
    },
    methods: {
        loadItems: function() {
            loading = true;
            var self = this;
            var app_id = "appYnSjlUbAA4VSHc";
            var app_key = "keyC83ksN49wS10kX";
            this.items = []
            axios.get(
                    // https://api.airtable.com/v0/appYnSjlUbAA4VSHc/City-CS-2014?api_key=keyC83ksN49wS10kX&view=Grid%20view
                    "https://api.airtable.com/v0/" + app_id + "/City-CS-2014?view=Grid%20view", {
                        headers: {
                            Authorization: "Bearer " + app_key
                        }
                    }
                )
                .then(function(response) {
                    var i = "";
                    self.items = response.data.records;
                    obj = response.data.records;
                    for (i in obj) {
                        eval(obj[i].fields['Profile'] + 'CityCS2014' + ' = ' + obj[i].fields['array'] + ";");

                    }
                    console.log(OverallCityCS2014)
                    console.log(OutputsCityCS2014)

                    var citycso = document.getElementById("city-cs-outputs-2014").getContext('2d');
                    this.chart = new Chart(citycso, {
                        type: 'bar',
                        data: {
                            labels: levels,
                            datasets: [{
                                data: OverallCityCS2014,
                                backgroundColor: backgroundColorOverall,
                                borderColor: borderColorOverall,
                                borderWidth: 1
                            }, {
                                data: OutputsCityCS2014,
                                backgroundColor: backgroundColorOutputs,
                                borderColor: borderColorOutputs,
                                borderWidth: 1
                            }, {
                                data: ImpactCityCS2014,
                                backgroundColor: backgroundColorImpact,
                                borderColor: borderColorImpact,
                                borderWidth: 1
                            }, {
                                data: EnvironmentCityCS2014,
                                backgroundColor: backgroundColorEnvironment,
                                borderColor: borderColorEnvironment,
                                borderWidth: 1
                            }]
                        },
                        options: options
                    });
                })
                .catch(function(error) {
                    console.log(error)
                })
                .finally(() => (this.loading = false));
        }
    }

})

/* var app = new Vue({
  el: "#app",
  data: {
    chart: null,
    city: "",
    dates: [],
    temps: [],
    loading: false,
    errored: false
  },
  methods: {
    getData: function() {
      this.loading = true;

      if (this.chart != null) {
        this.chart.destroy();
      }

      axios
        .get("https://api.openweathermap.org/data/2.5/forecast", {
          params: {
            q: this.city,
            units: "imperial",
            appid: "fd3150a661c1ddc90d3aefdec0400de4"
          }
        })
        .then(response => {
          this.dates = response.data.list.map(list => {
            return list.dt_txt;
          });

          this.temps = response.data.list.map(list => {
            return list.main.temp;
          });

          var ctx = document.getElementById("myChart");
          this.chart = new Chart(ctx, {
            type: "line",
            data: {
              labels: this.dates,
              datasets: [
                {
                  label: "Avg. Temp",
                  backgroundColor: "rgba(54, 162, 235, 0.5)",
                  borderColor: "rgb(54, 162, 235)",
                  fill: false,
                  data: this.temps
                }
              ]
            },
            options: {
              title: {
                display: true,
                text: "Temperature with Chart.js"
              },
              tooltips: {
                callbacks: {
                  label: function(tooltipItem, data) {
                    var label =
                      data.datasets[tooltipItem.datasetIndex].label || "";

                    if (label) {
                      label += ": ";
                    }

                    label += Math.floor(tooltipItem.yLabel);
                    return label + "°F";
                  }
                }
              },
              scales: {
                xAxes: [
                  {
                    type: "time",
                    time: {
                      unit: "hour",
                      displayFormats: {
                        hour: "M/DD @ hA"
                      },
                      tooltipFormat: "MMM. DD @ hA"
                    },
                    scaleLabel: {
                      display: true,
                      labelString: "Date/Time"
                    }
                  }
                ],
                yAxes: [
                  {
                    scaleLabel: {
                      display: true,
                      labelString: "Temperature (°F)"
                    },
                    ticks: {
                      callback: function(value, index, values) {
                        return value + "°F";
                      }
                    }
                  }
                ]
              }
            }
          });
        })
        .catch(error => {
          console.log(error);
          this.errored = true;
        })
        .finally(() => (this.loading = false));
    }
  }
}); */