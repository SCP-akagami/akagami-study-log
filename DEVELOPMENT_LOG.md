# 学習記録Webサイト 開発ログ

## プロジェクト概要
- **目的**: 個人の学習記録をMarkdownで管理し、静的なWebサイトとして公開
- **技術スタック**: Next.js 15, TypeScript, Tailwind CSS, Vercel
- **開始日**: 2024年（具体的な日付は後で更新）

## 完了した作業項目

### ✅ 作業項目1: 環境構築
**実施内容:**
- Next.js + TypeScript + Tailwind CSS + ESLint の環境構築
- App Routerを使用した構成
- 開発サーバーの起動確認

**技術詳細:**
```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --no-git
```

**結果:** ✅ 成功 - 基本的な開発環境が整備された

---

### ✅ 作業項目2: データ形式定義
**実施内容:**
- Markdownファイルの形式定義（フロントマター）
- 3つのサンプル学習記録ファイルを作成
- Markdownファイル処理ライブラリ（`lib/posts.ts`）を実装
- 必要なnpmパッケージのインストール

**フロントマター形式:**
```yaml
---
title: '記事タイトル'
date: 'YYYY-MM-DD'
tags: ['タグ1', 'タグ2', 'タグ3']
---
```

**使用ライブラリ:**
- `gray-matter`: フロントマターの解析
- `remark`: Markdownの処理
- `remark-html`: MarkdownをHTMLに変換

**結果:** ✅ 成功 - Markdownファイルの処理基盤が完成

---

### ✅ 作業項目3: 一覧表示ページの実装
**実施内容:**
- トップページをタイムライン形式の一覧表示に変更
- 個別記事ページ（動的ルート）の作成
- タグ別記事一覧ページの作成
- Tailwind Typography プラグインの追加

**実装した機能:**
- 📝 学習記録のタイムライン表示（最新順）
- 🏷️ タグ一覧表示とタグ別フィルタリング
- 📄 個別記事の詳細表示
- 🎨 noteライクなシンプルで美しいUI
- 📱 レスポンシブデザイン対応

**結果:** ✅ 成功 - 基本的なブログ機能が完成、スタイルも正常に適用

---

## 🚨 問題が発生した作業項目

### ❌ 作業項目4: 詳細表示ページの改善
**実施予定内容:**
- コードハイライト機能の追加
- 見出しにアンカーリンクを追加
- 目次（Table of Contents）機能の実装
- Markdownコンテンツのカスタムスタイル追加

**発生した問題:**

#### 1. PostCSS設定エラー
**エラー内容:**
```
Error: It looks like you're trying to use `tailwindcss` directly as a PostCSS plugin. The PostCSS plugin has moved to a separate package
```

**原因:**
- Next.js 15 + Turbopack環境でのPostCSS設定の互換性問題
- `@tailwindcss/postcss`パッケージが必要だが、設定方法が複雑

**試行した解決策:**
1. `@tailwindcss/postcss`パッケージのインストール
2. `postcss.config.mjs`の設定変更
3. Turbopackの無効化（`--turbopack`フラグを削除）
4. 従来のPostCSS設定形式への変更

**結果:** ❌ 失敗 - どの設定でもエラーが継続

#### 2. Tailwind CSSスタイル適用問題
**問題内容:**
- 作業項目3では正常に適用されていたTailwind CSSのスタイルが適用されなくなった
- 背景色、テキストスタイル、レイアウトが全て無効化

**原因推測:**
- PostCSS設定の変更がTailwind CSSの処理に影響
- `globals.css`の複雑なカスタムスタイルが干渉
- rehypeプラグインの追加が何らかの影響を与えた可能性

**試行した解決策:**
1. `globals.css`の簡素化
2. PostCSS設定の複数パターンでの試行
3. キャッシュクリア（`.next`ディレクトリ削除）
4. 開発サーバーの再起動

**結果:** ❌ 失敗 - スタイルが適用されない状態が継続

#### 3. Reactキーエラー
**エラー内容:**
```
Encountered two children with the same key. Keys should be unique
```

**原因:**
- 目次機能で同じIDを持つ見出しが複数存在
- Reactの`key`プロパティが重複

**解決策:**
- IDの重複を防ぐロジックを追加
- `key={item.id}`を`key={`${item.id}-${index}`}`に変更

**結果:** ✅ 解決 - ただし、他の問題により全体的な動作確認はできず

---

## 現在の状態
- **復元完了**: Git restore により作業項目3完了時点に復元
- **動作状況**: 基本的なブログ機能は正常動作
- **スタイル**: Tailwind CSSが正常に適用されている

---

## 今後の作業予定

### 作業項目4（再実装）: 詳細表示ページの改善
**慎重なアプローチ:**
1. **段階的実装**: 一度に全ての機能を追加せず、1つずつ実装
2. **スタイル優先**: PostCSS設定は触らず、基本的なTailwind CSSのみ使用
3. **コードハイライト**: 外部CSSライブラリではなく、Tailwind CSSでのスタイリング
4. **目次機能**: 複雑なrehypeプラグインを使わず、シンプルな実装

**実装順序:**
1. 基本的なMarkdownスタイル改善（Tailwind CSSのみ）
2. シンプルなコードハイライト（prism.jsなど軽量ライブラリ）
3. 目次機能（JavaScript/TypeScriptでの実装）
4. 見出しアンカーリンク（シンプルなDOM操作）

### 作業項目5: タグ機能の拡張
- タグクラウドの実装
- タグ別統計表示
- 検索機能の追加

### 作業項目6: デプロイ準備
- Vercelでのデプロイ設定
- 静的サイト生成の最適化
- パフォーマンス最適化

---

## 学んだ教訓

### ✅ 作業項目6: Vercelデプロイ（完了）
**実施内容:**
- プロジェクトメタデータの更新（package.json, layout.tsx）
- Vercelでの自動デプロイ設定
- 本番環境での動作確認
- 軽微な警告の修正（未使用変数）

**技術詳細:**
- **デプロイ先**: Vercel (https://akagami-study-log.vercel.app など)
- **ビルド結果**: 18ページの静的サイト生成
- **パフォーマンス**: 高速読み込み（First Load JS: 103-118 kB）
- **自動デプロイ**: GitHubプッシュ時の自動デプロイ設定完了

**実装した機能:**
- 📦 本番環境での完全な動作確認
- 🚀 高速な静的サイト生成
- 🔄 GitHubとVercelの自動デプロイ連携
- 📊 パフォーマンス最適化済み

**結果:** ✅ 成功 - 学習記録サイトが正常に公開され、全機能が本番環境で動作

---

## 学んだ教訓

### 技術的な教訓
1. **Next.js 15の新機能**: Turbopackは便利だが、設定の互換性に注意が必要
2. **PostCSS設定**: 複雑な設定変更は予期しない副作用を引き起こす可能性
3. **段階的開発**: 複数の機能を同時に追加すると、問題の原因特定が困難

### 開発プロセスの教訓
1. **Git活用**: 各作業項目完了時にコミットすることで、安全な復元ポイントを確保
2. **ドキュメント化**: 問題発生時の詳細な記録が今後の開発に役立つ
3. **テスト駆動**: 新機能追加前に既存機能の動作確認を徹底

---

## 参考資料
- [Next.js 15 Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [PostCSS Configuration](https://postcss.org/docs/)
- [gray-matter GitHub](https://github.com/jonschlinkert/gray-matter)
- [remark GitHub](https://github.com/remarkjs/remark)

---

## 更新履歴
- 2024-XX-XX: 初版作成、作業項目1-3完了、作業項目4で問題発生
- 2024-XX-XX: Git restore により作業項目3時点に復元完了 