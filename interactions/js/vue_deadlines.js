var app_id = "appgcGlPwTaZaBImL";
var app_key = "key8l5YZtQ9FyUoxF";
new Vue({
    el: '#footer'
});
new Vue({
    el: '#header'
})
var appForum = new Vue({
    el: '#app-forum',
    data: {
        items: [],
        issues: [],
        isHovered: false
    },
    mounted: function() {
        this.loadItems();
    },
    methods: {
        loadItems: function() {
            let editors_url = "https://api.airtable.com/v0/" + app_id + "/Editors%20%26%20Authors?view=forum_editors&fields%5B%5D=Name&fields%5B%5D=First%20Name&fields%5B%5D=Regular%20content%20name&fields%5B%5D=ID&fields%5B%5D=regular-content-name";
            let issues_url = "https://api.airtable.com/v0/" + app_id + "/Issues?view=Upcoming&fields%5B%5D=months&fields%5B%5D=year&fields%5B%5D=dialogue&fields%5B%5D=view-id&fields%5B%5D=Forum%20editors&fields%5B%5D=reg-deadline";
            let self = this;
            axios.all([
                axios.get(editors_url, {
                    headers: {
                        Authorization: "Bearer " + app_key
                    }
                }),
                axios.get(issues_url, {
                    headers: {
                        Authorization: "Bearer " + app_key
                    }
                })
            ]).then(function(response) {
                self.items = response[0].data.records;
                self.issues = response[1].data.records;
            }).catch(function(error) {
                console.log(error);
            })
        },
        handleHover(hovered) {
            this.isHovered = hovered
        }
    }
});

var appColumnists = new Vue({
    el: '#appColumnists',
    data: {
        items: [],
        issues: [],
        isHovered: false
    },
    mounted: function() {
        this.loadItems();
    },
    methods: {
        loadItems: function() {
            let columnists_url = "https://api.airtable.com/v0/" + app_id + "/Editors%20%26%20Authors?view=columnists&fields%5B%5D=Name&fields%5B%5D=First%20Name&fields%5B%5D=Regular%20content%20name&fields%5B%5D=ID&fields%5B%5D=regular-content-name";
            let issues_url = "https://api.airtable.com/v0/" + app_id + "/Issues?view=Upcoming&fields%5B%5D=months&fields%5B%5D=year&fields%5B%5D=dialogue&fields%5B%5D=view-id&fields%5B%5D=Columnists&fields%5B%5D=reg-deadline";
            let self = this;
            axios.all([
                axios.get(columnists_url, {
                    headers: {
                        Authorization: "Bearer " + app_key
                    }
                }),
                axios.get(issues_url, {
                    headers: {
                        Authorization: "Bearer " + app_key
                    }
                })
            ]).then(function(response) {
                self.items = response[0].data.records;
                self.issues = response[1].data.records;
            }).catch(function(error) {
                console.log(error);
            })
        },
        handleHover(hovered) {
            this.isHovered = hovered
        }
    }
})