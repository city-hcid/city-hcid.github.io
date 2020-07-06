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
                "https://api.airtable.com/v0/" + app_id + "/members?sort%5B0%5D%5Bfield%5D=last-name&sort%5B0%5D%5Bdirection%5D=asc", {
                    headers: {
                        Authorization: "Bearer " + app_key
                    }
                }
            ).then(function(response) {
                self.items = response.data.records;
                console.log("test");
                console.log(self.items);
                console.log(self.items[14]['fields']['status'][0])
            }).catch(function(error) {
                console.log(error)
            })
        }
    }
})

Vue.component('template-phd', function(resolve, reject) {
    setTimeout(function() {
        resolve({
            props: ['item'],
            template: `
            <div class="col s5 m4 l3 center-align mb-4">
                <div v-if="item['photo-url']">
                    <img class="head-shot" v-bind:src="item['photo-url']" v-bind:alt="item['first-name'] + ' ' + item['last-name'] + ' photo'" height="120px" />
                </div>
                <div v-else>
                    <i class="large material-icons roundedElement">assignment_ind</i>
                </div>
                <div v-if="item['bio-url']">
                    <a v-bind:href="item['bio-url']">{{ item['first-name'] }}<br>{{ item['last-name'] }}</a>
                </div>
                <div v-else>
                    {{ item['first-name'] }}<br>{{ item['last-name'] }}
                </div>
            </div>
            `
        })
    }, 100)
})

Vue.component('template-current', function(resolve, reject) {
    setTimeout(function() {
        resolve({
            props: ['item', 'id'],
            template: `
            <div class="container" :id="id">
                <div class="row">
                    <div class="col s12">
                        <div class="col m3 hide-on-small-only">
                            <div class="right-align" v-if="item['photo-url']">
                                <img class="head-shot right-align" v-bind:src="item['photo-url']" v-bind:alt="item['name'] + ' photo'" height="120px" />
                            </div>
                            <div v-else>
                                <i class="large material-icons roundedElement">assignment_ind</i>
                            </div>
                        </div>
                        <div class="col s10 mb-2 pl-5 hide-on-med-and-up">
                            <div v-if="item['photo-url']">
                                <img class="head-shot right-align" v-bind:src="item['photo-url']" v-bind:alt="item['name'] + ' photo'" height="120px" />
                            </div>
                            <div v-else>
                                <i class="large material-icons roundedElement">assignment_ind</i>
                            </div>
                        </div>
                        <div class="col s12 m8 pl-5">
                            <p class="mt-0" v-if="item['bio-url']">
                                <strong><a class="reg link" v-bind:href="item['bio-url']">{{ item['name'] }}</a><span class="reg" v-if="item['post']">, {{ item['post'] }}</span></strong>
                                <br />
                                <span class="reg" v-else>
                                    <strong>{{ item['name'] }}</strong><span class="reg">, {{ item['post'] }}</span>
                                </span>
                                <span class="grey-text text-darken-3" v-if="item['short-bio']">
                                    {{ item['short-bio'] }}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            `
        })
    }, 100)
})

Vue.component('template-past', function(resolve, reject) {
    setTimeout(function() {
        resolve({
            props: ['item', 'id', 'post'],
            template: `
            <div class="container" :id="id" v-if="item['post'] === post">
                <div class="row">
                    <div class="col s8 offset-s4 mt-0">
                        <p>
                            <span v-if="item['bio-url']">
                                <a class="link" v-bind:href="item['bio-url']">
                                    {{ item['name'] }}
                                </a>
                            </span>
                            <span v-else>
                                {{ item['name'] }}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
            `
        })
    }, 600)
})