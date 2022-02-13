<template>
    <nav class="paginator-nav">
        <ul class="pagination">
            <li class="page-item" v-show="current !== 1" @click="changePage(1)">
                <a class="page-link" href="#">&lt;&lt;</a>
            </li>

            <li class="arrow" v-show="current !== 1" @click="changePage(current - 1 < 0 ? 0 : current - 1)">
                <a class="page-link" href="#">&lt;</a>
            </li>

            <li class="page-item" disabled v-show="filteredPages.includes(current - 2) && current - 2 > 1">
                <a class="page-link" disabled href="#">...</a>
            </li>

            <li
                :key="page"
                v-for="page in filteredPages"
                :class="{active: current === page}"
                @click="changePage(page)"
            >
                <a class="page-link" href="#">{{ page }}</a>
            </li>

            <li class="page-item" disabled v-show="filteredPages.includes(current + 2) && current + 2 < lastPage">
                <a class="page-link" disabled href="#">...</a>
            </li>

            <li class="page-item" v-show="current !== lastPage" @click="changePage(current + 1 > lastPage ? lastPage : current + 1)">
                <a class="page-link" href="#">&gt;</a>
            </li>

            <li class="page-item" v-show="current !== lastPage" @click="changePage(lastPage)">
                <a class="page-link" href="#">&gt;&gt;</a>
            </li>
        </ul>
    </nav>
</template>

<script>
export default {
    name: 'Paginator',
    props: {
        current: {
            type: Number,
            required: true,
        },
        total: {
            type: Number,
            required: true,
        },
        limit: {
            type: Number,
            required: true,
        },
    },
    computed: {
        filteredPages() {
            const pages = [];

            for (let pageNumber = 1; pageNumber <= this.lastPage; pageNumber++) {
                pages.push(pageNumber);
            }
            return pages.filter(page => page >= this.current - 2 && page <= this.current + 2);
        },
        lastPage() {
            return this.total % this.limit === 0 ? this.total / this.limit : Math.ceil(this.total / this.limit);
        },
    },
    methods: {
        changePage(page) {
            this.$emit('change-page', page);
        }
    }
}
</script>
<style lang="sass" scoped>
.paginator-nav
    align-items: center
    display: inline-flex
    .pagination
        margin: 0
</style>
