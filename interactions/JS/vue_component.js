Vue.component('table-head', {
    props: ['issue', 'deadline', 'debate'],
    template: '<span>{{ issue }}<br>{{ deadline }}<br>{{ debate }}</span>'
})

Vue.component('author-details', {
    props: ['name', 'content'],
    template: `<div class="my-2">
    <span class="font-weight-normal my-1">{{ name }}</span>
    <br>
    <span class="font-weight-light small">{{ content }}</span>
    </div>`
})

Vue.component('author-deadlines', {
    props: ['months', 'content', 'deadline'],
    template: `<a data-toggle="popover" v-on:mouseover="popOver" data-placement="top" data-trigger="hover" title="{{ months }} + ' Issue'" data-content="{{content}} + ' due ' + {{deadline}}">
    <span class="oi oi-check" aria-hidden="true"></span>
</a>`
})