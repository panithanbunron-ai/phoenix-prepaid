import { test, expect } from "../../src/fixtures/api.js";
import { changePromotion } from "../../src/api/change-promotion.js";
import { query, loadSql, closePool } from "../../src/config/db.js";

// `changePromotion` is mocked in src/api/change-promotion.ts until the real
// API exists — this test only proves the "call API, then check DB" wiring.
test.afterAll(async () => {
    await closePool();
});

test("change-promotion response matches the account in the database", async ({ apiContext }) => {
    const simSerialNo = "070309000012";

    const result = await changePromotion(apiContext, {
        simSerialNo,
        newPlanCode: "PLAN_B",
    });

    const rows = await query<{ SIM_SERIAL_NO: string }>(loadSql("db/selectSim.sql"));

    expect(result.simSerialNo).toBe(simSerialNo);
    expect(rows[0]?.SIM_SERIAL_NO).toBe(simSerialNo);
});
