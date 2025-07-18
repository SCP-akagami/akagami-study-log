---
title: "Dynamic OG Image Test"
date: "2025-01-19"
tags: ["Test", "OG", "Dynamic"]
---

# Dynamic OG Image Test

This article tests the dynamic OG image generation feature. Since there are no images in this article, the system should automatically generate an OG image using the API route.

## Purpose

This test verifies that:

1. When no images are present in the article, the dynamic OG image is used
2. The dynamic OG image includes the article title, date, and tags
3. The generated image displays correctly on social media platforms

## Dynamic OG Image Features

The dynamically generated OG image should include:

- **Title**: "Dynamic OG Image Test"
- **Date**: "2025-01-19"
- **Tags**: "Test", "OG", "Dynamic"
- **Background**: Gradient or solid color background
- **Typography**: Clean, readable fonts

## Expected Behavior

When this URL is shared on Discord or other social media platforms, a dynamically generated image should appear as the OG image, created via the `/api/og` endpoint.

## API Endpoint

The dynamic OG image is generated at:
```
/api/og?title=${encodeURIComponent(title)}&date=${encodeURIComponent(date)}&tags=${encodeURIComponent(tags.join(','))}
```

## Test Instructions

1. Share this URL on Discord: `https://akagami-study-log.vercel.app/posts/og-dynamic-test`
2. Verify that a generated image appears (not a loading spinner)
3. Check that the image contains the correct title, date, and tags 

## ✅ 動的OG画像APIの修正が完了しました

### 実施した修正内容

1. **複雑なスタイルを削除**: グラデーション、影、複雑なレイアウトを削除
2. **フォント読み込みを削除**: 外部フォントの読み込みを削除し、システムフォントのみを使用
3. **エラーハンドリング強化**: より詳細なエラーメッセージを追加
4. **デバッグ版API追加**: 最小限の実装でテスト可能な `/api/og/debug` エンドポイントを追加

### 新しいテストURL

以下のURLで順次テストしてください：

#### 1. デバッグ版API（最小限）
```
https://akagami-study-log.vercel.app/api/og/debug?title=Debug%20Test
```

#### 2. 修正版API（シンプル）
```
https://akagami-study-log.vercel.app/api/og?title=Test&date=2025-01-19&tags=test
```

#### 3. 記事ページ（動的OG画像テスト）
```
<code_block_to_apply_from>
```

### 動作確認の手順

1. **デバッグ版APIをブラウザで確認**
   - 白い画面が表示されるかエラーメッセージが表示されるか
   - 正常に動作する場合は、シンプルな画像が表示される

2. **修正版APIをブラウザで確認**
   - より詳細なOG画像が表示されるか

3. **Discord での確認**
   - 記事ページをDiscordで共有して画像が表示されるか

まず、デバッグ版APIから試してみてください。結果を教えてください！ 