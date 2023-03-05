AOS.init();

$(function() {
    $('.dropdown-trigger').dropdown({
        hover: true
    });
    $('.tabs').tabs();
    $('.sidenav').sidenav()
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
            var url_string = window.location.href;
            var url = new URL(url_string);
            var name = url.searchParams.get("name");
            var self = this;
            this.items = [];
            axios.get(
                "https://api.airtable.com/v0/" + app_id + "/projects?filterByFormula=(FIND(%22" + name + "%22%2C%7Bproject-name%7D))", {
                    headers: {
                        Authorization: "Bearer " + app_key
                    }
                }
            ).then(function(response) {
                self.items = response.data.records;
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
                <span v-if="item['long-name']" class="lbr">{{ item['long-name'] }}</span>
                <p>
                    <strong>About: </strong>
                    <span v-if="item['about']" class="lbr grey-text text-darken-2">{{ item['about'] }}</span>
                </p>
                <p class="pb-5">
                    <strong>Project members: </strong>
                    <span v-if="item['lead']" class="lbr grey-text text-darken-2"><a v-bind:href="item['lead-url']">{{ item['lead-str'] }}</a> (lead)</span>
                    <span v-if="item['members']" class="lbr grey-text text-darken-2">, {{ item['members-str'] }}</span>
                    <span v-if="item['collaborators']" class="lbr grey-text text-darken-2">, {{ item['collaborators'] }}</span>
                </p>
            </div>
        </div>
    `
})