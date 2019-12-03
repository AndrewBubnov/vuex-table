<template>
    <div class="wrapper" :class="{single: this.$router.currentRoute.name !== 'List'}">
        <Header :fields="iteratedFields" v-if="this.$router.currentRoute.name !== 'List'"/>
            <div class="row" v-if="userObj">
                <div  class="row" v-if="userObj.edited">
                    <input class="record-input" v-for="field in iteratedFields"
                           :key="field"
                           v-model="userObj[field]"
                    />
                </div>
                <div class="record" v-else
                     v-for="field in iteratedFields"
                     :key="field"
                >{{userObj[field]}}
                </div>
            </div>
            <div class="button-container" v-if="this.$router.currentRoute.name !== 'List'">
                <div @click="onEditSave"><i class="material-icons">{{label}}</i></div>
                <div @click="onDelete"><i class="material-icons">delete</i></div>
                <div @click="onBack"><i class="material-icons">undo</i></div>
            </div>
        <div class="warning" :class="{show: showWarning}">{{warning}}</div>
    </div>
</template>
<script>



    import {store} from "@/store";
    import Header from "@/components/Header";
    import { mapActions } from 'vuex'

    export default {
        components: {
            Header,
        },
        name: 'ListItem',
        props: ['hero'],
        data: function () {
            return {
                userObj: this.hero || this.$store.state.hero,
                label: 'edit',
                warning: '',
            }
        },

        mounted() {
            this.label = this.userObj && this.userObj.edited ? 'done' : 'edit';
        },

        beforeRouteEnter(to, from, next) {
            if (!from.name) {
                next({name: 'List'})
            } else next()
        },
        computed: {

            iteratedFields() {
                return Object.keys(this.userObj).filter(field => field !== 'id' && field !== 'edited');
            },

            showWarning() {
                return this.warning.length > 0
            }
        },
        methods: {
            ...mapActions(['deleteItem', 'editAddItem']),
            onDelete() {
                this.deleteItem(this.userObj.id)
                this.$router.push({path: '/'});
            },

            onEditSave() {
                if (this.iteratedFields.every(item => this.userObj[item] !== '')){
                    this.userObj.edited = !this.userObj.edited;
                    if (this.label === 'edit') {
                        this.label = 'done';
                    } else {
                        this.label = 'edit';
                        this.editAddItem(this.userObj)
                        this.$router.push({path: '/'})
                    }
                } else {
                    setTimeout(() => (this.warning = ''), 3000);
                    this.warning = `All fields obligatory`
                }

            },

            onBack() {
                this.$router.push({path: '/'})
            },
        },
    }
</script>


<style scoped>
    .wrapper {
        width: 1540px;
        margin: 0 auto;
    }
    .single{
         margin-top: 100px;
     }
    .button-container {
        display: flex;
        justify-content: space-between;
        width: 200px;
        margin: 50px auto auto auto;
    }

    .record-input {
        height: 20px;
        padding: 0;
        font-size: 1rem;
        width: 180px;
        margin-top: 28px;
        text-align: center;
        box-sizing: border-box;
    }
</style>
