var app = new Vue({
    el: '#app-2',
    data: {
        items: [],
        message: '',
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
                    // https://api.airtable.com/v0/appYnSjlUbAA4VSHc/results?api_key=keyC83ksN49wS10kX&view=Grid%20view
                    "https://api.airtable.com/v0/" + app_id + "/results?view=Grid%20view&fields%5B%5D=Profile&fields%5B%5D=4*&fields%5B%5D=3*&fields%5B%5D=2*&fields%5B%5D=1*&fields%5B%5D=N%2FC&fields%5B%5D=array&fields%5B%5D=code", {
                        headers: {
                            Authorization: "Bearer " + app_key
                        }
                    }
                )
                .then(function(response) {
                    var i = "";
                    this.message = "combined";
                    self.items = response.data.records;
                    obj = response.data.records;
                    for (i in obj) {
                        //Set data for each entry
                        eval(obj[i].fields['Profile'] + obj[i].fields['code'] + ' = ' + obj[i].fields['array'] + ";");
                        //Set chart dataset for each entry
                        eval('var ' + obj[i].fields['Profile'] + obj[i].fields['code'] + 'Dataset  = { data: ' + obj[i].fields['Profile'] + obj[i].fields['code'] + ',' + 'backgroundColor: backgroundColor' + obj[i].fields['Profile'] + ', borderColor: borderColor' + obj[i].fields['Profile'] + ', borderWidth: 1 }');
                    }
                    console.log(OverallCityCS2014);
                    console.log(OverallCityCS2014Dataset);

                    var citycsc = document.getElementById("city-cs-combined-2014");
                    this.chartcsc = new Chart(citycsc, {
                        type: 'bar',
                        data: {
                            labels: levels,
                            datasets: [
                                OverallCityCS2014Dataset,
                                OutputsCityCS2014Dataset,
                                ImpactCityCS2014Dataset,
                                EnvironmentCityCS2014Dataset
                            ]
                        },
                        options: options
                    });

                    var citycso = document.getElementById("city-cs-overall-2014").getContext('2d');
                    this.chartcso = new Chart(citycso, {
                        type: 'bar',
                        data: {
                            labels: levels,
                            datasets: [
                                OverallCityCS2014Dataset
                            ]
                        },
                        options: options
                    });

                    var citycsop = document.getElementById("city-cs-outputs-2014").getContext('2d');
                    this.chartcsop = new Chart(citycsop, {
                        type: 'bar',
                        data: {
                            labels: levels,
                            datasets: [
                                OutputsCityCS2014Dataset
                            ]
                        },
                        options: options
                    });

                    var citycsi = document.getElementById("city-cs-impact-2014").getContext('2d');
                    this.chartcsi = new Chart(citycsi, {
                        type: 'bar',
                        data: {
                            labels: levels,
                            datasets: [
                                ImpactCityCS2014Dataset
                            ]
                        },
                        options: options
                    });

                    var citycse = document.getElementById("city-cs-environment-2014").getContext('2d');
                    this.chartcse = new Chart(citycse, {
                        type: 'bar',
                        data: {
                            labels: levels,
                            datasets: [
                                EnvironmentCityCS2014Dataset
                            ]
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