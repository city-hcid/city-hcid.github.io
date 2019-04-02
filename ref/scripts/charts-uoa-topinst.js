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
            var self = this;
            this.items = [];
            axios.get(
                    "https://api.airtable.com/v0/" + app_id + "/results?filterByFormula=(FIND(%22" + instTop + "%22%2C%7Binst%7D))", {
                        headers: {
                            Authorization: "Bearer " + app_key
                        }
                    }
                )
                .then(function(response) {
                    self.items = response.data.records;
                    topItem = self.items;
                    console.log(self.items);
                    console.log(topItem)
                })
                .catch(function(error) {
                    console.log(error)
                })
                .finally(() => (this.loading = false));
        }
    }
})