<template>
  <view class="container">
    <view class="title">
      <text>用户协议</text>
    </view>

    <view class="company">
      <text class="italic">南京先攻科技有限公司</text>
      <text>（以下简称"我们"）依据本协议为用户（以下简称"你"）提供</text>
      <text class="italic">表情包搜索助手</text>
      <text>服务。本协议对你和我们均具有法律约束力。</text>
    </view>

    <view class="section">
      <view class="subtitle">一、本服务的功能</view>
      <text>你可以使用本服务表情包浏览、搜索、下载功能。</text>
    </view>

    <view class="section">
      <view class="subtitle">二、责任范围及限制</view>
      <text>你使用本服务得到的结果仅供参考，实际情况以官方为准。</text>
    </view>

    <view class="section">
      <view class="subtitle">三、隐私保护</view>
      <text
        >我们重视对你隐私的保护，你的个人隐私信息将根据《隐私政策》受到保护与规范，详情请参阅《隐私政策》。</text
      >
    </view>

    <view class="section">
      <view class="subtitle">四、其他条款</view>
      <text class="clause"
        >4.1
        本协议所有条款的标题仅为阅读方便，本身并无实际涵义，不能作为本协议涵义解释的依据。</text
      >
      <text class="clause"
        >4.2
        本协议条款无论因何种原因部分无效或不可执行，其余条款仍有效，对双方具有约束力。</text
      >
    </view>
  </view>
</template>

<script setup></script>

<style>
.container {
  padding: 30rpx;
}

.title {
  font-size: 40rpx;
  font-weight: bold;
  text-align: center;
  margin-bottom: 30rpx;
}

.company {
  margin-bottom: 30rpx;
  line-height: 1.6;
}

.italic {
  font-style: italic;
}

.section {
  margin-bottom: 30rpx;
}

.subtitle {
  font-size: 32rpx;
  font-weight: bold;
  margin-bottom: 20rpx;
}

.clause {
  display: block;
  margin-bottom: 10rpx;
  line-height: 1.6;
}
</style>
