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

var app = new Vue({
    el: '#app-all',
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
                "https://api.airtable.com/v0/" + app_id + "/members?filterByFormula=OR((FIND(%22phd%22%2C%7Bstatus%7D))%2C(FIND(%22staff%22%2C%7Bstatus%7D))%2C(FIND(%22research%22%2C%7Bstatus%7D)))&sort%5B0%5D%5Bfield%5D=last-name&sort%5B0%5D%5Bdirection%5D=asc", {
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
});
var app = new Vue({
    el: '#app-phds',
    data: {
        items: []
    },
    mounted: function() {
        this.loadItems();
    },
    methods: {
        loadItems: function() {
            var self = this
            this.items = []
            axios.get(
                "https://api.airtable.com/v0/" + app_id + "/members?filterByFormula=(FIND(%22phd%22%2C%7Bstatus%7D))&sort%5B0%5D%5Bfield%5D=last-name&sort%5B0%5D%5Bdirection%5D=asc", {
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
});
var app = new Vue({
    el: '#app-researchers',
    data: {
        items: []
    },
    mounted: function() {
        this.loadItems();
    },
    methods: {
        loadItems: function() {
            var self = this
            this.items = []
            axios.get(
                "https://api.airtable.com/v0/" + app_id + "/members?filterByFormula=(FIND(%22research%22%2C%7Bstatus%7D))&sort%5B0%5D%5Bfield%5D=last-name&sort%5B0%5D%5Bdirection%5D=asc", {
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
});
var app = new Vue({
    el: '#app-staff',
    data: {
        items: []
    },
    mounted: function() {
        this.loadItems();
    },
    methods: {
        loadItems: function() {
            var self = this
            this.items = []
            axios.get(
                "https://api.airtable.com/v0/" + app_id + "/members?filterByFormula=(FIND(%22staff%22%2C%7Bstatus%7D))&sort%5B0%5D%5Bfield%5D=last-name&sort%5B0%5D%5Bdirection%5D=asc", {
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
});
var app = new Vue({
    el: '#app-alum',
    data: {
        items: []
    },
    mounted: function() {
        this.loadItems();
    },
    methods: {
        loadItems: function() {
            var self = this
            this.items = []
            axios.get(
                "https://api.airtable.com/v0/" + app_id + "/members?filterByFormula=OR((FIND(%22alum%22%2C%7Bstatus%7D))%2C(FIND(%22visitor%22%2C%7Bstatus%7D)))&sort%5B0%5D%5Bfield%5D=last-name&sort%5B0%5D%5Bdirection%5D=asc", {
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