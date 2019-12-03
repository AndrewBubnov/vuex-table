<template>
    <div id="app">
        <div class="container">
            <app-header :fields="iteratedFields"/>
            <div class="row header">
                <SearchInput
                        v-for="field in iteratedFields"
                        :key="field"
                        :list="displayed"
                        :field="field"
                        @onSearch="onSearch"
                />
            </div>
            <div class="row header">
                <div :key="field"
                     v-for="field in iteratedFields"
                     @click="onSort(field)"
                     class="record"
                ><i class="material-icons">sort</i>
                </div>
            </div>
            <ListItem v-for="hero in displayed"
                      :hero="hero"
                      :key="hero.id"
                      @click.native="onClick(hero)"
            />
            <div class="add-container"><div>Add new</div><i class="material-icons add" @click="onAdd">add</i></div>
            <Pagination
                    :currentPage="page"
                    :listLength="listLength"
                    :recordsPerPage="perPage"
                    @setPage="setPage"
            />
            <div class="warning" :class="{show: showWarning}">{{this.warning}}</div>
        </div>
    </div>
</template>

<script>
    import ListItem from '@/routes/ListItem.vue';
    import SearchInput from "@/components/SearchInput";
    import Pagination from "@/components/Pagination";
    import Hero from "@/models/Hero";
    import AppHeader from "@/components/Header";
    import { mapGetters, mapActions } from 'vuex'



    const interval = 60*3;

    export default {
        name: 'List',
        components: {
            AppHeader,
            Pagination,
            SearchInput,
            ListItem,
        },
        mounted() {
            this.$store.dispatch('setList')
        },

        computed: {
            ...mapGetters(['list']),
            iteratedFields() {
                let fields = [];
                if (this.list.length > 0){
                    fields = Object.keys(this.list[0]).filter(field => field !== 'id' && field !== 'edited');
                }
                return fields;
            },
            searchedList() {
                return this.searched.length > 0 ? this.searched : this.list;
            },

            displayed() {
                if (this.searched.length > 0) {
                    return this.searchedList
                } else {
                    let page = this.page;
                    let perPage = this.perPage;
                    let from = (page * perPage) - perPage;
                    let to = (page * perPage);
                    if (this.sortedBy) {
                        const key = this.sortedBy;
                        return this.searchedList.slice(from, to).sort((a, b) => {
                            let result = 0;
                            if (this.isNumber(a[key]) && this.isNumber(b[key])) {
                                result = parseFloat(a[key]) - parseFloat(b[key]);
                            } else {
                                result = a[key] > b[key] ? 1 : -1;
                            }
                            return result;
                        });
                    } else {
                        return this.searchedList.length >= this.perPage ? this.searchedList.slice(from, to) : [];
                    }
                }
            },

            listLength() {
                return this.list.length;
            },

            showWarning() {
                return this.warning.length > 0
            }
        },
        methods:{
            ...mapActions(['setHero']),

            onSort(key) {
                this.sortedBy = key;
            },

            onSearch(list){
                this.searched = list;
            },

            setPage(page) {
                this.page = page;
                this.sortedBy = '';
            },

            onClick(hero) {
                this.$store.dispatch('setHero', hero);
                this.$router.push({path: '/hero'})
            },

            onAdd() {
                const lastHeroTime = localStorage.getItem('heroTime');
                if (!lastHeroTime || Date.now() - lastHeroTime > interval * 1000){
                    localStorage.setItem('heroTime', Date.now() + '');
                    const hero = new Hero('','','','','','','','');
                    hero.edited = true;
                    hero.id = `f${(~~(Math.random()*1e8)).toString(16)}`;
                    myStore.hero = hero;
                    this.$router.push({path: '/new'})
                } else {
                    setTimeout(() => (this.warning = ''), 3000);
                    this.warning = `Please wait for ${Math.floor((Date.now() - lastHeroTime) / 1000)} sec to add item`
                }
            },

            isNumber(n){
                return !isNaN(parseFloat(n)) && typeof parseFloat(n) === 'number';
            }
        },
        data: function() {
            return {
                searched: [],
                page: 1,
                perPage: 10,
                sortedBy: '',
                warning: '',
            }
        },
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
        box-sizing: border-box;
    }
    .newBody {
        background: red;
    }
    .container {
        max-width: 1440px;
        margin: auto;
    }
    .row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 20px;
        margin-bottom: 30px;
    }
    .record {
        width: 180px;
        text-align: center;
        font-size: 1.2rem;
        cursor: pointer;
    }
    .header-record {
        width: 180px;
        text-align: center;
    }
    .header {
        width: 1540px;
        font-weight: 600;
        margin-bottom: 20px;
    }
    .material-icons {
        font-size: 20px;
        color: #364c5e;
        cursor: pointer;
    }
    .add-container {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        width: 1540px;
        color: darkgreen;
        font-size: 20px;
    }
    .add{
        color: darkgreen;
        font-size: 40px;
    }
    .warning{
        display: flex;
        justify-content: center;
        width: 1540px;
        font-size: 1.2rem;
        color: darkred;
        opacity: 0;
        margin-top: 10px;
        transition: opacity .7s;
    }
    .show{
        opacity: 1;
    }

</style>
