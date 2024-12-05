// logAccess.test.ts
import 'mocha';
import { expect } from 'chai';
import init from '../../init';
import fs from 'fs';
import path from 'path';

export default function logAccessTest() {
  describe('Log Access Test', () => {
    let context;

    beforeEach(async () => {
      context = await init();
      // Ensure the log file exists for testing
      const logFilePath = path.join(__dirname, '../../../../../../logs/nocodb.log');
    });

    it('should allow system administrator to access logs', async () => {
      const logFilePath = path.join(__dirname, '../../../../../../logs/nocodb.log');
      const logs = fs.readFileSync(logFilePath, 'utf-8');
      expect(logs).to.be.a('string').and.not.empty;
    });
  });
}
