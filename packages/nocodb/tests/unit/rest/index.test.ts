import 'mocha';
import authTests from './tests/auth.test';
import orgTests from './tests/org.test';
import baseTests from './tests/base.test';
import columnTypeSpecificTests from './tests/columnTypeSpecific.test';
import tableTests from './tests/table.test';
import tableRowTests from './tests/tableRow.test';
import viewRowTests from './tests/viewRow.test';
import attachmentTests from './tests/attachment.test';
import filterTest from './tests/filter.test';
import newDataApisTest from './tests/newDataApis.test';
import groupByTest from './tests/groupby.test';
import formulaTests from './tests/formula.test';
import typeCastsTest from './tests/typeCasts.test';
import readOnlyTest from './tests/readOnlySource.test';
import aggregationTest from './tests/aggregation.test';
import request from "supertest";
import fs from 'fs';
import path from 'path';
import {defaultUserArgs} from "../factory/user";
import {expect} from "chai";
import init from "../init";

let workspaceTest = () => {};
let ssoTest = () => {};
let cloudOrgTest = () => {};
let bulkAggregationTest = () => {};
let columnTest = () => {};
let integrationTest = require('./tests/integration.test').default;
if (process.env.EE === 'true') {
  workspaceTest = require('./tests/ee/workspace.test').default;
  ssoTest = require('./tests/ee/sso.test').default;
  cloudOrgTest = require('./tests/ee/cloud-org.test').default;
  bulkAggregationTest = require('./tests/ee/bulkAggregation.test').default;
  columnTest = require('./tests/ee/column.test').default;
  integrationTest = require('./tests/ee/integration.test').default;
}
// import layoutTests from './tests/layout.test';
// import widgetTest from './tests/widget.test';

function restTests() {
  // authTests();
  // orgTests();
  // baseTests();
  // tableTests();
  // tableRowTests();
  // viewRowTests();
  // columnTypeSpecificTests();
  // attachmentTests();
  // filterTest();
  // newDataApisTest();
  // groupByTest();
  // workspaceTest();
  // formulaTests();
  // ssoTest();
  // cloudOrgTest();
  // typeCastsTest();
  // readOnlyTest();
  // aggregationTest();
  // bulkAggregationTest();
  // columnTest();
  // integrationTest();

  // Enable for dashboard feature
  // widgetTest();
  // layoutTests();

  const filePath = path.join(__dirname, '..', 'test_sakila.db');
  console.log(filePath);

  it('Should have an encrypted test_sakila.db file', function () {
    const fileExists = fs.existsSync(filePath);
    expect(fileExists).to.be.true;

    // Read the first 16 bytes
    const fd = fs.openSync(filePath, 'r');
    const buffer = Buffer.alloc(16);
    fs.readSync(fd, buffer, 0, 16, 0);
    fs.closeSync(fd);
    const header = buffer.toString('utf8');

    // The header should not match the standard SQLite header
    // It should be encrypted instead
    console.log(header);
    console.log('###############################');
    const isEncrypted = header !== 'SQLite format 3\u0000';
    expect(isEncrypted).to.be.true;
  });
}

export default function () {
  describe('Rest', restTests);
}
