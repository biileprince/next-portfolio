import { config } from "dotenv";
import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import * as schema from "./schema";

config({ path: ".env.local", quiet: true });
config({ quiet: true });

const databaseUrl =
  process.env.DATABASE_URL?.trim() || "file:./db/portfolio.db";
const authToken = process.env.DATABASE_AUTH_TOKEN?.trim();
const isRemoteLibsql =
  databaseUrl.startsWith("libsql://") ||
  databaseUrl.startsWith("https://") ||
  databaseUrl.startsWith("wss://");

if (isRemoteLibsql && !authToken) {
  throw new Error(
    "DATABASE_AUTH_TOKEN is required when DATABASE_URL points to a remote Turso/libsql database.",
  );
}

const client = createClient({
  url: databaseUrl,
  authToken,
});

export const db = drizzle(client, { schema });
