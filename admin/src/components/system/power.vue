<template>
  <div class="power">
   <div class="color-list">
      <div 
          class="coloritem" 
          v-for="color in colors" v-dragging="{ item: color, list: colors, group: 'color' }"
          :key="color.text"
      >{{color.text}}</div>
  </div>
      
  </div>
</template>

<script>
// import VueDND from 'awe-dnd'
export default {
  
  data () {
    return {
        colors: [{
            text: "Aquamarine"
        }, {
            text: "Hotpink"
        }, {
            text: "Gold"
        }, {
            text: "Crimson"
        }, {
            text: "Blueviolet"
        }, {
            text: "Lightblue"
        }, {
            text: "Cornflowerblue"
        }, {
            text: "Skyblue"
        }, {
            text: "Burlywood"
        }]
    }
  },
    mounted () {
    this.$dragging.$on('dragged', ({ value }) => {
      console.log(value.item)
      console.log(value.list)
      console.log(value.otherData)
    })
  },
}
</script>

<style lang='scss' scoped>
.power{
  .coloritem{
    background: pink;
    width: 100px;
    height: 80px;
    margin:20px;
  }

}

</style>
