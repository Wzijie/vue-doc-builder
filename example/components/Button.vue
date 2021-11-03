<template>
  <button @click="onClick">
    <slot />
  </button>
</template>

<script>
export default {
  name: 'Button',

  props: {
    type: String,
  },

  methods: {
    onClick(e) {
      this.$emit('click', e);
    },
  },
};
</script>
