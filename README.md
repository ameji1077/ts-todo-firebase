# ts-todo-firebase

バニラのTypeScriptを使用し、フレームワークに依存せず構築した認証付きのToDoアプリです。  
ルーティングやUI制御、キャッシュ管理などは全てTypeScriptで自作しており、学習目的およびポートフォリオとして制作しました。  
Firebaseは認証とデータ保存のために最低限活用しており、CSS設計にはBEM記法を採用しています。

---

## 主な機能 / Features

- Firebase Authenticationによるユーザー登録・ログイン機能
- FirestoreによるユーザーごとのToDoデータ管理
- ToDoの作成・状態変更（完了/未完了）
- sessionStorageを用いた簡易キャッシュ機能
- 認証状態に応じたルーティング切り替え
- BEM記法に基づくCSS設計
- シングルページ内での動的UI制御

---

## 使用技術 / Tech Stack

- Vanilla TypeScript
- Vite
- Firebase Authentication / Firestore
- CSS（BEM設計）
- sessionStorage API

---

## 設計上の工夫 / Design Highlights

- **責任分離**
  認証処理、Firestoreとのデータ操作、UI制御を機能別にファイル・モジュールで分け、メンテナンス性を意識した構成にしています。

- **自作ルーティング**
  フレームワークを使わず、ライブラリ（Navigo）を最小限に活用して簡易ルーティング機能を構築し、ページ遷移を実現しています。

- **キャッシュ管理**
  Firestoreから取得したToDoデータは`sessionStorage`にキャッシュすることで、無駄なAPI呼び出しを防ぎ、パフォーマンスを向上させています。

- **イベントの多重登録防止**
  初期化処理が複数回走らないよう、初期化済みかどうかをキャッシュで管理する仕組みを導入し、イベントリスナーの重複を防いでいます。

- **BEM記法によるCSS設計**
  可読性と拡張性を高めるため、BEM 命名規則に沿ってスタイルを設計しています。

- **フレームワーク非依存**
VueやReactのようなモダンフレームワークを使用せず、バニラのTypeScriptとブラウザAPIのみで構築しています。
DOM操作・イベント処理・状態管理などを抽象化レイヤーなしで実装することで、基礎力の強化と学習効果を目的としています。

---

## 起動方法 / Getting Started

1.リポジトリをクローン
git clone https://github.com/ameji1077/ts-todo-firebase.git
cd ts-todo-firebase

2.依存パッケージをインストール
npm install

3.環境変数ファイル .env をプロジェクト直下に作成し、以下のように Firebase の構成情報を記述します。
VITE_FIREBASE_API_KEY=YOUR_API_KEY
VITE_FIREBASE_AUTH_DOMAIN=YOUR_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET=YOUR_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID=YOUR_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID=YOUR_APP_ID
※ 上記の値は Firebase Console から取得できます。

4.開発サーバーを起動
npm run dev

---

## ディレクトリ構成 / Project Structure

ts-todo-firebase/
├── public/              # 静的ファイル
├── src/
│   ├── auth/            # 認証関連の処理（ログイン・登録など）
│   ├── todos/           # ToDo 関連の CRUD ロジック
│   ├── types.ts         # 型定義（Todo など）
│   ├── utils/           # 共通ユーティリティ
│   ├── firebase.ts      # Firebase初期化
│   ├── main.ts          # アプリの初期化・エントリポイント
│   ├── router.ts        # 自作ルーティング処理
│   ├── style.css        # BEM設計のスタイル
│   └── vite-env.d.ts    # Viteの環境変数などの型定義ファイル
├── .gitignore
├── index.html
├── LICENSE
├── package-lock.json
├── package.json
├── README.md
└── tsconfig.json

## ライセンス / License

This project is licensed under the MIT License.  
See the [LICENSE](./LICENSE) file for details.