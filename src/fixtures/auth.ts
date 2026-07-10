// The auth API isn't implemented yet, so this returns a fixed token.
// TODO: replace with a real login call once the auth endpoint exists.
export async function getAuthToken(): Promise<string> {
    return process.env.API_AUTH_TOKEN ?? "mock-token";
}
