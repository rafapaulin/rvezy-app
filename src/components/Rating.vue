<template>
    <div class="rating">
        <span v-if="name">{{ name }}: </span>
        <ul>
            <li v-for="index in rating" :key="index">
                <i class="fa-solid fa-star"></i>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    name: 'Rating',
    props: {
        rating: {
            type: Number,
            required: true
        },
        name: {
            type: String,
        }
    }
}
</script>
<style lang="sass" scoped>
.rating
    display: flex
    align-items: center
    font-size: 18px
    span
        font-weight: bold
        text-transform: Capitalize
    ul
        align-items: center
        list-style: none
        display: inline-flex
        margin: 0
        padding: 0 0 0 5px
        color: #FFB302
        li
            padding: 0 2px
</style>
