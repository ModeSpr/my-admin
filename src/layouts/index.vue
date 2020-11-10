<template>
  <a-layout class="app-wrapper">
    <section v-show="mobile&&!collapsed" class="mask" @click="() => (collapsed = true)"></section>
    <!-- 侧边 -->
    <a-layout-sider v-show="!mobile || !collapsed" v-model="collapsed" :trigger="null" collapsible class="aside" :style="{width: sideWidth}">
      <div class="logo" />
      <a-menu 
        theme="dark" 
        mode="inline" 
        :default-selected-keys="['1']" 
        :default-open-keys="['2']"
        @select="selectMenu"
      >
        <template v-for="item in $router.options.routes">
          <template v-if="!item.hidden">
            <a-menu-item v-if="item.children && item.children.length == 1" :key="item.redirect">
              <router-link :to="item.children[0].path">
                <a-icon :type="item.children[0].meta.icon" />
                <span>{{ item.children[0].meta.title }}</span>
              </router-link>
            </a-menu-item>
            <sub-menu v-else :key="item.redirect" :menu-info="item" />
          </template>
        </template>
      </a-menu>
    </a-layout-sider>
    <a-layout :style="{marginLeft: sideWidth}">
      <!-- 顶部 -->
      <a-layout-header class="navbar" style="">
        <a-icon
          class="trigger"
          :type="collapsed ? 'menu-unfold' : 'menu-fold'"
          @click="open"
        />
        <a-breadcrumb class="nav-panel" separator=">">
          <a-breadcrumb-item v-for="(item,index) in levelList" :key="item.path">
            <span v-if="item.redirect==='noRedirect'||index==levelList.length-1" class="no-redirect">{{ item.meta.title }}</span>
            <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
          </a-breadcrumb-item>
        </a-breadcrumb>
        <a-dropdown>
          <section class="avatar-wrapper">
            <a-icon type="smile" theme="twoTone" style="font-size: 24px;" />
            <span style="margin: 0 10px;">admin</span>
            <a-icon type="down" style="cursor: pointer;" />
          </section>
          <a-menu slot="overlay">
            <a-menu-item>
              <router-link to="/">首页</router-link>
            </a-menu-item>
            <a-menu-item @click="logout">
              <!-- <router-link to="/login">退出登录</router-link> -->
              <span>退出登录</span>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </a-layout-header>
      <!-- 主体 -->
      <a-layout-content :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minWidth: '500px', minHeight: 'calc(100vh - 112px)' }" >
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
import SubMenu from "./sub-menu";
import { throttle,debounce } from '@/utils'
export default {
  components: {
    'sub-menu': SubMenu,
  },
  data() {
    return {
      collapsed: false,   // 收缩
      mobile: false,
      levelList: null
    };
  },
  computed:{
    sideWidth(){
      if(!this.collapsed) {
        return '200px'
      } else {
        if(this.mobile) {
          return 0
        } else {
          return '80px'
        }
      }
    }
  },
  watch: {
    $route() {
      this.getBreadcrumb()
    }
  },
  created() {
    this.getBreadcrumb()
  },
  mounted(){
    console.log(this.$router.options.routes)
    this.init();
    window.onresize = debounce(()=> this.init(), 500);
  },
  methods:{
    // 根据窗口大小动态计算，小于 990 为手机
    init() {
      if (!document.hidden) {
        // console.log(new Date() - this.time_resize < 800)
        if(new Date() - this.time_resize < 800) return;
        this.time_resize = new Date()
        let clientWidth = document.documentElement.clientWidth;
        if(clientWidth < 990 ) {
          this.mobile = true
          this.collapsed = true
        } else if(this.mobile) {
          this.mobile = false
        }
      }
    },
    getBreadcrumb() {
      // only show routes with meta.title
      let matched = this.$route.matched.filter(item => item.meta && item.meta.title)
      
      this.levelList = matched
    },
    open() {
      if(this.mobile) {
        this.collapsed = false;
      } else {
        this.collapsed = !this.collapsed;
      }
    },
    selectMenu( {item, key, keyPath } ){
      if(this.mobile) {
        this.collapsed = true
      }
    },
    async logout(){
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
};
</script>
<style lang="scss">
.app-wrapper{
  position: relative;
    width: 100%;
    height: 100%;
}
.aside{
  position: fixed !important;
  z-index: 999;
  top: 0;
  bottom: 0;
  left: 0;
  overflow: auto;
	&::-webkit-scrollbar {
    display: none;
  }
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
  padding: 0 16px;
  display: flex;
  align-items: center;
    font-size: 16px;
  .trigger {
    padding: 0 10px;
    cursor: pointer;
    transition: color 0.3s;
    &:hover {
      color: #1890ff;
    }
  }

  .nav-panel{
    .no-redirect {
      color: #97a8be;
      cursor: text;
    }
  }
  .avatar-wrapper{
    margin-left: auto;
    display: inline-flex;
    align-items: center;
  }
}

.app-wrapper .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
</style>
