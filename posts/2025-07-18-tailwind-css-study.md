---
title: 'Tailwind CSSでレスポンシブデザインを実装'
date: '2025-07-18'
tags: ['Tailwind CSS', 'CSS', 'レスポンシブデザイン']
---

# Tailwind CSSでレスポンシブデザインを実装

Tailwind CSSを使ったレスポンシブデザインの実装方法を学習しました。

## 学習内容

### 1. ブレークポイント
Tailwind CSSのデフォルトブレークポイント：

- `sm`: 640px以上
- `md`: 768px以上  
- `lg`: 1024px以上
- `xl`: 1280px以上
- `2xl`: 1536px以上

### 2. 実装例
カードコンポーネントのレスポンシブ実装：

```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <div className="bg-white p-6 rounded-lg shadow-md">
    <h3 className="text-lg font-semibold mb-2">記事タイトル</h3>
    <p className="text-gray-600 text-sm mb-4">2024-01-20</p>
    <div className="flex flex-wrap gap-2">
      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
        Tag1
      </span>
    </div>
  </div>
</div>
```

### 3. 参考資料
- [Tailwind CSS公式ドキュメント](https://tailwindcss.com/docs)
- [レスポンシブデザインガイド](https://tailwindcss.com/docs/responsive-design)

## 今日の気づき
- ユーティリティファーストの考え方が効率的
- レスポンシブデザインが簡単に実装できる
- カスタムCSSを書く必要がほとんどない

## 実装予定
- 学習記録一覧ページのレスポンシブ対応
- ダークモード対応 