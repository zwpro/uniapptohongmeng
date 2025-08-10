<template>
  <view class="container">
    <!-- 热门专辑部分 -->
    <view class="section">
      <view class="grid">
        <view class="grid-item" v-for="(item, index) in tools" :key="index" @tap="goToList(item)">
          <view class="icon-wrapper">
            <image class="tool-icon" :src="item.icon" mode="aspectFill" />
          </view>
          <text class="item-text">{{ item.title }}</text>
        </view>
      </view>
      <!-- 添加加载提示 -->
      <view class="loading" v-if="loading">加载中...</view>
    </view>

    <!-- 添加返回顶部按钮 -->
    <view 
      class="back-to-top"
      v-if="showBackToTop"
      @tap="backToTop"
    >
      <image class="top-icon" src="/static/icon/top.png" mode="aspectFit" />
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { onReachBottom, onPageScroll } from '@dcloudio/uni-app'
import api from '@/common/api/base.js'

const tools = ref([])
const page = ref(1)
const loading = ref(false)
const hasMore = ref(true)
const showBackToTop = ref(false)  // 添加显示返回顶部按钮的状态

// 获取热门专辑数据
const getAlbums = async (isLoadMore = false) => {
  if (loading.value || !hasMore.value) return
  
  loading.value = true
  try {
    const res = await api.homeAlbum({
      page: page.value
    })
    if(res.code === 200) {
      if (isLoadMore) {
        tools.value = [...tools.value, ...res.data]
      } else {
        tools.value = res.data
      }
      
      // 判断是否还有更多数据
      hasMore.value = res.data.length > 0
      if (hasMore.value) {
        page.value++
      }
    }
  } catch(e) {
    console.error('获取热门专辑失败:', e)
  } finally {
    loading.value = false
  }
}

// 页面触底加载更多
onReachBottom(() => {
  getAlbums(true)
})

onMounted(() => {
  getAlbums()
})

// 监听页面滚动
onPageScroll(({ scrollTop }) => {
  // 当滚动超过 500px 时显示返回顶部按钮
  showBackToTop.value = scrollTop > 500
})

// 返回顶部
const backToTop = () => {
  uni.pageScrollTo({
    scrollTop: 0,
    duration: 300
  })
}

// 添加跳转方法
const goToList = (item) => {
  uni.navigateTo({
    url: `/pages/album/list?id=${item.imgurl}&title=${encodeURIComponent(item.title)}`
  })
}
</script>

<style>
.container {
  min-height: 100vh;
  background-color: #fff;
  padding: 20rpx;
  overflow-y: auto;
}

.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30rpx;
  padding: 10rpx;
}

.grid-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8rpx;
}

.icon-wrapper {
  background: #fff;
  border-radius: 24rpx;
  padding: 4rpx;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);
  position: relative;
}

.tool-icon {
  width: 140rpx;
  height: 140rpx;
  border-radius: 20rpx;
}

.item-text {
  font-size: 26rpx;
  color: #333;
  width: 100%;
  text-align: center;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
  line-height: 1.4;
  min-height: 2.8em;
}

/* 添加加载提示样式 */
.loading {
  text-align: center;
  padding: 20rpx;
  color: #999;
  font-size: 24rpx;
}

/* 添加返回顶部按钮样式 */
.back-to-top {
  position: fixed;
  right: 30rpx;
  bottom: 120rpx;
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 99;
  transition: all 0.3s;
}

/* 添加顶部图标样式 */
.top-icon {
  width: 40rpx;
  height: 40rpx;
}

.back-to-top:active {
  transform: scale(0.95);
}
</style>
