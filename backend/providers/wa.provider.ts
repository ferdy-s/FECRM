import {
  waClient,
  waitUntilReady,
} from "@/lib/whatsapp";

export const waProvider = {
  async send(phone: string, message: string) {
    await waitUntilReady();

    const number = phone.replace(/\D/g, "");

    const normalized = number.startsWith("0")
      ? `62${number.slice(1)}`
      : number;

    const formatted = `${normalized}@c.us`;

    const response = await waClient.sendMessage(
      formatted,
      message
    );

    console.dir(response, {
      depth: null,
    });

    return {
      externalId:
        response?.id?._serialized ??
        response?.id?.id ??
        crypto.randomUUID(),

      status: "SENT",
    };
  },
};