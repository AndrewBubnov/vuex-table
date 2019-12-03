<template>
    <input class="record" type="text" @input="onInput">
</template>
<script>

export default {
  name: 'SearchInput',
    props: ['list', 'field'],
  data: function () {
    return {
        localList: this.list,
    }
  },
  methods: {
      onInput(e){
          const { value } = e.target;
          let searchedList = [];
          if (value){
              searchedList = this.localList.filter(item => {
                  return item[this.field].includes(value)
              });
          }
          this.$emit('onSearch', searchedList);
      }
  },
}
</script>


<style scoped>

</style>
