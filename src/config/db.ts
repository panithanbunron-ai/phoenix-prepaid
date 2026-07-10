import oracledb from "oracledb";
import "dotenv/config";
import { readFileSync } from "node:fs";

// Base directory for standalone .sql files (src/sql/**), kept separate from
// .ts source so queries can be edited/reviewed without touching code.
const sqlDir = new URL("../sql/", import.meta.url);
const sqlCache = new Map<string, string>();

export function loadSql(relativePath: string): string {
    let sql = sqlCache.get(relativePath);
    if (!sql) {
        sql = readFileSync(new URL(relativePath, sqlDir), "utf-8").trim();
        sqlCache.set(relativePath, sql);
    }
    return sql;
}

// The DB uses a pre-12c password verifier that node-oracledb's Thin mode
// cannot authenticate against, so Thick mode + Instant Client is required.
oracledb.initOracleClient({ libDir: process.env.ORACLE_CLIENT_LIB_DIR });

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

const { DB_PP_USER, DB_PP_PASS, DB_PP_CONN } = process.env;

if (!DB_PP_USER || !DB_PP_PASS || !DB_PP_CONN) {
    throw new Error("Missing DB_PP_USER, DB_PP_PASS, or DB_PP_CONN environment variables");
}

let pool: oracledb.Pool | undefined;

export async function getPool(): Promise<oracledb.Pool> {
    if (!pool) {
        pool = await oracledb.createPool({
            user: DB_PP_USER,
            password: DB_PP_PASS,
            connectString: DB_PP_CONN,
        });
    }
    return pool;
}

export async function query<T = Record<string, unknown>>(
    sql: string,
    params: oracledb.BindParameters = [],
): Promise<T[]> {
    const dbPool = await getPool();
    const connection = await dbPool.getConnection();
    try {
        const result = await connection.execute<T>(sql, params);
        return result.rows ?? [];
    } finally {
        await connection.close();
    }
}

export async function closePool(): Promise<void> {
    if (pool) {
        await pool.close(10);
        pool = undefined;
    }
}
