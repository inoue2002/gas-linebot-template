import * as Line from "@line/bot-sdk";
import * as Types from "@line/bot-sdk/lib/types";

const ACCESS_TOKEN = "先ほど取得したアクセストークンを貼り付ける";
//eslint-disable-next-line @typescript-eslint/no-unused-vars
async function doPost(e: any) {
  for (let i = 0; i < JSON.parse(e.postData.contents).events.length; i++) {
    const event = JSON.parse(e.postData.contents).events[i];
    const message = await eventHandle(event);
    //応答するメッセージがあった場合
    if (message !== undefined) {
      const replyToken = event.replyToken;
      const replyUrl = "https://api.line.me/v2/bot/message/reply";
      UrlFetchApp.fetch(replyUrl, {
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
          Authorization: "Bearer " + ACCESS_TOKEN,
        },
        method: "post",
        payload: JSON.stringify({
          replyToken: replyToken,
          messages: [message],
        }),
      });
    }
  }
  return ContentService.createTextOutput(
    JSON.stringify({ content: "post ok" })
  ).setMimeType(ContentService.MimeType.JSON);
}

async function eventHandle(event: Line.WebhookEvent): Promise<Types.Message> {
  let message: Types.Message = { type: "text", text: "" };
  switch (event.type) {
    case "message":
      message = await messagefunc(event);
      break;
    case "postback":
      message = await postbackFunc(event);
      break;
    case "follow":
      message = await followFunc();
      break;
  }
  return message;
}
//メッセージイベントの処理
async function messagefunc(event: Line.MessageEvent): Promise<Types.Message> {
  const textEvent: Line.TextEventMessage =
    event.message as Line.TextEventMessage;
  return { type: "text", text: textEvent.text };
}
//ポストバックイベントの処理
async function postbackFunc(event: Line.PostbackEvent): Promise<Types.Message> {
  return { type: "text", text: event.postback.data };
}
//友達登録時の処理
async function followFunc(): Promise<Types.Message> {
  return { type: "text", text: "友達登録ありがとうございます!!" };
}