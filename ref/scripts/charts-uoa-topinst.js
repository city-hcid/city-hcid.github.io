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
                    topItem = self.items;
                    console.log(self.items);
                    console.log(topItem[0])
                })
                .catch(function(error) {
                    console.log(error)
                })
                .finally(() => (this.loading = false));
        }
    }
})