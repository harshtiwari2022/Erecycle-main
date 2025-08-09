import { promises as fs } from "fs";
import path from "path";

const dataDir = path.join(process.cwd(), "src", "server", "data");

async function ensureDataDir(): Promise<void> {
  await fs.mkdir(dataDir, { recursive: true });
}

export async function getDataFilePath(fileName: string): Promise<string> {
  await ensureDataDir();
  return path.join(dataDir, fileName);
}

export async function readJsonFile<T>(fileName: string, defaultValue: T): Promise<T> {
  const filePath = await getDataFilePath(fileName);
  try {
    const content = await fs.readFile(filePath, "utf8");
    return JSON.parse(content) as T;
  } catch (err: any) {
    if (err && (err.code === "ENOENT" || err.code === "EISDIR")) {
      await writeJsonFile(fileName, defaultValue);
      return defaultValue;
    }
    throw err;
  }
}

export async function writeJsonFile<T>(fileName: string, data: T): Promise<void> {
  const filePath = await getDataFilePath(fileName);
  const json = JSON.stringify(data, null, 2);
  await fs.writeFile(filePath, json, "utf8");
}