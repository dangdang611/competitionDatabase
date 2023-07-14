<template>
  <div :class="{ 'has-logo': showLogo }" class="rightPlane">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar>
      <el-menu :router="true" :unique-opened="true" :default-active="activeMenu" class="el-menu-vertical-demo" :collapse="isCollapse">
        <!-- 递归路由对象 -->
        <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path" class="itemList" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { isExternal } from '@/utils/validate'
import sidebarItem from '@/layout/components/Sidebar/sidebarItem.vue'
import logo from './Logo.vue'
import { useStore } from '../../../store/index'

export default defineComponent({
  components: {
    logo,
    sidebarItem
  },
  setup() {
    const route = useRoute()

    const store = useStore()
    const isCollapse = computed(() => !store.getters['appModule/getSidebarState'])
    const showLogo = computed(() => store.state.settingsModule.sideBarLogo)
    const routes = computed(() => store.state.permissionModule.accessRoutes)
    const activeMenu = computed(() => store.getters['tabModule/getCurrentIndex'])

    onMounted(() => {
      const routePath = route.path

      store.commit('tabModule/SET_TAB', routePath)
    })

    // methods
    // eslint-disable-next-line consistent-return
    const resolvePath = (routePath: string) => {
      if (isExternal(routePath)) {
        return routePath
      }
    }
    return {
      activeMenu,
      resolvePath,
      routes,
      showLogo,
      isCollapse
    }
  }
})
</script>
<style lang="less" scoped>
.el-menu-vertical:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
  text-align: left;
}
.rightPlane {
  :deep(.sidebar-logo-container) {
    background: #fff;
    h1 {
      color: #409eff !important;
      font-size: 18px !important;
      margin-left: 5px !important;
    }
  }
}

:deep(.el-menu-item),
:deep(.el-sub-menu__title) {
  font-size: 15px !important;
}

:deep(.ic) {
  font-size: 22px !important;
}
</style>
