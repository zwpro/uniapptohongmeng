<template>
  <view class="container">
    <!-- 搜索框部分 -->
    <view class="search-section" @tap="goToSearch">
      <view class="search-box">
        <text class="iconfont icon-search">🔍</text>
        <input
          type="text"
          class="search-input"
          placeholder="搜索全网表情~"
          placeholder-class="placeholder"
          disabled
        />
      </view>
    </view>

    <!-- 热门表情部分 -->
    <view class="section">
      <view class="section-title">
        <text class="fire-icon">🔥</text> 热门表情
      </view>
      <view class="emoji-grid">
        <view
          class="emoji-item"
          v-for="(item, index) in emojis"
          :key="index"
          @tap="goToDetail(item)"
        >
          <image class="emoji-image" :src="item.imgurl" mode="aspectFill" />
        </view>
      </view>
      <view class="loading" v-if="loading">加载中...</view>
    </view>

    <!-- 返回顶部按钮 -->
    <view class="back-to-top" v-if="showBackToTop" @tap="backToTop">
      <image class="top-icon" src="/static/icon/top.png" mode="aspectFit" />
    </view>

    <!-- 添加用户协议弹窗组件 -->
    <agreement-popup
      ref="agreementPopup"
      @agree="handleAgree"
      @disagree="handleDisagree"
    />
  </view>
</template>

<script setup>
import { ref, onMounted, nextTick } from "vue";
import { onReachBottom, onPageScroll } from "@dcloudio/uni-app";
import api from "@/common/api/base.js";
import AgreementPopup from "@/components/agreement-popup/agreement-popup.vue";

const emojis = ref([]);
const page = ref(1);
const loading = ref(false);
const hasMore = ref(true);
const showBackToTop = ref(false);
const agreementPopup = ref(null);

// 获取热门表情数据
const getRandomEmojis = async (isLoadMore = false) => {
  if (loading.value || !hasMore.value) return;

  loading.value = true;
  try {
    const res = await api.homeRandom({
      page: page.value,
    });
    if (res.code === 200) {
      if (isLoadMore) {
        emojis.value = [...emojis.value, ...res.data];
      } else {
        emojis.value = res.data;
      }

      // 判断是否还有更多数据
      hasMore.value = res.data.length > 0;
      if (hasMore.value) {
        page.value++;
      }
    }
  } catch (e) {
    console.error("获取热门表情失败:", e);
  } finally {
    loading.value = false;
  }
};

// 页面触底加载更多
onReachBottom(() => {
  getRandomEmojis(true);
});

// 监听页面滚动
onPageScroll(({ scrollTop }) => {
  // 当滚动超过 500px 时显示返回顶部按钮
  showBackToTop.value = scrollTop > 500;
});

// 返回顶部
const backToTop = () => {
  uni.pageScrollTo({
    scrollTop: 0,
    duration: 300,
  });
};

const goToSearch = () => {
  uni.switchTab({
    url: "/pages/search/search",
  });
};

const goToDetail = (item) => {
  uni.navigateTo({
    url: `/pages/detail/detail?item=${encodeURIComponent(
      JSON.stringify(item)
    )}`,
  });
};

// 检查是否首次打开
const checkFirstOpen = () => {
  nextTick(() => {
    const hasAgreed = uni.getStorageSync("userAgreement");
    if (!hasAgreed && agreementPopup.value) {
      setTimeout(() => {
        agreementPopup.value.open();
      }, 500);
    }
  });
};

// 处理同意
const handleAgree = () => {
  uni.setStorageSync("userAgreement", "true");
};

// 处理不同意
const handleDisagree = () => {
  uni.exit();
};

onMounted(() => {
  getRandomEmojis();
  setTimeout(() => {
    checkFirstOpen();
  }, 100);
});
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
  -webkit-line-clamp: 2; /* 限制两行 */
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
  line-height: 1.4;
  min-height: 2.8em; /* 确保两行高度一致 */
}

.section-title {
  padding: 30rpx 10rpx;
  font-size: 32rpx;
  font-weight: bold;
  display: flex;
  align-items: center;
}

.fire-icon {
  margin-right: 8rpx;
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

/* 新增搜索框样式 */
.search-section {
  padding: 20rpx;
}

.search-box {
  display: flex;
  align-items: center;
  background-color: #f5f5f5;
  padding: 16rpx 24rpx;
  border-radius: 36rpx;
}

.icon-search {
  font-size: 28rpx;
  color: #999;
  margin-right: 12rpx;
}

.search-input {
  flex: 1;
  font-size: 28rpx;
  color: #333;
}

.placeholder {
  color: #999;
}

.loading {
  text-align: center;
  padding: 20rpx;
  color: #999;
  font-size: 24rpx;
}

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

.top-icon {
  width: 40rpx;
  height: 40rpx;
}

.back-to-top:active {
  transform: scale(0.95);
}
</style>
