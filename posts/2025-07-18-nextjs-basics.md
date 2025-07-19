---
title: 'Next.jsの基本概念を学習'
date: '2025-07-18'
tags: ['Next.js', 'React', 'Web開発']
---

# Next.jsの基本概念を学習

今日はNext.jsの基本的な概念について学習しました。

## 学習内容

### 1. App Router vs Pages Router
- App Routerは新しいルーティングシステム
- `src/app`ディレクトリベースでページを構成
- Server Componentsがデフォルト

### 2. 静的サイト生成（SSG）
Next.jsでは静的サイトを簡単に生成できる：

```javascript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig
```

### 3. 参考資料
- [Next.js公式ドキュメント](https://nextjs.org/docs)
- [App Router入門](https://nextjs.org/docs/app)

## 今日の気づき
- App Routerの方が直感的で使いやすい
- 静的サイト生成機能が非常に強力
- TypeScriptとの親和性が高い

## 次回の学習予定
- Tailwind CSSとの統合
- Markdownファイルの動的読み込み 