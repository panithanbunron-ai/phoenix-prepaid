import { test, expect } from "@playwright/test";
import { query, closePool, loadSql } from "../../src/config/db.js";

test.afterAll(async () => {
    await closePool();
});

test("can connect to the database and run a query", async () => {
    const rows = await query(loadSql("db/selectSim.sql"));
    console.log(JSON.stringify(rows));

    expect(rows.length).toBeGreaterThan(0);
});
