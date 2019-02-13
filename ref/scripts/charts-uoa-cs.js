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
            var app_id = "appunQ0V4X7SQIIk7"; //"appYnSjlUbAA4VSHc";
            var app_key = "keyC83ksN49wS10kX";
            "keyC83ksN49wS10kX";
            this.items = [];
            axios.get(
                    //https://api.airtable.com/v0/appYnSjlUbAA4VSHc/results?api_key=keyC83ksN49wS10kX&filterByFormula=IF(%7Buoa%7D+%3D+%22CS%22%2C+%22true%22%2C+%22%22)&view=uoa-cs
                    "https://api.airtable.com/v0/" + app_id + "/results?fields%5B%5D=profileCode&fields%5B%5D=inst-full&fields%5B%5D=4*&fields%5B%5D=3*&fields%5B%5D=2*&fields%5B%5D=1*&fields%5B%5D=N%2FC&fields%5B%5D=staff-a&fields%5B%5D=array&fields%5B%5D=code&fields%5B%5D=inst&fields%5B%5D=uoa&fields%5B%5D=year&fields%5B%5D=Profile&view=uoa-cs", {
                        headers: {
                            Authorization: "Bearer " + app_key
                        }
                    }
                )
                .then(function(response) {
                    var i = "";
                    var j = "";
                    var a = "";
                    var b = "";
                    var c = "";
                    var h = document.getElementById("cs-data");

                    self.items = response.data.records;
                    obj = response.data.records;

                    for (i in obj) {
                        //Set data for each entry
                        eval(obj[i].fields['Profile'] + obj[i].fields['code'] + ' = ' + obj[i].fields['array'] + ";");
                        //Set chart dataset for each entry
                        eval('var ' + obj[i].fields['Profile'] + obj[i].fields['code'] + 'Dataset  = { data: ' + obj[i].fields['Profile'] + obj[i].fields['code'] + ',' + 'backgroundColor: backgroundColor' + obj[i].fields['Profile'] + ', borderColor: col_array, borderWidth: 1 }');
                    }

                    for (j in obj) {
                        b = obj[j].fields['inst'] + obj[j].fields['uoa'] + obj[j].fields['Profile'] + '_' + obj[j].fields['year'];
                        c = obj[j].fields['Profile'] + obj[j].fields['code'] + 'Dataset';

                        var k = document.getElementById(obj[j].fields['inst']);
                        if (k === null) {
                            h.insertAdjacentHTML("beforeend",
                                '<div class="columns is-centered mt-4" id="' + obj[j].fields['inst'] + '">\n' +

                                '<div class="column is-1 mb-1" id="' + obj[j].fields['inst'] + '-title">\n' +
                                '<div class="rotate">\n' +
                                '<h1 class="has-text-grey-dark has-text-weight-semibold is-size-6">' + obj[j].fields['inst'] + '</h1>\n' +
                                '</div>\n' +
                                '</div>\n' +

                                '<div class="column is-2">\n' +
                                '<canvas id="' + obj[j].fields['inst'] + obj[j].fields['uoa'] + 'Overall_2014" width="200 " height="200 "></canvas>\n' +
                                '</div>\n' +

                                '<div class="column is-2">\n' +
                                '<canvas id="' + obj[j].fields['inst'] + obj[j].fields['uoa'] + 'Outputs_2014" width="200" height="200"></canvas>\n' +
                                '</div>\n' +

                                '<div class="column is-2">\n' +
                                '<canvas id="' + obj[j].fields['inst'] + obj[j].fields['uoa'] + 'Impact_2014" width="200" height="200"></canvas>\n' +
                                '</div>\n' +

                                '<div class="column is-2">\n' +
                                '<canvas id="' + obj[j].fields['inst'] + obj[j].fields['uoa'] + 'Environment_2014" width="200" height="200"></canvas>\n' +
                                '</div>\n' +

                                '<div class="column is-1 is-offset-1 is-centered my-auto" id="' + obj[j].fields['inst'] + '-staff"></div>\n' +

                                '</div>\n');
                        }

                        var t = document.getElementById(obj[j].fields['inst'] + '-staff');
                        if (t !== null) {
                            document.getElementById(obj[j].fields['inst'] + '-staff').innerHTML = '<h1 class="is-size-3 has-text-grey-dark has-text-weight-semibold has-text-left">' + obj[j].fields['staff-a'] + '</h1>';
                        }

                        a = document.getElementById(b);
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
                })
                .catch(function(error) {
                    console.log(error)
                })
                .finally(() => (this.loading = false));
        }
    }
})