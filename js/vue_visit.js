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
            let url = '';
            if (location.hostname === "localhost" || location.hostname === "127.0.0.1" || location.hostname === "happy-galileo-a42c9d.netlify.app") {
                url = '/.netlify/functions/hcidFn/hcidFn.js'
            } else {
                url = 'https://happy-galileo-a42c9d.netlify.app/.netlify/functions/hcidFn/hcidFn.js'
            };
            axios.get(url, {
                params: {
                    table: encodeURI('accomodation'),
                    view: encodeURI('short-list'),
                    fields: encodeURI('Name,Note,url'),
                    sort: encodeURI('{"field":"Name","direction":"asc"}')
                }
            }).then(function(response) {
                self.items = response.data
            }).catch(function(error) {
                console.log(error)
            })
        }
    }
})