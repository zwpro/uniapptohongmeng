<template>
  <view class="search-container">
    <!-- 标题部分 -->
    <view class="title-box">
      <text class="title">表情包全网搜索</text>
    </view>
    
    <!-- 搜索框部分 -->
    <view class="search-box">
      <input 
        type="text" 
        v-model="searchText"
        placeholder="请输入搜索内容"
        class="search-input"
      />
      <text class="search-btn" @tap="handleSearch()">搜索</text>
    </view>
    
    <!-- 推荐搜索词部分 -->
    <view class="recommend-box" v-if="!hasSearched">
      <text class="recommend-title">热门搜索</text>
      <view class="tag-list">
        <text 
          v-for="(item, index) in recommendTags" 
          :key="index"
          class="tag-item"
          @tap="handleTagClick(item)"
        >
          {{item}}
        </text>
      </view>
    </view>
    
    <!-- 添加搜索结果列表 -->
    <view class="search-result" v-if="searchResults.length > 0">
      <view class="section-title">
        <text>搜索结果</text>
      </view>
      <view class="emoji-grid">
        <view 
          class="emoji-item" 
          v-for="(item, index) in searchResults" 
          :key="index"
          @tap="goToDetail(item)"
        >
          <image 
            :src="item.imgurl" 
            mode="aspectFill" 
            class="emoji-image"
          />
        </view>
      </view>
    </view>
    
    <!-- 修改加载中状态显示位置 -->
    <view class="loading" v-if="isLoading">
      <text>{{ page === 1 ? '搜索中...' : '加载更多中...' }}</text>
    </view>
    
    <!-- 添加没有更多数据的提示 -->
    <view class="no-more" v-if="!isLoading && !hasMore && searchResults.length > 0">
      <text>没有更多了~</text>
    </view>
    
    <!-- 无搜索结果提示 -->
    <view class="no-result" v-if="!isLoading && searchResults.length === 0 && hasSearched">
      <text>未搜索到相关表情，换个词吧</text>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import { onReachBottom } from '@dcloudio/uni-app'
import api from '@/common/api/base.js'

const searchText = ref('')
const recommendTags = ref([
  '斗图', 
  'giao', 
  '嘤嘤嘤', 
  '鸭鸭', 
  '委屈', 
  '龙王',
  '我太难了', 
  '小笨蛋', 
  '我错了', 
  '阿巴阿巴',
  '？？？', 
  '奥利给', 
  '晚安', 
  '生日快乐', 
  '谢谢啦',
  '沙雕表情', 
  '罗翔', 
  '害', 
  'OK', 
  '老婆',
  '群主', 
  '白眼', 
  '喵喵', 
  '可爱', 
  'tatan',
  '蹦迪', 
  '在吗'
])
const searchResults = ref([])
const isLoading = ref(false)
const hasSearched = ref(false)
// 添加分页相关变量
const page = ref(1)
const hasMore = ref(true)

const handleSearch = async (isLoadMore = false) => {
  if (!searchText.value.trim()) {
    uni.showToast({
      title: '请输入搜索内容',
      icon: 'none'
    })
    return
  }
  
  if (isLoading.value) return
  
  isLoading.value = true
  if (!isLoadMore) {
    hasSearched.value = true
    page.value = 1 // 重置页码
    searchResults.value = [] // 清空之前的搜索结果
    hasMore.value = true // 重置hasMore状态
  } else if (!hasMore.value) {
    return // 只在加载更多时检查hasMore
  }
  
  try {
    const res = await api.homeSearch({
      keyword: searchText.value,
      page: page.value
    })
    if (res.code === 200) {
      if (isLoadMore) {
        searchResults.value = [...searchResults.value, ...res.data]
      } else {
        searchResults.value = res.data
      }
      
      // 判断是否还有更多数据
      hasMore.value = res.data.length > 0
      if (hasMore.value) {
        page.value++
      }
    } else {
      uni.showToast({
        title: res.msg || '搜索失败',
        icon: 'none'
      })
    }
  } catch (error) {
    uni.showToast({
      title: '搜索失败',
      icon: 'none'
    })
  } finally {
    isLoading.value = false
  }
}

const handleTagClick = (tag) => {
  searchText.value = tag
  hasMore.value = true // 重置加载更多状态
  handleSearch()
}

// 监听触底事件
onReachBottom(() => {
  if (hasSearched.value && hasMore.value) {
    handleSearch(true)
  }
})

const goToDetail = (item) => {
  
  uni.navigateTo({
    url: `/pages/detail/detail?item=${encodeURIComponent(JSON.stringify(item))}`
  })
}
</script>

<style>
.search-container {
  padding: 30rpx;
  min-height: calc(100vh - var(--window-bottom) );
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.search-box {
  display: flex;
  align-items: center;
  padding: 10rpx;
  background-color: #f5f5f5;
  border-radius: 30rpx;
}

.search-input {
  flex: 1;
  height: 60rpx;
  padding: 0 20rpx;
  font-size: 28rpx;
}

.search-btn {
  padding: 0 30rpx;
  font-size: 28rpx;
  color: #333;
}

.recommend-box {
  margin-top: 30rpx;
}

.recommend-title {
  font-size: 28rpx;
  color: #666;
  margin-bottom: 20rpx;
}

.tag-list {
  display: flex;
  flex-wrap: wrap;
}

.tag-item {
  padding: 10rpx 20rpx;
  background-color: #f5f5f5;
  border-radius: 20rpx;
  margin: 10rpx;
  font-size: 24rpx;
  color: #333;
}

.title-box {
  text-align: center;
  margin-bottom: 30rpx;
}

.title {
  font-size: 40rpx;
  font-weight: bold;
  color: #333;
}

.section-title {
  padding: 30rpx 10rpx;
  font-size: 32rpx;
  font-weight: bold;
  display: flex;
  align-items: center;
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

.loading, .no-result, .no-more {
  margin-top: 40rpx;
  text-align: center;
  color: #666;
  font-size: 28rpx;
}

.no-more {
  color: #999;
  padding-bottom: 40rpx;
}
</style>
