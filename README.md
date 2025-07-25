# 学習記録Webサイト プロジェクト計画

## 1. 目的
個人の学習記録をMarkdownで管理し、静的なWebサイトとして公開する。友人などへの共有も想定する。

## 2. 要件定義

### 機能要件
- 学習記録はローカルのMarkdownファイルで管理する。
- Webサイト側での編集機能は不要。
- トップページは、学習記録が時系列（新しいものが上）に並ぶリスト形式とする。
- 各記録には「タグ」を付け、タグによる絞り込み機能を提供する。
- 各記録には以下を含めることができる。
    - 学習日
    - テキストメモ
    - コードスニペット
    - 参考URL
    - 画像

### 非機能要件
- UIは [note](https://note.com/) のようなシンプルで分かりやすいデザインを目指す。
- デプロイは GitHub Pages または Vercel を利用して簡単に行えるようにする。

## 3. 技術スタック案
- **フレームワーク**: Next.js (静的サイトジェネレーターとして利用)
- **スタイリング**: Tailwind CSS
- **デプロイ先**: Vercel

## 4. 開発計画
1.  **環境構築**: Next.js + Tailwind CSS のプロジェクトを作成する。
2.  **データ形式定義**: Markdownファイルのフォーマット（フロントマター）を定義する。
    - `title`: タイトル
    - `date`: 日付
    - `tags`: タグ (配列)
3.  **一覧表示ページの実装**: 複数のMarkdownファイルを読み込み、タイムライン形式で表示する。
4.  **詳細表示ページの実装**: 個別のMarkdownの内容を整形して表示する。
5.  **タグ機能の実装**: タグごとの一覧ページを作成する。
6.  **デプロイ**: Vercelにデプロイし、公開する。 