import { watch } from "fs";
import { join, basename } from "path";

interface ServerWS {
  send(data: string | ArrayBuffer | Buffer): void;
  close(): void;
  ping(): void;
}

const clients: Set<ServerWS> = new Set();
const dirPath = import.meta.dir;

const server = Bun.serve({
  port: 8080,
  fetch(req, server) {
    if (server.upgrade(req)) return;
    return new Response(
      "Strudel Bun Bundler Server",
    );
  },
  websocket: {
    open(ws) {
      clients.add(ws);
      console.log("ブラウザが接続されました！");
    },
    close(ws) {
      clients.delete(ws);
      console.log(
        "ブラウザの接続が解除されました",
      );
    },
    message(ws, message) {
      console.log("受信メッセージ:", message);
    },
  },
});

console.log(
  `Bun バンドラーサーバーが起動しました（ws://localhost:${server.port}）`,
);

// ファイルを自動で連結（バンドル）してブラウザへ送信する関数
async function bundleAndSend(filePath: string) {
  try {
    // Bun.build を使って、保存されたファイルとインポート先のファイルを1つに結合します
    const result = await Bun.build({
      entrypoints: [filePath],
      target: "browser",
      // 必要に応じて minify: true などの最適化オプションをここに残せます
    });

    if (!result.success) {
      console.error("ビルド失敗:", result.logs);
      return;
    }

    // エラー対策：配列の0番目が存在するかしっかりチェックをおこないます
    const output = result.outputs[0];
    if (!output) {
      console.error(
        "ビルド成果物（出力ファイル）が見つかりません。",
      );
      return;
    }

    // 結合されたJavaScriptを取得して送信
    const jsCode = await output.text();
    for (const client of clients) {
      client.send(jsCode);
    }
    console.log(
      `[Sync] ${basename(filePath)} を結合してブラウザへ送信しました！`,
    );
  } catch (e) {
    console.error("ビルドエラー:", e);
  }
}

// フォルダ内を監視し、「strudel-」で始まり「.ts」で終わるファイルの変更のみを検知します
let debounceTimer: NodeJS.Timeout | undefined;
watch(dirPath, (eventType, filename) => {
  if (
    eventType === "change" &&
    filename &&
    filename.startsWith("strudel-") &&
    filename.endsWith(".ts")
  ) {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      bundleAndSend(join(dirPath, filename));
    }, 100);
  }
});
