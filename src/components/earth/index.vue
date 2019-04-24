<template>
  <div ref="dom"></div>
</template>
<script>
import { init } from './common'
export default {
  mounted () {
    init(this.$refs.dom)
  }
}
</script>
<style>
</style>
