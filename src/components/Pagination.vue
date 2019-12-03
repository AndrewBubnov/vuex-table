<template>
    <div class="paginate-container">
        <div @click="onPaginateEdge(-1)"><i class="material-icons">first_page</i></div>
        <div @click="onPaginate(-1)"><i class="material-icons">navigate_before</i></div>
        <div class="sibling-container">
            <div class="sibling" v-if="previousPages.length > 0">
                <div v-for="page in previousPages"
                     :key="page"
                     @click="setPage(page)"
                >{{page}} ,</div>
            </div>
            <div class="current">{{page}}</div>
            <div class="sibling" v-if="nextPages.length > 0">
                <div v-for="page in nextPages"
                     :key="page"
                     @click="setPage(page)"
                >, {{page}}</div>
            </div>
        </div>
        <div @click="onPaginate(1)"><i class="material-icons">navigate_next</i></div>
        <div @click="onPaginateEdge(1)"><i class="material-icons">last_page</i></div>
    </div>
</template>


<script>

const range = 2;

export default {
  name: 'Pagination',
    props: ['currentPage', 'listLength', 'recordsPerPage'],
  data: function () {
    return {
        page: this.currentPage,
        perPage: this.recordsPerPage,
    }
  },
  computed: {
      lastPage() {
          return Math.ceil(this.listLength / this.perPage);
      },

      previousPages() {
          const previous = [];
          let i = this.page <= range ? 1 : this.page - range;
          while (i < this.page){
              previous.push(i);
              i++;
          }
          return previous;
      },

      nextPages() {
          const next = [];
          let i = this.page + 1;
          const last = this.page + range <= this.lastPage ? this.page + range : this.lastPage;
          while (i <= last){
              next.push(i);
              i++;
          }
          return next;
      },
  },
  methods: {
      onPaginate(value) {
          this.page += value;
          if (this.page < 1) this.page = 1;
          if (this.page > this.lastPage) this.page = this.lastPage;
          this.$emit('setPage', this.page);
      },

      onPaginateEdge(value) {
          this.page = value > 0 ? this.lastPage : 1;
          this.$emit('setPage', this.page);
      },

      setPage(page) {
          this.page = page;
          this.$emit('setPage', this.page);
      }
  },
}
</script>


<style scoped>
    .paginate-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 300px;
        margin: 50px auto auto auto;
    }
    .sibling{
        display: flex;
        color: #5b7b95;
        cursor: pointer;
    }
    .sibling-container{
        display: flex;
        justify-content: space-around;
        align-items: center;
    }
    .current {
        font-size: 1.3rem;
        font-weight: 600;
    }
</style>
