---
title: 'マークダウン機能テスト'
date: '2025-01-19'
tags: ['Test', 'Markdown', 'スタイル確認']
---

# マークダウン機能テスト

このファイルは、マークダウンの各種機能が正しく表示されるかを確認するためのテストファイルです。

## 見出しのテスト

### H3見出し
#### H4見出し
##### H5見出し
###### H6見出し

## 箇条書きのテスト

### 順序なしリスト（ul）
- 第1項目
- 第2項目
  - ネストした項目1
  - ネストした項目2
    - さらにネストした項目
- 第3項目

### 順序付きリスト（ol）
1. 第1項目
2. 第2項目
   1. ネストした項目1
   2. ネストした項目2
      1. さらにネストした項目
3. 第3項目

## ハイパーリンクのテスト

### 外部リンク
- [Next.js公式ドキュメント](https://nextjs.org/docs)
- [React公式ドキュメント](https://ja.react.dev/)
- [Tailwind CSS公式ドキュメント](https://tailwindcss.com/docs)

### 内部リンク
- [タグ一覧ページ](/tags)
- [ホームページ](/)

## テキスト装飾のテスト

**太字テキスト**は重要な内容を示します。

*イタリック体テキスト*は強調を表します。

***太字かつイタリック***は最も重要な内容です。

~~取り消し線~~は削除された内容を示します。

## コードのテスト

### インラインコード
この文章には`インラインコード`が含まれています。変数`const message = "Hello World"`のような短いコードに使用します。

### コードブロック

JavaScript/TypeScriptのコード例：

```typescript
interface User {
  id: number
  name: string
  email: string
}

const users: User[] = [
  { id: 1, name: "田中太郎", email: "tanaka@example.com" },
  { id: 2, name: "佐藤花子", email: "sato@example.com" }
]

function getUserById(id: number): User | undefined {
  return users.find(user => user.id === id)
}

// 使用例
const user = getUserById(1)
if (user) {
  console.log(`ユーザー名: ${user.name}`)
}
```

CSSのコード例：

```css
.prose {
  color: #374151;
  font-size: 1.125rem;
  line-height: 1.75;
}

.prose ul {
  list-style-type: disc;
  padding-left: 1.5rem;
}

.prose a {
  color: #2563eb;
  text-decoration: none;
}

.prose a:hover {
  text-decoration: underline;
}
```

## 引用のテスト

> これは引用文です。重要な文章や他の文書からの引用を示すために使用します。
> 
> 引用文は複数行にわたることもあります。このようにブロック引用として表示されます。

## 表のテスト

| 項目 | 説明 | 必須 |
|------|------|------|
| タイトル | 記事のタイトル | ✅ |
| 日付 | 公開日 | ✅ |
| タグ | カテゴリ分類 | ❌ |
| 内容 | 記事本文 | ✅ |

### 複雑な表

| 技術 | 種類 | 難易度 | 学習時間 | 備考 |
|------|------|-------|---------|------|
| HTML | マークアップ | 初級 | 1週間 | Web開発の基礎 |
| CSS | スタイリング | 初級〜中級 | 2週間 | レスポンシブデザインまで |
| JavaScript | プログラミング | 中級 | 1ヶ月 | 最も重要なスキル |
| TypeScript | 型システム | 中級〜上級 | 2週間 | JavaScriptの拡張 |
| React | ライブラリ | 中級〜上級 | 3週間 | 現代的なUI開発 |
| Next.js | フレームワーク | 上級 | 2週間 | フルスタック開発 |

## 水平線のテスト

上の内容と下の内容を区切るための水平線です。

---

## 混合コンテンツのテスト

### 実際の学習記録例

**学習日**: 2025年1月19日  
**学習時間**: 3時間  
**学習内容**: マークダウンスタイリングの実装

#### 今日の成果
1. **箇条書きスタイル**の実装
   - `list-style-type: disc`でリストマーカーを表示
   - 適切なインデントの設定
2. **ハイパーリンクスタイル**の強化
   - 青色でリンクを目立たせる
   - ホバー効果の追加

#### 使用した技術
- [Next.js](https://nextjs.org/) - フルスタックReactフレームワーク
- [Tailwind CSS](https://tailwindcss.com/) - ユーティリティファーストCSSフレームワーク
- [TypeScript](https://www.typescriptlang.org/) - 型安全なJavaScript

#### 参考にしたコード

```jsx
<div className="prose prose-lg max-w-none 
               prose-ul:list-disc prose-ul:pl-6 
               prose-a:text-blue-600 prose-a:font-medium">
  {/* マークダウンコンテンツ */}
</div>
```

#### 学習メモ
> CSSの`!important`を使用することで、Tailwindのスタイルを確実に適用できることがわかった。
> 
> ただし、`!important`は保守性を下げる可能性があるため、使用は最小限に留める必要がある。

---

## まとめ

このテストファイルには以下の要素が含まれています：

- ✅ 見出し（H1〜H6）
- ✅ 箇条書き（順序なし・順序付き）
- ✅ ハイパーリンク（外部・内部）
- ✅ テキスト装飾（太字・イタリック・取り消し線）
- ✅ コードブロック（複数言語）
- ✅ インラインコード
- ✅ 引用文
- ✅ 表（シンプル・複雑）
- ✅ 水平線
- ✅ 混合コンテンツ

**次回の改善点**:
- 画像の表示テスト
- より多くのシンタックスハイライト言語
- 数式表示（MathJax等）

## 画像表示のテスト

### 外部画像の表示
Webから取得した画像の表示テスト：

![Next.js Logo](https://nextjs.org/favicon.ico)

### 既存アセットの表示
プロジェクトの既存アセットを使用：

![Next.js SVG](/next.svg)

### 複数画像の表示
複数の画像を表示：

![Globe Icon](/globe.svg)
![Vercel Logo](/vercel.svg)

*注意: 実際の画像ファイルを`public/images/`ディレクトリに配置すると、相対パスで表示されます*

### 画像の説明文付き
画像にキャプションを付けることもできます：

![File Icon](/file.svg)
*ファイルを表すアイコン - 学習記録の管理に使用*