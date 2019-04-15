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
            this.items = [];
            axios.get(
                    "https://api.airtable.com/v0/" + app_id + "/results?fields%5B%5D=profileCode&fields%5B%5D=inst-full&fields%5B%5D=4*&fields%5B%5D=3*&fields%5B%5D=2*&fields%5B%5D=1*&fields%5B%5D=N%2FC&fields%5B%5D=staff-a&fields%5B%5D=array&fields%5B%5D=code&fields%5B%5D=inst&fields%5B%5D=uoa&fields%5B%5D=year&fields%5B%5D=Profile&fields%5B%5D=ref-cs-url&view=uoa-" + uoa + "-shortlist", {
                        headers: {
                            Authorization: "Bearer " + app_key
                        }
                    }
                )
                .then(function(response) {
                    self.items = response.data.records;
                    obj = response.data.records;
                    var h = document.getElementById("inst-data");

                    for (i in obj) {
                        //Set data for each entry
                        eval(obj[i].fields['Profile'] + obj[i].fields['code'] + ' = ' + obj[i].fields['array'] + ";");
                        //Set chart dataset for each entry
                        eval('var ' + obj[i].fields['Profile'] + obj[i].fields['code'] + 'Dataset  = { data: ' + obj[i].fields['Profile'] + obj[i].fields['code'] + ',' + 'backgroundColor: backgroundColor' + obj[i].fields['Profile'] + ', borderColor: col_array, borderWidth: 1 }');
                        //console.log(obj[i].fields['inst'] + " " + obj[i].fields['Profile'])
                        var b = obj[i].fields['inst'] + obj[i].fields['uoa'] + obj[i].fields['Profile'] + '_' + obj[i].fields['year'];
                        var c = obj[i].fields['Profile'] + obj[i].fields['code'] + 'Dataset';
                        var k = document.getElementById(obj[i].fields['inst']);

                        if (k === null) {
                            h.insertAdjacentHTML("beforeend",
                                '<div class="columns is-centered mt-4" id="' + obj[i].fields['inst'] + '">\n' +

                                '<div class="column is-2 mb-1" id="' + obj[i].fields['inst'] + '-title">\n' +
                                '<div>\n' +
                                '<h1 class="has-text-grey-dark has-text-weight-semibold is-size-6"><a href="' + obj[i].fields['ref-cs-url'] + '" target="_blank">' + obj[i].fields['inst-full'] + '</a></h1>\n' +
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

                                '<div class="column is-1 is-centered my-auto is-size-5" id="' + obj[i].fields['inst'] + '-staff"><h1 class="is-size-6 has-text-grey-dark has-text-weight-bold has-text-right">' + obj[i].fields['staff-a'] + '</h1></div>\n' +

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