<template>
  <view class="container">
    <view class="title">{{ title }}</view>
    
    <view class="emoji-grid">
      <view 
        class="emoji-item" 
        v-for="(item, index) in listData" 
        :key="index"
        @tap="goToDetail(item)"
      >
        <image class="emoji-image" :src="item.imgurl" mode="aspectFill" />
      </view>
    </view>
    
    <view class="loading" v-if="loading">加载中...</view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { onReachBottom } from '@dcloudio/uni-app'
import api from '@/common/api/base.js'

const title = ref('')
const listData = ref([])
const page = ref(1)
const loading = ref(false)
const hasMore = ref(true)
const albumId = ref('')

// 获取列表数据
const getList = async (isLoadMore = false) => {
  if (loading.value || !hasMore.value) return
  
  loading.value = true
  try {
    const res = await api.homeAlbumList({
      id: albumId.value,
      page: page.value
    })
    
    if (res.code === 200) {
      if (isLoadMore) {
        listData.value = [...listData.value, ...res.data]
      } else {
        listData.value = res.data
      }
      
      hasMore.value = res.data.length > 0
      if (hasMore.value) {
        page.value++
      }
    }
  } catch (e) {
    console.error('获取专辑列表失败:', e)
  } finally {
    loading.value = false
  }
}

// 跳转到详情页
const goToDetail = (item) => {
  uni.navigateTo({
    url: `/pages/detail/detail?item=${encodeURIComponent(JSON.stringify(item))}`
  })
}

// 页面加载时获取参数
onMounted(() => {
  const pages = getCurrentPages()
  const currentPage = pages[pages.length - 1]
  const { id, title: pageTitle } = currentPage.$page.options
  
  albumId.value = id
  title.value = decodeURIComponent(pageTitle)
  
  getList()
})

// 触底加载更多
onReachBottom(() => {
  getList(true)
})
</script>

<style>
.container {
  min-height: 100vh;
  background-color: #fff;
  padding: 20rpx;
}

.title {
  font-size: 36rpx;
  font-weight: bold;
  padding: 20rpx;
  text-align: center;
  border-bottom: 1px solid #eee;
  margin-bottom: 20rpx;
}

.emoji-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20rpx;
  padding: 10rpx;
}

.emoji-item {
  aspect-ratio: 1;
  border-radius: 16rpx;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);
}

.emoji-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.loading {
  text-align: center;
  padding: 20rpx;
  color: #999;
  font-size: 24rpx;
}
</style>
