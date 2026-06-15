import * as fs from "node:fs";
import * as path from "node:path";
import * as dotenv from "dotenv";
import openapiTS, { astToString } from "openapi-typescript";

dotenv.config({ path: ".env.local" });

const SOURCE = process.env.OPENAPI_SOURCE ?? "local";
const URL = process.env.BFF_OPENAPI_URL ?? "http://localhost:3001/documentation/json";
const OUT = path.resolve(process.cwd(), "api-specs-model");
const LOCAL_PATH = path.resolve(process.cwd(), "openapi.json");
const SKIP = new Set(["api", "v1", "v2", "v3"]);

type Param = { in: string };
type Op = { parameters?: Param[]; requestBody?: unknown; responses?: Record<string, unknown> };
type PathItem = Record<string, Op>;
type Schema = { paths?: Record<string, PathItem> };

async function main() {
  const schema =
    SOURCE === "local"
      ? JSON.parse(fs.readFileSync(LOCAL_PATH, "utf-8"))
      : await fetch(URL)
          .then((r) => {
            if (!r.ok) throw new Error(`${r.status} ${r.statusText}`);
            return r.json();
          })
          .then((json) => {
            fs.writeFileSync(LOCAL_PATH, JSON.stringify(json, null, 2));
            return json;
          });

  const ast = await openapiTS(schema, { version: 3 });
  fs.mkdirSync(OUT, { recursive: true });
  fs.writeFileSync(
    path.join(OUT, "schema.d.ts"),
    `// AUTO-GENERATED — DO NOT EDIT MANUALLY\n\n${astToString(ast)}`,
  );

  const domains = new Map<string, Array<{ method: string; pathStr: string; op: Op }>>();
  const paths = (schema as Schema).paths ?? {};

  for (const [pathStr, pathItem] of Object.entries(paths)) {
    const domain =
      pathStr
        .replace(/^\//, "")
        .split("/")
        .find((s) => !SKIP.has(s) && !s.startsWith("{")) ?? "misc";

    if (!domains.has(domain)) domains.set(domain, []);

    for (const method of ["get", "post", "put", "patch", "delete"]) {
      const op = pathItem[method];
      if (op) {
        const list = domains.get(domain);
        if (list) list.push({ method, pathStr, op });
      }
    }
  }

  for (const [domain, ops] of domains) {
    const dir = path.join(OUT, domain);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, `${domain}.types.ts`), buildTypes(domain, ops));
    fs.writeFileSync(path.join(dir, `${domain}.api.ts`), buildApi(domain, ops));
  }

  const exports = [...domains.keys()].map((d) => `export * from "./${d}/${d}.types";`).join("\n");
  fs.writeFileSync(
    path.join(OUT, "index.ts"),
    `// AUTO-GENERATED — DO NOT EDIT MANUALLY\n\n${exports}`,
  );

  console.log(`✓ ${domains.size} domains: ${[...domains.keys()].join(", ")}`);
}

function pascal(s: string) {
  return s
    .split(/[-_]/)
    .filter(Boolean)
    .map((x) => x.charAt(0).toUpperCase() + x.slice(1))
    .join("");
}

function buildTypes(domain: string, ops: Array<{ method: string; pathStr: string; op: Op }>) {
  let out = `// AUTO-GENERATED — DO NOT EDIT MANUALLY\n\nimport type { paths } from "../schema";\n\n`;

  for (const { method, pathStr, op } of ops) {
    const hasId = pathStr.includes("{");
    const name = `${method}${pascal(domain)}${hasId ? "ById" : ""}`;
    const Name = pascal(name);

    const params = op.parameters ?? [];
    const hasPath = params.some((p) => p.in === "path");
    const hasQuery = params.some((p) => p.in === "query");
    const hasBody = !!op.requestBody;

    if (hasPath || hasQuery || hasBody) {
      out += `export type ${Name}Request = {\n`;
      if (hasPath) out += `  path: paths["${pathStr}"]["${method}"]["parameters"]["path"];\n`;
      if (hasQuery) out += `  query?: paths["${pathStr}"]["${method}"]["parameters"]["query"];\n`;
      if (hasBody)
        out += `  body: paths["${pathStr}"]["${method}"]["requestBody"]["content"]["application/json"];\n`;
      out += `};\n\n`;
    }

    const code = ["200", "201"].find((c) => op.responses?.[c]);
    out += code
      ? `export type ${Name}Response = paths["${pathStr}"]["${method}"]["responses"][${code}]["content"]["application/json"];\n\n`
      : `export type ${Name}Response = void;\n\n`;
  }

  return out;
}

function buildApi(domain: string, ops: Array<{ method: string; pathStr: string; op: Op }>) {
  const types: string[] = [];
  const fns: string[] = [];

  for (const { method, pathStr, op } of ops) {
    const hasId = pathStr.includes("{");
    const name = `${method}${pascal(domain)}${hasId ? "ById" : ""}`;
    const Name = pascal(name);

    const params = op.parameters ?? [];
    const hasPath = params.some((p) => p.in === "path");
    const hasQuery = params.some((p) => p.in === "query");
    const hasBody = !!op.requestBody;
    const hasReq = hasPath || hasQuery || hasBody;

    if (hasReq) types.push(`${Name}Request`);
    types.push(`${Name}Response`);

    const urlTemplate = pathStr.replace(/{(\w+)}/g, "${p.path.$1}");
    const url = hasPath ? "`" + urlTemplate + "`" : `"${pathStr}"`;
    const arg = hasReq ? `p: ${Name}Request` : "";
    const errorMsg = "`${res.status} ${res.statusText}`";

    fns.push(
      `export async function ${name}(${arg}): Promise<${Name}Response> {`,
      `  const res = await fetch(${url}, {`,
      `    method: "${method.toUpperCase()}",`,
      `    headers: { "Content-Type": "application/json" },`,
      ...(hasBody ? [`    body: JSON.stringify(p.body),`] : []),
      `  });`,
      `  if (!res.ok) throw new Error(${errorMsg});`,
      `  return res.json();`,
      `}\n`,
    );
  }

  return `// AUTO-GENERATED — DO NOT EDIT MANUALLY\n\nimport type { ${types.join(", ")} } from "./${domain}.types";\n\n${fns.join("\n")}`;
}

main().catch(() => process.exit(1));
