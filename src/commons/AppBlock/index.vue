<template>
  <div
    class="app-block plr20 pt20 bd"
    :class="[bgColor, isSearch ? 'pb5' : 'pb20']"
  >
    <div
      v-if="$slots.title || title"
      class="block-title cf"
      :class="[isSearch ? 'mb10' : 'mb20']"
    >
      <div class="fl app-block-title__left df-center">
        <slot name="title">{{ title }}</slot>
        <div class="app-block-title__desc flex-one" v-if="$slots.desc || desc">
          <slot name="desc">{{ desc }}</slot>
        </div>
      </div>
      <div class="fr app-block-title__right" v-if="$slots['after-title']">
        <slot name="after-title" />
      </div>
    </div>
    <div class="app-block-content">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    bgColor: {
      type: String,
      default: "bc-f"
    },
    isSearch: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ""
    },
    desc: {
      type: String,
      default: ""
    }
  }
};
</script>
<style lang="scss" scope>
// @import "~styles/variables";
.block-title {
  .flex-one > div {
    display: inline-block !important;
  }
}
.app-block {
  &-title {
    &__left {
      font-size: 18px;
      font-weight: 600;
    }
    &__desc {
      font-size: 14px;
      font-weight: normal;
      color: #888;
    }
  }
  &-content {
  }
}
</style>
