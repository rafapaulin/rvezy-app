<template>
    <div class="container">
        <header class="row">
            <div class="col-12">
                <h1>List of Cats' Breeds</h1>
            </div>
        </header>
        <span v-show="loading">
            <i class="fas fa-spinner fa-pulse fa-5x"></i>
        </span>
        <main v-if="!loading" class="row">
            <div class="col-12">
                <table class="table" v-if="breeds.length > 0">
                    <thead>
                        <tr>
                            <th scope="col">Breed Name</th>
                            <th scope="col">Breed Description</th>
                            <th scope="col">Image</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="breed in breeds" :key="breed.id" @click="goToDetails(breed.id)">
                            <th scope="row">{{ breed.name }}</th>
                            <td scope="row">{{ breed.description }}</td>
                            <td v-if="breed.image">
                                <img class="breed-img" :src="breed.image.url" :alt="breed.name">
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </main>
        <footer class="row">
            <div class="col-12">
                <div class="form-group page-size">
                    <label for="page-size">Page size:</label>

                    <select class="form-control" id="page-size" v-model="size" @change="onSizeChange">
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                    </select>
                </div>
                <Paginator :current="current" :total="total" :limit="limit" @change-page="changePage" />
            </div>
        </footer>
    </div>
</template>

<script>
// @ is an alias to /src
import { mapActions, mapGetters } from "vuex";
import Paginator from '@/components/Paginator.vue';

export default {
    name: 'Home',
    components: { Paginator },
    data() {
        return {
            size: 5,
        };
    },
    computed: {
        ...mapGetters({
            loading: 'breed/getLoading',
            breeds: 'breed/getList',
            current: 'breed/getPage',
            total: 'breed/getTotal',
            limit: 'breed/getLimit',
        }),
    },
    methods: {
        ...mapActions({ list: 'breed/list' }),
        goToDetails(id) {
            this.$router.push(`/breed/details/${id}`);
        },
        changePage(page) {
            this.list({ page });
        },
        onSizeChange({ target: { value: limit } }) {
            this.list({ page: 1, limit });
        }
    },
    mounted() {
        this.list();
    }
};
</script>
<style lang="sass" scoped>
.breed-img
    max-width: 100px
.table
    tr
        th, td
            text-align: left
    tbody
        tr
            cursor: pointer
            th, td
                vertical-align: middle
            &:hover
                background: #F0F0F0
footer
    & > div
        align-items: center
        justify-content: flex-start
        display: flex
.form-group
    display: inline-flex
.page-size
    margin: 0 30px 0 0
    label
        white-space: nowrap
        display: inline-flex
        align-items: center
        margin: 0 5px 0 0
</style>
