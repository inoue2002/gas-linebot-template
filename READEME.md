```
yarn install clasp -g

//モジュールのインストール
yarn install 

//clasp login
clasp login

//clasp create 
clasp create --type sheets

```

- .clasp.jsonにrootdirを追記

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