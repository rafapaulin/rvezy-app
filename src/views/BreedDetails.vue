<template>
    <div class="container">
        <header class="row">
            <div class="col-12">
                <h1>Breed Details: {{ selected.name }}</h1>
            </div>
        </header>
        <main class="row">
            <figure class="col-12 col-md-4">
                <img class="breed-img" v-if="selected.image" :src="selected.image.url" :alt="selected.name">
            </figure>
            <div class="col-12 col-md-4">
                <div class="rating-box">
                    <Rating name="Adaptability" :rating="selected.adaptability"/>
                    <Rating name="AffectionL evel" :rating="selected.affection_level"/>
                    <Rating name="Child Friendly" :rating="selected.child_friendly"/>
                    <Rating name="Energy Level" :rating="selected.energy_level"/>
                    <Rating name="Health Issues" :rating="selected.health_issues"/>
                    <Rating name="Intelligence" :rating="selected.intelligence"/>
                    <Rating name="Shedding Level" :rating="selected.shedding_level"/>
                    <Rating name="Social Needs" :rating="selected.social_needs"/>
                    <Rating name="Stranger Friendly" :rating="selected.stranger_friendly"/>
                    <Rating name="Vocalisation" :rating="selected.vocalisation"/>
                </div>
            </div>
            <div class="col-12 col-md-4">
                <dl class="details-box">
                    <dt>Origin</dt>
                    <dd>{{ selected.origin }}</dd>
                    <dt>Description</dt>
                    <dd>{{ selected.description }}</dd>
                    <dt>Weight</dt>
                    <dd>{{ selected.weight.metric }}kg</dd>
                    <dt>Temperament</dt>
                    <dd>{{ selected.temperament }}</dd>
                    <dt>Life Span</dt>
                    <dd>{{ selected.life_span }} years</dd>
                    <dt>References</dt>
                    <dd>
                        <ul>
                            <li v-if="selected.cfa_url">
                                <a :href="selected.cfa_url">{{ selected.cfa_url }}</a>
                            </li>
                            <li v-if="selected.vcahospitals_url">
                                <a :href="selected.vcahospitals_url">{{ selected.vcahospitals_url }}</a>
                            </li>
                            <li v-if="selected.vetstreet_url">
                                <a :href="selected.vetstreet_url">{{ selected.vetstreet_url }}</a>
                            </li>
                            <li v-if="selected.wikipedia_url">
                                <a :href="selected.wikipedia_url">{{ selected.wikipedia_url }}</a>
                            </li>
                        </ul>
                    </dd>
                </dl>
            </div>
        </main>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Rating from '@/components/Rating.vue'

export default {
    name: 'BreedDetails',
    components: { Rating },
    computed: {
        ...mapGetters({ selected: 'breed/getSelected' }),
    },
    methods: {
        ...mapActions({ select: 'breed/select' }),
    },
    beforeMount() {
        this.select(this.$route.params.id);

        if (!this.selected) {
            this.$router.push('/');
        }
    }
}
</script>
<style lang="sass" scoped>
.breed-img
    height: auto
    width: 100%
.details-box
    dt, dd
        text-align: left
    dd
        padding: 0 0 0 20px
</style>
