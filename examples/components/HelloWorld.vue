<template>
  <div class="hello">
  </div>
</template>

<script>
import { Button } from 'element-ui'
import 'element-ui/lib/theme-chalk/button.css'
export default {
  name: 'HelloWorld',
  components: { Button },
  props: {
    message: {
      type: String,
      default: ''
    }
  }
}
</script>
