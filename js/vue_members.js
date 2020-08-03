AOS.init();

$(function() { // Shorthand for $( document ).ready()
    $('.dropdown-trigger').dropdown({
        hover: true
    });
    $('.tabs').tabs();
    $('.sidenav').sidenav()
})

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
            let self = this;
            this.items = [];
            let url = '';
            if (location.hostname === "localhost" || location.hostname === "127.0.0.1" || location.hostname === "happy-galileo-a42c9d.netlify.app") {
                url = '../.netlify/functions/hcidFn/hcidFn.js'
            } else {
                url = 'https://happy-galileo-a42c9d.netlify.app/.netlify/functions/hcidFn/hcidFn.js'
            };
            axios.get(url, {
                params: {
                    table: encodeURI('members'),
                    view: encodeURI('Grid view'),
                    fields: encodeURI('name,first-name,last-name,status,bio-url,photo-url,post,short-bio'),
                    sort: encodeURI('{"field":"last-name","direction":"asc"}')
                }
            }).then(function(response) {
                self.items = response.data
            }).catch(function(error) {
                console.log(error)
            })
        }
    }
})

Vue.component('template-members', function(resolve, reject) {
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
    }, 10)
})

Vue.component('template-staff', function(resolve, reject) {
    setTimeout(function() {
        resolve({
            props: ['item'],
            template: `
            <div class="col s12 m10 mb-5">
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
            `
        })
    }, 600)
})

Vue.component('template-alum', function(resolve, reject) {
    setTimeout(function() {
        resolve({
            props: ['item', 'post'],
            template: `
            <p class="mt-0" v-if="item['post'] === post">
                <span v-if="item['bio-url']">
                    <a class="link" v-bind:href="item['bio-url']">
                        {{ item['name'] }}
                    </a>
                </span>
                <span v-else>
                    {{ item['name'] }}
                </span>
            </p>
            `
        })
    }, 1000)
})