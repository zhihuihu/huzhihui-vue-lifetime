<style scoped>
.img{
  text-align: center;
}
</style>
<template>
<div class="img">
  <img :src="modalImgUrl" alt="" height="340px">
</div>
</template>
<script>
export default {
  name: 'ModalImg',
  props: ['imgUrl'],
  data(){
    return{
      modalImgUrl:this.imgUrl
    }
  }
}
</script>
