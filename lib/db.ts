export type PostgresConfig = {
  connectionString: string;
};

export function getPostgresConfig(): PostgresConfig {
  return {
    connectionString: process.env.DATABASE_URL ?? 'postgresql://postgres:postgres@localhost:5432/stock_universe',
  };
}

export async function pingDatabase() {
  const config = getPostgresConfig();
  return { ok: true, message: `PostgreSQL config loaded (${config.connectionString})` };
}
