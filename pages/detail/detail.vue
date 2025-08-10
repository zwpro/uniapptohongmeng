<template>
  <view class="container">
    <view class="image-wrapper">
      <image 
        class="emoji-image" 
        :src="emojiData.imgurl" 
        mode="aspectFit"
      />
    </view>
    
    <!-- 更多热门 -->
    <view class="related-section">
      <view class="section-title">更多热门</view>
      <view class="emoji-grid">
        <view 
          class="emoji-item" 
          v-for="(item, index) in relatedEmojis" 
          :key="index"
          @tap="handleRelatedClick(item)"
        >
          <image 
            class="related-image" 
            :src="item.imgurl" 
            mode="aspectFill" 
          />
        </view>
      </view>
      <view class="loading" v-if="loading">加载中...</view>
    </view>
    
    <!-- 下载按钮 -->
    <view class="action-bar">
      <button 
        class="download-btn" 
        @tap="handleDownload"
        :loading="downloading"
      >
        {{ downloading ? '下载中...' : '保存到本地' }}
      </button>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import api from '@/common/api/base.js'

const emojiData = ref({})
const downloading = ref(false)
const relatedEmojis = ref([])
const loading = ref(false)

onLoad((options) => {
  if (options.item) {
    try {
      emojiData.value = JSON.parse(decodeURIComponent(options.item))
      getRelatedEmojis()
    } catch (e) {
      console.error('解析数据失败:', e)
    }
  }
})

// 获取相关推荐
const getRelatedEmojis = async () => {
  loading.value = true
  try {
    const res = await api.homeRelate({
      id: emojiData.value.id
    })
    if (res.code === 200) {
      relatedEmojis.value = res.data
    }
  } catch (e) {
    console.error('获取相关推荐失败:', e)
  } finally {
    loading.value = false
  }
}

// 点击相关推荐
const handleRelatedClick = (item) => {
  emojiData.value = item
  getRelatedEmojis() // 重新获取相关推荐
  // 滚动到顶部
  uni.pageScrollTo({
    scrollTop: 0,
    duration: 300
  })
}

// 处理下载
const handleDownload = () => {
  if (downloading.value) return
  downloading.value = true
  
  saveImage()
}

// 保存图片
const saveImage = () => {
  uni.downloadFile({
    url: emojiData.value.imgurl,
    success: (res) => {
      if (res.statusCode === 200) {
        uni.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: () => {
            uni.showToast({
              title: '保存成功',
              icon: 'success'
            })
          },
          fail: () => {
            uni.showToast({
              title: '保存失败',
              icon: 'error'
            })
          },
          complete: () => {
            downloading.value = false
          }
        })
      } else {
        downloading.value = false
        uni.showToast({
          title: '下载失败',
          icon: 'error'
        })
      }
    },
    fail: () => {
      downloading.value = false
      uni.showToast({
        title: '下载失败',
        icon: 'error'
      })
    }
  })
}

// 显示设置弹窗
const showSettingModal = () => {
  uni.showModal({
    title: '提示',
    content: '需要您授权保存图片到相册',
    confirmText: '去设置',
    success: (res) => {
      if (res.confirm) {
        uni.openSetting()
      }
    }
  })
}
</script>

<style>
.container {
  min-height: 100vh;
  background-color: #fff;
  padding: 20rpx;
  padding-bottom: calc(130rpx + env(safe-area-inset-bottom));
}

.image-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
}

.emoji-image {
  width: 600rpx;
  height: 600rpx;
  border-radius: 20rpx;
}

.action-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20rpx 40rpx;
  padding-bottom: calc(20rpx + env(safe-area-inset-bottom));
  background: #fff;
  box-shadow: 0 -2rpx 10rpx rgba(0, 0, 0, 0.05);
  z-index: 99;
}

.download-btn {
  background: #007AFF;
  color: #fff;
  border-radius: 45rpx;
  font-size: 32rpx;
  height: 90rpx;
  line-height: 90rpx;
}

.download-btn:active {
  opacity: 0.8;
}

.related-section {
  margin-top: 40rpx;
  padding-bottom: 20rpx;
}

.section-title {
  font-size: 32rpx;
  font-weight: bold;
  margin-bottom: 20rpx;
  padding: 0 10rpx;
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

.related-image {
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
