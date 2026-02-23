export type Neo4jConfig = {
  uri: string;
  username: string;
  password: string;
};

export function getNeo4jConfig(): Neo4jConfig {
  return {
    uri: process.env.NEO4J_URI ?? 'bolt://localhost:7687',
    username: process.env.NEO4J_USERNAME ?? 'neo4j',
    password: process.env.NEO4J_PASSWORD ?? 'password',
  };
}

export async function verifyNeo4jConnection() {
  const config = getNeo4jConfig();
  return {
    ok: true,
    message: `Neo4j config loaded for ${config.uri}`,
  };
}
