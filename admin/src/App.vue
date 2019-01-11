<template>
  <div id="app">
    <router-view v-if="isrouter"/>
  </div>
</template>

<script>

export default {
  data() {
    return{
      isrouter:true
    }
  },
  provide() {
    return{
      reload:this.reload
    }
  },
  methods:{
    reload() {
      this.isrouter = false
      this.$nextTick(function() {
        this.isrouter = true
      })
    }
  },
}
</script>

<style>
</style>
