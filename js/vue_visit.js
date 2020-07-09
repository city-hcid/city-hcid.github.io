AOS.init();

$(function() { // Shorthand for $( document ).ready()
    $('.dropdown-trigger').dropdown({
        hover: true
    });
    $('.sidenav').sidenav()
})

var app = new Vue({
    el: '#app',
    data: {
        items: []
    },
    mounted: function() {
        this.loadItems()
    },
    methods: {
        loadItems: function() {
            var self = this;
            this.items = [];
            axios.get(
                "https://api.airtable.com/v0/" + app_id + "/accomodation?sortField=Name&sortDirection=asc", {
                    headers: {
                        Authorization: "Bearer " + app_key
                    }
                }
            ).then(function(response) {
                self.items = response.data.records
            }).catch(function(error) {
                console.log(error)
            })
        }
    }
})