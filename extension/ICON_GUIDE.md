# 图标创建指南

扩展可以正常工作，即使没有图标文件（Edge 会使用默认图标）。如果你想添加自定义图标：

## 快速创建图标

### 方法一：使用在线工具
1. 访问 https://www.favicon-generator.org/
2. 上传一个图标图片（建议 512x512 或更大）
3. 下载生成的图标包
4. 将以下文件放入 `extension` 文件夹：
   - `icon16.png`
   - `icon32.png`
   - `icon48.png`
   - `icon128.png`

### 方法二：使用图片编辑软件
1. 准备一个图标图片（建议 512x512 像素）
2. 使用 Photoshop、GIMP 或在线工具（如 https://www.iloveimg.com/resize-image）调整尺寸
3. 创建以下尺寸的版本：
   - 16x16 像素 → `icon16.png`
   - 32x32 像素 → `icon32.png`
   - 48x48 像素 → `icon48.png`
   - 128x128 像素 → `icon128.png`
4. 将所有图标文件放入 `extension` 文件夹

### 方法三：使用命令行工具（如果安装了 ImageMagick）
```bash
# 在 extension 文件夹中运行
convert your-icon.png -resize 16x16 icon16.png
convert your-icon.png -resize 32x32 icon32.png
convert your-icon.png -resize 48x48 icon48.png
convert your-icon.png -resize 128x128 icon128.png
```

## 图标设计建议
- 使用简洁、清晰的图标
- 建议使用与阅读相关的图标（如眼睛、书本、文字等）
- 确保图标在小尺寸（16x16）下仍然清晰可辨
- 使用透明背景（PNG 格式）

## 注意
如果没有图标文件，扩展仍然可以正常工作，只是会显示 Edge 的默认扩展图标。
