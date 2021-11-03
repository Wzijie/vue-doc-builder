<template>
  <p :style="{ fontSize }" @click="onClick">
    <slot />
    <slot name="desc" />
  </p>
</template>

<script>
export default {
  name: 'Text',

  props: {
    color: String,
  },

  data() {
    return {
      fontSize: '14px',
    };
  },

  methods: {
    onClick(e) {
      this.$emit('click', e);
    },
  },
};
</script>
