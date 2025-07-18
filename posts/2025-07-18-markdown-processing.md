---
title: 'Markdownファイルの動的読み込みを実装'
date: '2025-07-18'
tags: ['Markdown', 'Next.js', 'gray-matter', 'remark']
---

# Markdownファイルの動的読み込みを実装

Next.jsでMarkdownファイルを動的に読み込んでHTMLに変換する方法を学習しました。

## 学習内容

### 1. 必要なライブラリ
以下のライブラリを使用：

```bash
npm install gray-matter remark remark-html
```

- `gray-matter`: フロントマターの解析
- `remark`: Markdownの処理
- `remark-html`: MarkdownをHTMLに変換

### 2. 実装コード
Markdownファイルを読み込む関数：

```typescript
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const postsDirectory = path.join(process.cwd(), 'posts')

export function getAllPosts() {
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, '')
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const matterResult = matter(fileContents)
    
    return {
      id,
      ...matterResult.data,
    }
  })
  
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}
```

### 3. 参考資料
- [gray-matter GitHub](https://github.com/jonschlinkert/gray-matter)
- [remark GitHub](https://github.com/remarkjs/remark)
- [Next.js Markdown Blog Tutorial](https://nextjs.org/learn/basics/dynamic-routes)

## 今日の気づき
- フロントマターの解析が思ったより簡単
- remarkのエコシステムが充実している
- Next.jsのファイルシステムAPIが便利

## 次回の実装予定
- 一覧ページでのMarkdownレンダリング
- 個別記事ページの作成
- 画像の最適化対応

## 実装時の注意点
- サーバーサイドでのファイル読み込みのみ可能
- 静的生成時にすべてのMarkdownファイルを処理
- 画像パスは`/images/`から始まる絶対パスを使用 