import { sendDiscord } from "./discord-send-noti";

async function sendNotiPR() {
  await sendDiscord(
    "🚀 New Pull Request Opened",
    `
        Title:
        ${process.env.PR_TITLE || "-"}

        URL:
        ${process.env.PR_URL || "-"}

        `,
    0x5865f2,
  );
}

sendNotiPR().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
