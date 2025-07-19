---
title: 'やさしいMCP入門-第6章MCPサーバー紹介（開発者向け）'
date: '2025-07-19'
tags: ['やさしいMCP入門', 'MCPサーバー', '開発ツール', 'AIエージェント']
---

# やさしいMCP入門-第6章MCPサーバー紹介（開発者向け）

## メモ

### ブラウザ操作（Playwright）

- Playwright MCPサーバー
  - e2eテストツールをMCPサーバー化したもの
  - Playwright：Webアプリに対し、ブラウザでどんな挙動をして、どういう結果ならOKかを定義するテストシナリオをコードで記述して、テストを実行する
  - MCPサーバー経由でAIエージェントがユーザーからのテスト指示を自然言語で受付、自律的にブラウザ操作することでテストシナリオコードを記述せずともe2eテストが実施可能
  - Robotic Process Automation（RPA）の側面もあり

### ファイルシステム

- Filesystem MCPサーバー
  - ローカルファイルに対して処理をすることが可能
  - 行単位でファイルの読み込みと編集をすることが可能

### データベース

- Text-to-SQL：SQLを使ったデータベース操作をAIエージェントの力を借りて自然言語で実施する手法
- MCP Toolbox for Databases（Googleが開発、ベータ版）

### クラウド（AWS）

- AWS Documentaion MCPサーバー
  - AWSの公式ドキュメントをAIエージェントが必要に応じて検索し、ユーザーにわかりやすくまとめて出力してくる
- Amazon Nova Canvas MCPサーバー
  - AIエージェントがAmazon Nova Canvasを使用し、高品質の画像生成を実行

### 3DCG（Unity）

- Unity Editor MCP
  - コミュニティ製
  - 自然言語でUnityを操作することが可能に
  - QA（Quality Assurance - 品質保証）の分野で投入が注目

