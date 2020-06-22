AOS.init();

$(function() { // Shorthand for $( document ).ready()
    $('.dropdown-trigger').dropdown({
        hover: true
    });
    $('.tabs').tabs();
    $('.sidenav').sidenav()
});

var app_id = "appVrmQAGy96E1jEP";
var app_key = "keyC83ksN49wS10kX";

new Vue({
    el: '#footer'
});

new Vue({
    el: '#header'
})

var app = new Vue({
    el: '#app',
    data: {
        items: []
    },
    mounted: function() {
        this.loadItems();
    },
    methods: {
        loadItems: function() {
            let projectsURL = "https://api.airtable.com/v0/" + app_id + "/projects?filterByFormula=NOT%28%7Bresearch-theme%7D%20%3D%20%27%27%29";
            let pubsURL = "https://api.airtable.com/v0/" + app_id + "/select-pubs?sort%5B0%5D%5Bfield%5D=year";
            var self = this;
            self.items = [];
            self.pubs = [];
            axios.all([
                axios.get(projectsURL, {
                    headers: {
                        Authorization: "Bearer " + app_key
                    }
                }),
                axios.get(pubsURL, {
                    headers: {
                        Authorization: "Bearer " + app_key
                    }
                })
            ]).then(function(response) {
                self.items = response[0].data.records;
                self.pubs = response[1].data.records;
            }).catch(function(error) {
                console.log(error)
            })
        }
    }
})