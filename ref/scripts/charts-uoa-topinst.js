var topItem = [];
var appTop = new Vue({
    el: '#app-topInst',
    data: {
        items: []
    },
    mounted: function() {
        this.loadItems();
    },
    methods: {
        loadItems: function() {
            var self = this;
            this.items = [];
            axios.get(
                    "https://api.airtable.com/v0/" + app_id + "/results?filterByFormula=IF(inst%3D%22" + instTop + "%22%2C1%2C0)&view=uoa-" + uoa, {
                        headers: {
                            Authorization: "Bearer " + app_key
                        }
                    }
                )
                .then(function(response) {
                    self.items = response.data.records;
                    obj = response.data.records;
                    var h = document.getElementById("top-inst-data");

                    for (i in obj) {
                        //Set data for each entry
                        eval(obj[i].fields['Profile'] + obj[i].fields['code'] + ' = ' + obj[i].fields['array'] + ";");
                        //Set chart dataset for each entry
                        eval('var ' + obj[i].fields['Profile'] + obj[i].fields['code'] + 'Dataset  = { data: ' + obj[i].fields['Profile'] + obj[i].fields['code'] + ',' + 'backgroundColor: backgroundColor' + obj[i].fields['Profile'] + ', borderColor: col_array, borderWidth: 1 }');
                        console.log(obj[i].fields['inst'] + " " + obj[i].fields['Profile'])
                        var b = obj[i].fields['inst'] + obj[i].fields['uoa'] + obj[i].fields['Profile'] + '_' + obj[i].fields['year'];
                        var c = obj[i].fields['Profile'] + obj[i].fields['code'] + 'Dataset';
                        var k = document.getElementById(obj[i].fields['inst']);

                        if (k === null) {
                            h.insertAdjacentHTML("beforeend",
                                '<div class="columns is-centered mt-4" id="' + obj[i].fields['inst'] + '">\n' +

                                '<div class="column is-1 mb-1" id="' + obj[i].fields['inst'] + '-title">\n' +
                                '<div>\n' +
                                '<h1 class="has-text-grey-dark has-text-weight-semibold is-size-7"><a href="' + obj[i].fields['ref-cs-url'] + '" target="_blank">' + obj[i].fields['inst-full'] + '</a></h1>\n' +
                                '</div>\n' +
                                '</div>\n' +

                                '<div class="column is-2">\n' +
                                '<canvas id="' + obj[i].fields['inst'] + obj[i].fields['uoa'] + 'Overall_2014" width="200 " height="200 "></canvas>\n' +
                                '</div>\n' +

                                '<div class="column is-2">\n' +
                                '<canvas id="' + obj[i].fields['inst'] + obj[i].fields['uoa'] + 'Outputs_2014" width="200" height="200"></canvas>\n' +
                                '</div>\n' +

                                '<div class="column is-2">\n' +
                                '<canvas id="' + obj[i].fields['inst'] + obj[i].fields['uoa'] + 'Impact_2014" width="200" height="200"></canvas>\n' +
                                '</div>\n' +

                                '<div class="column is-2">\n' +
                                '<canvas id="' + obj[i].fields['inst'] + obj[i].fields['uoa'] + 'Environment_2014" width="200" height="200"></canvas>\n' +
                                '</div>\n' +

                                '<div class="column is-1 is-offset-1 is-centered my-auto is-size-5" id="' + obj[i].fields['inst'] + '-staff"><h1 class="is-size-3 has-text-grey-dark has-text-weight-semibold has-text-left">' + obj[i].fields['staff-a'] + '</h1></div>\n' +

                                '</div>\n');
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