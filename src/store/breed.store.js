import http from '@/http';

const initialState = () => ({
    list: [],
    page: 1,
    limit: 10,
    total: 0,
    selected: null,
    loading: false,
});

export default {
    namespaced: true,
    state: initialState,
    actions: {
        async list({ commit }, { page = 1, limit = 5 } = {}) {
            commit('setLoading', true);

            try {
                const {
                    data: list,
                    headers: {
                        'pagination-count': total,
                        'pagination-limit': currentLimit,
                        'pagination-page': currentPage,
                    },
                } = await http.get(`breeds?page=${page - 1}&limit=${limit}`);

                commit('setList', list);
                commit('setPage', parseInt(currentPage) + 1);
                commit('setTotal', parseInt(total));
                commit('setLimit', parseInt(currentLimit));
            } catch (error) {
                console.log(error);
            } finally {
                commit('setLoading', false);
            }
        },
        select({ commit, state }, breedId) {
            commit('setSelected', state.list.find(({ id }) => id === breedId) ?? null);
        }
    },
    mutations: {
        setList: (state, list) => state.list = list,
        setPage: (state, page) => state.page = page,
        setTotal: (state, total) => state.total = total,
        setLimit: (state, limit) => state.limit = limit,
        setSelected: (state, selected) => state.selected = selected,
        setLoading: (state, loading) => state.loading = loading,
    },
    getters: {
        getLoading: state => state.loading,
        getList: state => state.list,
        getPage: state => state.page,
        getTotal: state => state.total,
        getLimit: state => state.limit,
        getSelected: state => state.selected,
    },
};
