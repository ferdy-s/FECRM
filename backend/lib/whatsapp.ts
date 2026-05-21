import { Client, LocalAuth } from "whatsapp-web.js";
import qrcode from "qrcode-terminal";

let isReady = false;

export const waClient = new Client({
  authStrategy: new LocalAuth(),
});

waClient.on("qr", (qr) => {
  console.log("SCAN QR WHATSAPP:");
  qrcode.generate(qr, { small: true });
});

waClient.on("ready", () => {
  console.log("WhatsApp Client Ready!");
  isReady = true;
});

waClient.initialize();

export const waitUntilReady = async () => {
  const timeout = 30000;
  const start = Date.now();

  while (!isReady) {
    if (Date.now() - start > timeout) {
      throw new Error("WhatsApp client timeout");
    }

    await new Promise((resolve) =>
      setTimeout(resolve, 1000)
    );
  }
};