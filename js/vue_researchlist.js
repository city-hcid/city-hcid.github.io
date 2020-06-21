Vue.component('template-listing', {
    props: ['theme', 'item', 'name', 'url'],
    template: `<span v-if="item.includes(theme)"><a v-bind:href="url" target="_blank">{{ name }}</a>, </span>`
})