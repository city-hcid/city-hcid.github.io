var app = new Vue({
    el: '#app-inst',
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
                    "https://api.airtable.com/v0/" + app_id + "/institutions?&view=" + uoa + "&sort%5B0%5D%5Bfield%5D=institution&sort%5B0%5D%5Bdirection%5D=asc", {
                        headers: {
                            Authorization: "Bearer " + app_key
                        }
                    }
                )
                .then(function(response) {
                    self.items = response.data.records;
                })
                .catch(function(error) {
                    console.log(error)
                })
                .finally(() => (this.loading = false));
        }
    }
})