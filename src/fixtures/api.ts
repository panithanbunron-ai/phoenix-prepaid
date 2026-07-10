import { test as base } from "@playwright/test";
import type { APIRequestContext } from "@playwright/test";
import { getAuthToken } from "./auth.js";

interface ApiFixtures {
    apiContext: APIRequestContext;
}

export const test = base.extend<ApiFixtures>({
    apiContext: async ({ playwright }, use) => {
        const authToken = await getAuthToken();
        const context = await playwright.request.newContext({
            ...(process.env.API_BASE_URL ? { baseURL: process.env.API_BASE_URL } : {}),
            extraHTTPHeaders: {
                Authorization: `Bearer ${authToken}`,
            },
        });
        await use(context);
        await context.dispose();
    },
});

export { expect } from "@playwright/test";
