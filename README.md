# typescript_tmp
Typescriptを利用したテンプレート

## Version

### ver1.0.0

## Directories, Files

```
├── README.md
├── babel.config.js
├── dist ・・・ローカル開発用コマンド実行後に生成
│   ├── assets
│   │   ├── css
│   │   │   ├── demo.css
│   │   │   └── index.css
│   │   └── js
│   │       └── index.ts.js
│   ├── demo.html
│   └── index.html
├── gulpfile.js
├── htdocs ・・・本番ビルドコマンド実行後に生成
│   ├── assets
│   │   ├── css
│   │   │   ├── demo.css
│   │   │   └── index.css
│   │   └── js
│   │       └── index.ts.js
│   ├── demo.html
│   └── index.html
├── jest.config.js
├── jsconfig.json
├── package-lock.json
├── package.json
├── src ・・・開発に利用するファイルを格納しているフォルダ
│   ├── js
│   │   ├── index.ts
│   │   ├── modules
│   │   │   └── _sampleCalc.ts
│   │   └── tests
│   │       └── _sampleCalc.test.ts
│   ├── styles
│   │   ├── _config.scss
│   │   ├── _reset.scss
│   │   ├── components
│   │   │   ├── _footer.scss
│   │   │   ├── _header.scss
│   │   │   └── _sidebar.scss
│   │   ├── layout
│   │   │   ├── _l-common.scss
│   │   │   ├── _l-demo.scss
│   │   │   └── _l-index.scss
│   │   ├── mixin
│   │   │   ├── _clearfix.scss
│   │   │   ├── _easing.scss
│   │   │   ├── _fontsize.scss
│   │   │   ├── _hideaway.scss
│   │   │   └── _margin.scss
│   │   └── pages
│   │       ├── demo.scss
│   │       └── index.scss
│   └── templates
│       ├── components
│       │   ├── _footer.ejs
│       │   ├── _header.ejs
│       │   └── _sidebar.ejs
│       ├── include
│       │   ├── _footer.ejs
│       │   └── _header.ejs
│       └── pages
│           ├── demo.ejs
│           └── index.ejs
├── tsconfig.json
├── webpack.config.js
└── yarn.lock
```


## Useage

### 必要なパッケージをインストール

```
npm i 
```

or 

```
yarn install
```

### ローカル開発コマンド

```
npm run start
```

or

```
yarn run start
```


### 本番ビルド

```
npm run prod
```

or

```
yarn run prod
```


### テストの実行

#### stylelint

```
npm run lint:style
```

or

```
yarn run lint:style
```


#### js(.ts)のテスト

```
npm run test
```

or 

```
yarn run test
```