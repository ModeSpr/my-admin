<template functional>
  <a-sub-menu :key="props.menuInfo.name">
    <span slot="title">
      <a-icon :type="props.menuInfo.meta.icon||props.menuInfo.children[0].meta.icon" />
      <span>{{ props.menuInfo.meta.title||props.menuInfo.children[0].meta.title }}</span>
    </span>
    <template v-for="item in props.menuInfo.children">
      <a-menu-item v-if="!item.children || item.children.length == 1" :key="item.path">
        <router-link :to="item.path">
          <a-icon :type="item.meta.icon" />
          <span>{{ item.meta.title }}</span>
        </router-link>
      </a-menu-item>
      <sub-menu v-else :key="item.name" :menu-info="item" />
    </template>
  </a-sub-menu>
</template>
<script>
export default {
  props: ['menuInfo'],
};
</script>