# SalTrac とは

SalTrac は、SNS 機能と塩分摂取量管理を組み合わせたアプリケーションです。食事の記録とともに塩分量を管理し、健康的な食生活をサポートします。

## 主な特徴

- **SNS 機能**: 食事の写真を投稿し、フォロワーや他のユーザと共有
- **塩分摂取管理**: 製品ごとに記載された塩分量を手入力
- **画像認識による塩分推定**: 塩分量が記載されていない食品は、機械学習モデルによる画像認識で推定
- **日々の塩分摂取量を可視化**

## インストール

### セットアップ

#### With docker-compose

```sh
# リポジトリのクローン
git clone https://github.com/Dreams20250215/SalTrac.git
cd SalTrac

# フロントエンドのセットアップ
cd client
npm install

# バックエンドのセットアップ
cd ../server
pip install -r requirements.txt

# 画像認識モデルのセットアップ（Dockerを使用）
docker-compose up -d
```

## 使用方法

### 1. アプリの起動

```sh
# フロントエンド起動
cd client
npm run build
npm run start

# バックエンド起動
cd ../server
python app.py
```

### 2. アカウント作成とログイン

- ユーザー登録後、ログインして食事の記録を開始

### 3. 食事の記録

- 製品の塩分量を手入力
- 画像認識で塩分を推定（オプション）
- SNS 機能で他のユーザーとシェア

### 4. 日々の塩分摂取量を確認

- 自分や他のユーザーの過去の記録を確認

## 技術スタック

### フロントエンド

- Next.js (App router)
- module.css

### バックエンド

- Flask

### 画像認識

- PyTorch
