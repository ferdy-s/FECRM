import { Client, LocalAuth } from "whatsapp-web.js";
import qrcode from "qrcode-terminal";

declare global {
  // eslint-disable-next-line no-var
  var __WA_CLIENT__: Client | undefined;

  // eslint-disable-next-line no-var
  var __WA_INITIALIZED__: boolean | undefined;

  // eslint-disable-next-line no-var
  var __WA_READY_PROMISE__: Promise<void> | undefined;

  // eslint-disable-next-line no-var
  var __WA_READY_RESOLVE__: (() => void) | undefined;
}

export const waClient =
  global.__WA_CLIENT__ ??
  new Client({
    authStrategy: new LocalAuth(),

    puppeteer: {
      headless: true,

      executablePath:
        "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",

      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
      ],
    },
  });

global.__WA_CLIENT__ = waClient;

if (!global.__WA_READY_PROMISE__) {
  global.__WA_READY_PROMISE__ = new Promise<void>((resolve) => {
    global.__WA_READY_RESOLVE__ = resolve;
  });
}

waClient.removeAllListeners();

waClient.on("qr", (qr) => {
  console.log("\n==============================");
  console.log("SCAN QR WHATSAPP");
  console.log("==============================");

  qrcode.generate(qr, {
    small: true,
  });
});

waClient.on("authenticated", () => {
  console.log("✅ WhatsApp Authenticated");
});

waClient.on("auth_failure", (msg) => {
  console.error("❌ WhatsApp Auth Failure");
  console.error(msg);
});

waClient.on("loading_screen", (percent, message) => {
  console.log(`Loading ${percent}% - ${message}`);
});

waClient.on("ready", () => {
  console.log("✅ WhatsApp Client Ready");

  global.__WA_READY_RESOLVE__?.();
});

waClient.on("disconnected", (reason) => {
  console.error("❌ WhatsApp Disconnected");
  console.error(reason);

  global.__WA_INITIALIZED__ = false;

  global.__WA_READY_PROMISE__ = new Promise<void>((resolve) => {
    global.__WA_READY_RESOLVE__ = resolve;
  });
});

if (!global.__WA_INITIALIZED__) {
  global.__WA_INITIALIZED__ = true;

  waClient
    .initialize()
    .then(() => {
      console.log("Initializing WhatsApp...");
    })
    .catch((err) => {
      console.error("WA Initialize Error");
      console.error(err);

      global.__WA_INITIALIZED__ = false;
    });
}

export const waitUntilReady = async () => {
  const timeout = 60000;

  await Promise.race([
    global.__WA_READY_PROMISE__!,

    new Promise((_, reject) =>
      setTimeout(() => {
        reject(
          new Error(
            "WhatsApp client timeout"
          )
        );
      }, timeout)
    ),
  ]);
};