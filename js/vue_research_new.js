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
        items: [],
        pubs: []
    },
    mounted: function() {
        this.loadItems();
    },
    methods: {
        loadItems: function() {
            let url = '';
            if (location.hostname === "localhost" || location.hostname === "happy-galileo-a42c9d.netlify.app") {
                url = '../.netlify/functions/hcidFn/hcidFn.js'
            } else {
                url = 'https://happy-galileo-a42c9d.netlify.app/.netlify/functions/hcidFn/hcidFn.js'
            };
            var self = this;
            self.items = [];
            self.pubs = [];
            axios.all([
                axios.get(url, {
                    params: {
                        table: encodeURI('projects'),
                        view: encodeURI('live'),
                        fields: encodeURI('project-name,project-url,research-theme'),
                        sort: encodeURI('{"field":"project-name","direction":"asc"}')
                    }
                }),
                axios.get(url, {
                    params: {
                        table: encodeURI('publications'),
                        view: encodeURI('selected'),
                        fields: encodeURI('title,author,authors,doi,year,journal-conference,type,theme'),
                        sort: encodeURI('{"field":"year","direction":"asc"}')
                    }
                })
            ]).then(function(response) {
                self.items = response[0].data;
                self.pubs = response[1].data
            }).catch(function(error) {
                console.log(error)
            })
        }
    }
})

Vue.component('template-listing', function(resolve, reject) {
    setTimeout(function() {
        resolve({
            props: ['item', 'theme'],
            template: `<span v-if="item['research-theme'].includes(theme)"><a href="item['project-url']" target="_blank">{{ item['project-name'] }}</a>, </span>`
        })
    }, 200)
})

Vue.component('template-publication', function(resolve, reject) {
    setTimeout(function() {
        resolve({
            props: ['pub', 'theme'],
            template: `<span v-if="pub['theme'].includes(theme)"><a :href="'http://dx.doi.org/' + pub['doi']" target="_new">{{ pub['title'] }} ({{ pub['year'] }})<br></a></span>`
        })
    }, 300)
})