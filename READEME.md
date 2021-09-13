```
yarn install clasp -g

//モジュールのインストール
yarn install 

//clasp login
clasp login

//clasp create 
clasp create --type sheets

```

- .clasp.jsonにrootdirの値をdistに変更

```.clasp.json
 "rootDir": "dist"
```

- appscript.jsonにwebappを追記
```
"webapp": {
  "access": "ANYONE_ANONYMOUS",
  "executeAs": "USER_DEPLOYING"
 }
```

```
//デプロイ
yarn deploy

以下のようなログが出たら成功
└─ dist/appsscript.json
└─ dist/main.js
Pushed 2 files.
Created version 1.
- <デプロイID> @1.
✨  Done in 16.25s.
```

```
https://script.google.com/macros/s/<デプロイID>/exec　がLINEBotのwebhookUrlになる
```

- API有効化
```
clasp open 
```


どうやらモジュールはそのままでは使えないぽいので何か打開策を考えなければいけない