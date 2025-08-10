### 表情包搜索助手 HarmonyOS 部署指南

本项目为 uni-app 工程，已内置 `harmony-configs` 以支持运行到 HarmonyOS（OpenHarmony/HarmonyOS NEXT 生态）。

已上架：可在华为应用市场搜索“表情包搜索助手”，或打开 <a href="https://appgallery.huawei.com/app/detail?id=com.letwind.biaoqingbaozhushou" target="_blank" rel="noopener noreferrer">应用详情</a>。



---

### 一、环境准备
- **HBuilderX**：建议使用最新版（内置 HarmonyOS 构建支持）。
- **HarmonyOS 设备或模拟器**：真机需开启开发者模式和 HDB/USB 调试。

---

### 二、拉取代码
```bash
git clone https://github.com/zwpro/uniapptohongmeng
cd biaoqingbaosousuogit
```
使用 HBuilderX 打开项目根目录。

---

### 三、配置证书（harmony-configs）
证书签名信息位于 `harmony-configs/build-profile.json5`。在 `signingConfigs` 中填写实际证书参数（调试和发布）。

字段说明（常见）：
- **storeFile**：签名库文件（.p12）。
- **storePassword**：签名库密码。
- **keyAlias**：密钥别名。
- **keyPassword**：密钥密码。
- **certpath**：发布证书（.cer）。
- **profile**：配置文件（.p7b）。
- **signAlg**：签名算法，`SHA256withECDSA` 通常即可。

注意：
- 证书/配置文件来自AGC控制台->证书、APP ID和Profile

---

### 四、运行到 HarmonyOS
1) 用 HBuilderX 打开本项目。
2) 连接真机（或启动模拟器）：开启开发者模式与 HDB/USB 调试，确保设备在 HBuilderX 设备列表可见。
3) HBuilderX 菜单：运行 → 运行到鸿蒙。

---

### 五、打包（可选）
- 发布包：在 `signingConfigs` 中配置 `release` 证书与 `products.release`，在 HBuilderX 菜单 发行 → 鸿蒙本地打包。

---

### 六、目录说明（与 HarmonyOS 相关）
- `harmony-configs/build-profile.json5`：签名、产品与 SDK 版本配置。
- `harmony-configs/AppScope/app.json5`：应用基本信息（`bundleName`、图标、名称等）。
- `harmony-configs/entry/src/main/module.json5`：模块与权限配置（已声明 `ohos.permission.INTERNET`）。

---

### 常见问题
- SDK 版本不匹配：根据错误提示在 HBuilderX/SDK 管理器调整为 `5.0.1(13)` 或修改 `build-profile.json5` 保持一致。
- 证书/Profile 不匹配：确认证书、Profile 与应用 `bundleName`、签名主体一致，且未过期。
- 设备未识别：确认驱动、数据线、开发者模式/HDB 已开启，重启 HBuilderX 与设备再试。

#### 扫码加群交流

<img src="static/image/qun.jpg" alt="扫码加群交流" width="220" />




