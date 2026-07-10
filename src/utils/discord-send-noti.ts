import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

export async function sendDiscord(
    title: string,
    description: string,
    color = 0x5865f2,
) {
    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

    if (!webhookUrl) {
        throw new Error("DISCORD_WEBHOOK_URL is missing");
    }

    await axios.post(webhookUrl, {
        embeds: [
            {
              title,
              description,
              color,
              timestamp: new Date().toISOString(),
            },
        ],
    });
}
