<template>
  <a-layout class="app-wrapper">
    <section v-show="mobile&&!collapsed" class="mask" @click="() => (collapsed = true)"></section>
    <a-layout-sider v-show="!mobile || !collapsed" v-model="collapsed" :trigger="null" collapsible :class="{'mobile-show': mobile&&!collapsed}">
      <div class="logo" />
      <a-menu 
        theme="dark" 
        mode="inline" 
        :default-selected-keys="['1']" 
        :default-open-keys="['2']"
        @select="selectMenu"
      >
        <template v-for="item in list">
          <a-menu-item v-if="!item.children" :key="item.key">
            <a :href="'#' + item.key" target="_self" rel="noopener noreferrer">
              <a-icon type="pie-chart" />
              <span>{{ item.title }}</span>
            </a>
          </a-menu-item>
          <sub-menu v-else :key="item.key" :menu-info="item" />
        </template>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header class="navbar" style="">
        <a-icon
          class="trigger"
          :type="collapsed ? 'menu-unfold' : 'menu-fold'"
          @click="open"
        />
        <section class="nav-panel">
          <span>123</span>
        </section>
      </a-layout-header>
      <a-layout-content :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minWidth: '500px', minHeight: 'calc(100vh - 112px)' }" >
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
import SubMenu from "./sub-menu";
export default {
  components: {
    'sub-menu': SubMenu,
  },
  data() {
    return {
      collapsed: false,   // 收缩
      mobile: false,
      list: [
        {
          key: '1',
          title: 'Option 1',
        },
        {
          key: '2',
          title: 'Navigation 2',
          children: [
            {
              key: '2.1',
              title: 'Navigation 3',
              children: [{ key: '2.1.1', title: 'Option 2.1.1' }],
            },
          ],
        },
      ],
    };
  },
  mounted(){
    console.log(this.$router.options.routes)
    this.init();
    window.onresize = () => this.init();
  },
  methods:{
    init(){
      let clientWidth = document.documentElement.clientWidth;
      if(clientWidth < 900 ) {
        this.mobile = true
        this.collapsed = true
      } else if(this.mobile) {
        this.mobile = false
      }
    },
    open() {
      if(this.mobile) {
        this.collapsed = false;
      } else {
        this.collapsed = !this.collapsed;
      }
    },
    selectMenu( {item, key, keyPath } ){
      console.log(  key  )
      if(this.mobile) {
        this.collapsed = true
      }
    },
  }
};
</script>
<style lang="scss">
.app-wrapper{
  position: relative;
    width: 100%;
    height: 100%;
}
.mobile-show{
  position: fixed;
  z-index: 999;
  top: 0;
  bottom: 0;
  left: 0;
}
.mask {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: fixed;
  z-index: 998;
}
.navbar{
  overflow: hidden;
  position: relative;
  background: #fff; 
  padding: 0;
  .nav-panel{
    margin-left: 10px;
    display: inline-flex;
  }
}
.app-wrapper .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

.app-wrapper .trigger:hover {
  color: #1890ff;
}

.app-wrapper .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
</style>
