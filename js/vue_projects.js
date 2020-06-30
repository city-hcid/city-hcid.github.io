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
    el: '#app',
    data: {
        liveItems: [],
        archiveItems: []
    },
    mounted: function() {
        this.loadItems();
    },
    methods: {
        loadItems: function() {
            let liveProjectsURL = "https://api.airtable.com/v0/" + app_id + "/projects?view=live&sortField=project-name&sortDirection=asc";
            let archiveProjectsURL = "https://api.airtable.com/v0/" + app_id + "/projects?view=archive&sortField=project-name&sortDirection=asc";
            var self = this;
            self.liveItems = [];
            self.archiveItems = [];
            axios.all([
                axios.get(liveProjectsURL, {
                    headers: {
                        Authorization: "Bearer " + app_key
                    }
                }),
                axios.get(archiveProjectsURL, {
                    headers: {
                        Authorization: "Bearer " + app_key
                    }
                })
            ]).then(function(response) {
                self.liveItems = response[0].data.records;
                self.archiveItems = response[1].data.records;
            }).catch(function(error) {
                console.log(error)
            })
        }
    }
})

Vue.component('template-project', {
    props: ['item'],
    template: `
        <div v-bind:id="item['project-name']" v-if="item['project-name']" class="my-5">
            <a v-if="item['image-url']" v-bind:href="item['project-url']"><img class="responsive-img" v-bind:src="item['image-url']" v-bind:alt="item['project-name'] + ' icon'" style="max-height:8rem" /></a>
            <div>
                <h1 v-if="item['image-url'] == null" class="bold mb-1">
                    <span v-if="item['project-url']"><a v-bind:href="item['project-url']" class="black-text">{{ item['project-name'] }}</a></span>
                    <span v-else><a v-bind:href="'/centre/project?name=' + item['project-name']" class="black-text">{{ item['project-name'] }}</a></span>
                </h1>
                <span v-if="item['long-name']">
                        {{ item['long-name'] }}
                </span>
                <p>
                    <strong>About: </strong>
                    <span v-if="item['about']" class="lbr grey-text text-darken-2">{{ item['about'] }}</span>
                </p>
                <p class="pb-5">
                    <strong>Project members: </strong>
                    <span v-if="item['lead']" class="lbr grey-text text-darken-2"><a v-bind:href="item['lead-url']">{{ item['lead-str'] }}</a> (lead)</span><span v-if="item['members']" class="lbr grey-text text-darken-2">, {{ item['members-str'] }}</span>
                </p>
            </div>
        </div>
    `
})