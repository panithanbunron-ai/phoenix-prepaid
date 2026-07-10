import { Reporter, TestCase, TestResult } from "@playwright/test/reporter";
import { sendDiscord } from "./discord-send-noti";

interface FailedTest {
  title: string;
  file: string;
  error: string;
  duration: number;
}

export default class DiscordReporter implements Reporter {
  private passed = 0;
  private failed = 0;
  private skipped = 0;

  private failedTests: FailedTest[] = [];

  onTestEnd(test: TestCase, result: TestResult) {
    this.updateTestResult(test, result);
  }

  private updateTestResult(test: TestCase, result: TestResult) {
    switch (result.status) {
      case "passed":
        this.passed++;
        break;

      case "failed":
        this.failed++;

        this.failedTests.push({
          title: test.title,

          file: test.location.file,

          error: result.error?.message?.substring(0, 500) || "No error message",

          duration: result.duration,
        });

        break;

      case "skipped":
        this.skipped++;
        break;
    }
  }

  async onEnd() {
    const total = this.passed + this.failed + this.skipped;
    const message = this.buildReportMessage(total);

    await sendDiscord(
      "🎭 Phenix Prepaid Report",
      message,
      this.failed > 0 ? 16711680 : 65280,
    );
  }

  private buildReportMessage(total: number) {
    const failedDetail = this.buildFailedDetail();

    return `
        \`\`\`
        📊 Test Summary ( Total: ${total} )

        ✅ Passed: ${this.passed} || ❌ Failed: ${this.failed} || ⏭ Skipped: ${this.skipped}

        🌎 Environment: ${process.env.NODE_ENV}

        📅 Time: ${this.formatDate()}
        \`\`\`

        ${failedDetail}
        `;
  }

  private buildFailedDetail() {
    if (this.failedTests.length === 0) {
      return "";
    }

    let message = `\`\`\`--------- ❌ Failed Test Cases Detail ---------\`\`\``;

    this.failedTests.forEach((test, index) => {
      message += `
              **--------- ${index + 1}. ${test.title} ---------**

            📁 File:
            ${test.file}

            ⏱ Duration: ${this.formatDuration(test.duration)}

            💥 Error:
            \`\`\`
            ${test.error}
            \`\`\`

            `;
    });

    return message;
  }

  private formatDuration(ms: number) {
    const durationSec = Math.floor(ms / 1000);
    const durationMin = Math.floor(durationSec / 60);
    const remainSeconds = durationSec % 60;

    return durationMin > 0
      ? `${durationMin} min ${remainSeconds} s`
      : `${remainSeconds} s`;
  }

  private formatDate() {
    const date = new Date();

    const formattedDate = [
      String(date.getDate()).padStart(2, "0"),
      date.toLocaleString("en", { month: "short" }),
      date.getFullYear(),
    ].join(" ");

    const formattedTime = date.toTimeString().slice(0, 5);

    return `${formattedDate} (${formattedTime})`;
  }
}
