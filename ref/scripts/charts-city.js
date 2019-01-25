var inst = 'City';
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
                    "https://api.airtable.com/v0/" + app_id + "/results?view=Grid%20view&filterByFormula=(FIND(%22" + inst + "%22%2C%7Binst%7D))", {
                        headers: {
                            Authorization: "Bearer " + app_key
                        }
                    }
                )
                .then(function(response) {
                    var i = "";
                    var a = "";
                    var b = "";
                    var c = "";

                    this.message = "combined";
                    self.items = response.data.records;
                    obj = response.data.records;
                    for (i in obj) {
                        //Set data for each entry
                        eval(obj[i].fields['Profile'] + obj[i].fields['code'] + ' = ' + obj[i].fields['array'] + ";");
                        //Set chart dataset for each entry
                        eval('var ' + obj[i].fields['Profile'] + obj[i].fields['code'] + 'Dataset  = { data: ' + obj[i].fields['Profile'] + obj[i].fields['code'] + ',' + 'backgroundColor: col_array, borderColor: col_array, borderWidth: 1 }');
                    }

                    for (j in obj) {
                        a = obj[j].fields['uoa'] + obj[j].fields['Profile'];
                        b = obj[j].fields['inst'] + obj[j].fields['uoa'] + obj[j].fields['Profile'] + '_' + obj[j].fields['year'];
                        c = obj[j].fields['Profile'] + obj[j].fields['code'] + 'Dataset';
                        console.log(a);
                        console.log(b);
                        console.log(c);

                        a = document.getElementById(b);
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



                    var citygeo = document.getElementById("CityGenEngOverall_2014");
                    this.CityGenEngOverall_2014 = new Chart(citygeo, {
                        type: 'polarArea',
                        data: {
                            labels: levels,
                            datasets: [
                                OverallCityGenEng2014Dataset
                            ]
                        },
                        options: polarOptionsC
                    });

                    var citysoco = document.getElementById("CitySocOverall_2014");
                    this.CitySocOverall_2014 = new Chart(citysoco, {
                        type: 'polarArea',
                        data: {
                            labels: levels,
                            datasets: [
                                OverallCitySoc2014Dataset
                            ]
                        },
                        options: polarOptionsC
                    });
                })
                .catch(function(error) {
                    console.log(error)
                })
                .finally(() => (this.loading = false));
        }
    }

})