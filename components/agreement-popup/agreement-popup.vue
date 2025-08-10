<template>
  <view class="popup-mask" v-if="visible" @click.stop>
    <view class="agreement-popup" @click.stop>
      <view class="agreement-title">用户协议与隐私政策</view>
      <view class="agreement-content">
        欢迎使用我们的应用！为了更好地保护您的权益，请您阅读我们的
        <text class="link" @tap="openPrivacy">《隐私政策》</text>
        和
        <text class="link" @tap="openAgreement">《用户协议》</text>
      </view>
      <view class="agreement-buttons">
        <button class="btn-disagree" @tap="handleDisagree">不同意</button>
        <button class="btn-agree" @tap="handleAgree">同意</button>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from "vue";

const visible = ref(false);
const emit = defineEmits(["agree", "disagree"]);

// 打开弹窗
const open = () => {
  visible.value = true;
};

// 关闭弹窗
const close = () => {
  visible.value = false;
};

// 处理同意
const handleAgree = () => {
  emit("agree");
  close();
};

// 处理不同意
const handleDisagree = () => {
  // #ifdef APP-PLUS
  plus.runtime.quit();
  // #endif

  // #ifdef H5
  window.close(); // H5环境
  // #endif

  // #ifdef MP
  // 小程序环境下，提示用户并退出到上一页
  uni.showModal({
    title: "提示",
    content: "您需要同意隐私政策和用户协议才能使用本应用",
    showCancel: false,
    success: () => {
      uni.navigateBack({
        delta: 1,
      });
    },
  });
  // #endif
};

// 打开用户协议
const openAgreement = () => {
  uni.navigateTo({
    url: "/pages/webview/yh",
  });
};

// 打开隐私政策
const openPrivacy = () => {
  uni.navigateTo({
    url: "/pages/webview/ys",
  });
};

defineExpose({
  open,
  close,
});
</script>

<style>
.popup-mask {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
}

.agreement-popup {
  background-color: #fff;
  border-radius: 24rpx;
  width: 600rpx;
  padding: 40rpx;
  position: relative;
  animation: popIn 0.3s ease;
}

@keyframes popIn {
  from {
    transform: scale(0.8);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

.agreement-title {
  font-size: 32rpx;
  font-weight: bold;
  text-align: center;
  margin-bottom: 30rpx;
}

.agreement-content {
  font-size: 28rpx;
  color: #666;
  line-height: 1.6;
  margin-bottom: 40rpx;
}

.link {
  color: #007aff;
  display: inline;
}

.agreement-buttons {
  display: flex;
  gap: 20rpx;
}

.btn-agree,
.btn-disagree {
  flex: 1;
  height: 80rpx;
  line-height: 80rpx;
  text-align: center;
  border-radius: 40rpx;
  font-size: 28rpx;
}

.btn-agree {
  background-color: #007aff;
  color: #fff;
}

.btn-disagree {
  background-color: #f5f5f5;
  color: #666;
}

/* 按钮点击效果 */
.btn-agree:active,
.btn-disagree:active {
  transform: scale(0.98);
  opacity: 0.9;
}
</style>
