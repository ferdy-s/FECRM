import {
  waClient,
  waitUntilReady,
} from "@/lib/whatsapp";

export const waProvider = {
  async send(phone: string, message: string) {
    await waitUntilReady();

    const formatted = `${phone}@c.us`;

    const response = await waClient.sendMessage(
      formatted,
      message
    );

    return {
      externalId: response.id.id,
      status: "SENT",
    };
  },
};