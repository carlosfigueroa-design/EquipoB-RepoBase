import fs from 'fs/promises';
import path from 'path';
import { JsonStoreService } from './json-store.service';
import { DATA_DIR } from '../config/app.config';

jest.mock('fs/promises');

const mockedFs = jest.mocked(fs);

describe('JsonStoreService', () => {
  let service: JsonStoreService;

  beforeEach(() => {
    service = new JsonStoreService();
    jest.clearAllMocks();
  });

  describe('read', () => {
    it('should read and parse a JSON file', async () => {
      const mockData = [{ id: 'api-001', name: 'Test API' }];
      mockedFs.readFile.mockResolvedValue(JSON.stringify(mockData));

      const result = await service.read<typeof mockData>('apis.json');

      expect(mockedFs.readFile).toHaveBeenCalledWith(
        path.join(DATA_DIR, 'apis.json'),
        'utf-8'
      );
      expect(result).toEqual(mockData);
    });

    it('should throw descriptive error when file is not found', async () => {
      const enoentError = new Error('ENOENT') as NodeJS.ErrnoException;
      enoentError.code = 'ENOENT';
      mockedFs.readFile.mockRejectedValue(enoentError);

      await expect(service.read('missing.json')).rejects.toThrow(
        `Archivo no encontrado: ${path.join(DATA_DIR, 'missing.json')}`
      );
    });

    it('should rethrow non-ENOENT filesystem errors', async () => {
      const permError = new Error('EACCES: permission denied') as NodeJS.ErrnoException;
      permError.code = 'EACCES';
      mockedFs.readFile.mockRejectedValue(permError);

      await expect(service.read('apis.json')).rejects.toThrow('EACCES: permission denied');
    });

    it('should throw descriptive error on invalid JSON', async () => {
      mockedFs.readFile.mockResolvedValue('{ invalid json }');

      await expect(service.read('bad.json')).rejects.toThrow(
        /Error al parsear JSON del archivo "bad\.json"/
      );
    });
  });

  describe('write', () => {
    it('should write data as formatted JSON', async () => {
      mockedFs.writeFile.mockResolvedValue();
      const data = { id: 'api-001', name: 'Test API' };

      await service.write('apis.json', data);

      expect(mockedFs.writeFile).toHaveBeenCalledWith(
        path.join(DATA_DIR, 'apis.json'),
        JSON.stringify(data, null, 2),
        'utf-8'
      );
    });

    it('should write arrays as formatted JSON', async () => {
      mockedFs.writeFile.mockResolvedValue();
      const data = [{ id: '1' }, { id: '2' }];

      await service.write('audit-log.json', data);

      expect(mockedFs.writeFile).toHaveBeenCalledWith(
        path.join(DATA_DIR, 'audit-log.json'),
        JSON.stringify(data, null, 2),
        'utf-8'
      );
    });
  });

  describe('readSpec', () => {
    it('should read from specs/ subdirectory', async () => {
      const mockSpec = { openapi: '3.0.3', info: { title: 'Test' } };
      mockedFs.readFile.mockResolvedValue(JSON.stringify(mockSpec));

      const result = await service.readSpec('emision-polizas.json');

      expect(mockedFs.readFile).toHaveBeenCalledWith(
        path.join(DATA_DIR, 'specs/emision-polizas.json'),
        'utf-8'
      );
      expect(result).toEqual(mockSpec);
    });

    it('should throw descriptive error when spec file is not found', async () => {
      const enoentError = new Error('ENOENT') as NodeJS.ErrnoException;
      enoentError.code = 'ENOENT';
      mockedFs.readFile.mockRejectedValue(enoentError);

      await expect(service.readSpec('nonexistent.json')).rejects.toThrow(
        /Archivo no encontrado/
      );
    });
  });

  describe('readSandboxResponse', () => {
    it('should read from sandbox-responses/ with apiId-scenario pattern', async () => {
      const mockResponse = { statusCode: 200, body: { success: true } };
      mockedFs.readFile.mockResolvedValue(JSON.stringify(mockResponse));

      const result = await service.readSandboxResponse('emision-polizas', '200');

      expect(mockedFs.readFile).toHaveBeenCalledWith(
        path.join(DATA_DIR, 'sandbox-responses/emision-polizas-200.json'),
        'utf-8'
      );
      expect(result).toEqual(mockResponse);
    });

    it('should throw descriptive error when sandbox response file is not found', async () => {
      const enoentError = new Error('ENOENT') as NodeJS.ErrnoException;
      enoentError.code = 'ENOENT';
      mockedFs.readFile.mockRejectedValue(enoentError);

      await expect(service.readSandboxResponse('unknown-api', '500')).rejects.toThrow(
        /Archivo no encontrado/
      );
    });
  });
});
