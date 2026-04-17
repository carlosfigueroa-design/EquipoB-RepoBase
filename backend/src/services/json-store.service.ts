import fs from 'fs/promises';
import path from 'path';
import { DATA_DIR } from '../config/app.config';

export class JsonStoreService {
  /** Lee un archivo JSON completo de /data */
  async read<T>(fileName: string): Promise<T> {
    const filePath = path.join(DATA_DIR, fileName);
    let content: string;

    try {
      content = await fs.readFile(filePath, 'utf-8');
    } catch (err: unknown) {
      if ((err as NodeJS.ErrnoException).code === 'ENOENT') {
        throw new Error(`Archivo no encontrado: ${filePath}`);
      }
      throw err;
    }

    try {
      return JSON.parse(content) as T;
    } catch (err: unknown) {
      throw new Error(
        `Error al parsear JSON del archivo "${fileName}": ${(err as Error).message}`
      );
    }
  }

  /** Escribe un objeto completo a un archivo JSON en /data */
  async write<T>(fileName: string, data: T): Promise<void> {
    const filePath = path.join(DATA_DIR, fileName);
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
  }

  /** Lee un archivo de spec OpenAPI de /data/specs/ */
  async readSpec(specFileName: string): Promise<unknown> {
    return this.read(`specs/${specFileName}`);
  }

  /** Lee respuestas mock de sandbox de /data/sandbox-responses/ */
  async readSandboxResponse(apiId: string, scenario: string): Promise<unknown> {
    return this.read(`sandbox-responses/${apiId}-${scenario}.json`);
  }
}
