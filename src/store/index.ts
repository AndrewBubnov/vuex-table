import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import Hero from '@/models/Hero'
import State from "@/models/State";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    list: [],
    hero: {},
  },
  mutations: {
      SET_INITIAL_LIST(state: State, list: Hero[]) {
          state.list = state.list.concat(list)
      },
      SET_LIST(state: State, list: Hero[]) {
          state.list = list
      },
      SET_HERO(state: State, hero: Hero) {
          state.hero = hero
      },
      NEW_HERO(state: State, hero: Hero) {
          state.list.push(hero)
      }
  },
  actions: {
      setList({commit}) {
          if (localStorage.getItem('heroList')) {
              // @ts-ignore
              commit('SET_LIST', JSON.parse(localStorage.getItem('heroList')));
          } else {
              let index = 1;
              let completeList: Hero[] = [];
              while (index < 4) {
                  axios.get(`https://swapi.co/api/people/?page=${index}`)
                      .then(res => {
                          const list = res.data.results.map((item: any) => {
                              const id = `f${(~~(Math.random() * 1e8)).toString(16)}`;
                              // @ts-ignore
                              return {...new Hero(...Object.values(item)), id, edited: false}
                          });
                          commit('SET_INITIAL_LIST', list);
                          completeList = completeList.concat(list);
                          localStorage.setItem('heroList', JSON.stringify(completeList))
                      });
                  index++;
              }
          }
      },

      deleteItem({commit, state}, id: number) {
          // @ts-ignore
          const newList = state.list.filter((hero: Hero) => hero.id !== id);
          commit('SET_LIST', newList);
          localStorage.setItem('heroList', JSON.stringify(newList));
      },

      editAddItem({commit, state}, newHero: Hero) {
          // @ts-ignore
          const heroIndex = state.list.findIndex(hero => hero.id === newHero.id);
          if (heroIndex === -1) {
              commit('NEW_HERO', newHero)
          } else {
              const list = state.list;
              // @ts-ignore
              list.splice(heroIndex, 1, newHero);
              commit('SET_LIST', list)
          }
          localStorage.setItem('heroList', JSON.stringify(state.list));
      },

      setHero({commit}, hero) {
          commit('SET_HERO', hero)
      }
  },
  getters: {
      list(state) {
          return state.list
      },
      hero(state) {
          return state.hero
      },

  },
  modules: {
  }
})
