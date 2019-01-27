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
                    // https://api.airtable.com/v0/appYnSjlUbAA4VSHc/results?api_key=keyC83ksN49wS10kX&view=Grid%20view&filterByFormula=IF(AND(%7Binst%7D+%3D+%22City%22%2C+%7Buoa%7D+%3D+%22CS%22)%2C+%22true%22%2C+%22%22)
                    "https://api.airtable.com/v0/" + app_id + "/results?view=city-uoa-cs&filterByFormula=IF(AND(%7Binst%7D+%3D+%22City%22%2C+%7Buoa%7D+%3D+%22CS%22)%2C+%22true%22%2C+%22%22)", {
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

                    // combined, overall, outputs, impact, environment
                    //var levels_abrev = [c, o, op, i, e];

                    var citycsc = document.getElementById("cityCSCombined_2014");
                    this.cityCSCombined_2014 = new Chart(citycsc, {
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

                    var citycso = document.getElementById("cityCsOverall_2014").getContext('2d');
                    this.cityCsOverall_2014 = new Chart(citycso, {
                        type: 'bar',
                        data: {
                            labels: levels,
                            datasets: [
                                OverallCityCS2014Dataset
                            ]
                        },
                        options: options
                    });

                    var citycsop = document.getElementById("cityCsOutputs_2014").getContext('2d');
                    this.cityCsOutputs_2014 = new Chart(citycsop, {
                        type: 'bar',
                        data: {
                            labels: levels,
                            datasets: [
                                OutputsCityCS2014Dataset
                            ]
                        },
                        options: options
                    });

                    var citycsi = document.getElementById("cityCsImpact_2014").getContext('2d');
                    this.cityCsImpact_2014 = new Chart(citycsi, {
                        type: 'bar',
                        data: {
                            labels: levels,
                            datasets: [
                                ImpactCityCS2014Dataset
                            ]
                        },
                        options: options
                    });

                    var citycse = document.getElementById("cityCsEnvironment_2014").getContext('2d');
                    this.cityCsEnvironment_2014 = new Chart(citycse, {
                        type: 'bar',
                        data: {
                            labels: levels,
                            datasets: [
                                EnvironmentCityCS2014Dataset
                            ]
                        },
                        options: options
                    });

                    var citycso_p = document.getElementById("cityCsOverall_p_2014").getContext('2d');
                    this.cityCsOverall_p_2014 = new Chart(citycso_p, {
                        type: 'polarArea',
                        data: {
                            labels: levels,
                            datasets: [
                                OverallCityCS2014Dataset
                            ]
                        },
                        options: polarOptionsB
                    });

                    var citycsop_p = document.getElementById("cityCsOutputs_p_2014").getContext('2d');
                    this.cityCsOutputs_p_2014 = new Chart(citycsop_p, {
                        type: 'polarArea',
                        data: {
                            labels: levels,
                            datasets: [
                                OutputsCityCS2014Dataset
                            ]
                        },
                        options: polarOptionsB
                    });

                    var citycsi_p = document.getElementById("cityCsImpact_p_2014").getContext('2d');
                    this.cityCsImpact_p_2014 = new Chart(citycsi_p, {
                        type: 'polarArea',
                        data: {
                            labels: levels,
                            datasets: [
                                ImpactCityCS2014Dataset
                            ]
                        },
                        options: polarOptionsB
                    });

                    var citycse_p = document.getElementById("cityCsEnvironment_p_2014").getContext('2d');
                    this.cityCsEnvironment_p_2014 = new Chart(citycse_p, {
                        type: 'polarArea',
                        data: {
                            labels: levels,
                            datasets: [
                                EnvironmentCityCS2014Dataset
                            ]
                        },
                        options: polarOptionsB
                    });
                })
                .catch(function(error) {
                    console.log(error)
                })
                .finally(() => (this.loading = false));
        }
    }

})