var app = new Vue({
    el: '#app',
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
                        eval('var ' + obj[i].fields['Profile'] + obj[i].fields['code'] + 'Dataset  = { data: ' + obj[i].fields['Profile'] + obj[i].fields['code'] + ',' + 'backgroundColor: col_array, borderColor: col_array, borderWidth: 1 }');
                    }

                    var citycso = document.getElementById("city-cs-overall-2014");
                    this.chartcso = new Chart(citycso, {
                        type: 'polarArea',
                        data: {
                            labels: levels,
                            datasets: [
                                OverallCityCS2014Dataset
                            ]
                        },
                        options: polarOptionsA
                    });

                    var citygeo = document.getElementById("city-geneng-overall-2014");
                    this.chartgeo = new Chart(citygeo, {
                        type: 'polarArea',
                        data: {
                            labels: levels,
                            datasets: [
                                OverallCityGenEng2014Dataset
                            ]
                        },
                        options: polarOptionsA
                    });

                    var citysoco = document.getElementById("city-soc-overall-2014");
                    this.chartsoc = new Chart(citysoco, {
                        type: 'polarArea',
                        data: {
                            labels: levels,
                            datasets: [
                                OverallCitySoc2014Dataset
                            ]
                        },
                        options: polarOptionsA
                    });
                })
                .catch(function(error) {
                    console.log(error)
                })
                .finally(() => (this.loading = false));
        }
    }

})