<template>
  <div>
    我是 home 组件 {{apiHost}}
  </div>
</template>
<script>
  export default {
    data() {
      return {
        apiHost: ''
      }
    },
    mounted(){
      this.apiHost=`我是apiHost: ${metadata.apiHost}`
    }
  }
</script>
