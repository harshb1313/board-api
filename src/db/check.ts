import { sql } from 'drizzle-orm';
import { db, pool } from './index.js';

const result = await db.execute(sql`select 1 as ok`);
console.log(result.rows);
await pool.end();
