var topItem = [];
var app = new Vue({
    el: '#app-topInst',
    data: {
        items: []
    },
    mounted: function() {
        this.loadItems();
    },
    methods: {
        loadItems: function() {
            var url_string = window.location.href;
            var url = new URL(url_string);
            var instTop = url.searchParams.get("inst");
            if (instTop == null) {
                instTop = "City";
            }
            var self = this;
            this.items = [];
            axios.get(
                    "https://api.airtable.com/v0/" + app_id + "/results?filterByFormula=IF(inst%3D%22" + instTop + "%22%2C1%2C0)&view=uoa-cs", {
                        headers: {
                            Authorization: "Bearer " + app_key
                        }
                    }
                )
                .then(function(response) {
                    self.items = response.data.records;
                    obj = response.data.records;
                    var h = document.getElementById("top-inst-data");

                    //topItem = self.items;

                    for (i in obj) {
                        //Set data for each entry
                        eval(obj[i].fields['Profile'] + obj[i].fields['code'] + ' = ' + obj[i].fields['array'] + ";");
                        //Set chart dataset for each entry
                        eval('var ' + obj[i].fields['Profile'] + obj[i].fields['code'] + 'Dataset  = { data: ' + obj[i].fields['Profile'] + obj[i].fields['code'] + ',' + 'backgroundColor: backgroundColor' + obj[i].fields['Profile'] + ', borderColor: col_array, borderWidth: 1 }');
                        console.log(obj[i].fields['inst'] + " " + obj[i].fields['Profile'])
                        var b = obj[i].fields['inst'] + obj[i].fields['uoa'] + obj[i].fields['Profile'] + '_' + obj[i].fields['year'];
                        var c = obj[i].fields['Profile'] + obj[i].fields['code'] + 'Dataset';
                        var k = document.getElementById(obj[i].fields['inst']);
                        console.log(obj[i].fields['inst'])
                    }



                    console.log(self.items);
                })
                .catch(function(error) {
                    console.log(error)
                })
                .finally(() => (this.loading = false));
        }
    }
})