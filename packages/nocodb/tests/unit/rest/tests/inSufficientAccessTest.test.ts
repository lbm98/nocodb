import 'mocha';
import request from 'supertest';
import { beforeEach } from 'mocha';
import { Exception } from 'handlebars';
import { expect } from 'chai';
import { Base } from '../../../../src/models';
import { createTable, getTable } from '../../factory/table';
import init from '../../init';
import {
  createProject,
  createSakilaProject,
  createSharedBase,
} from '../../factory/base';
import { RootScopes } from '../../../../src/utils/globals';
import { generateDefaultRowAttributes } from '../../factory/row';
import { defaultColumns } from '../../factory/column';

// Test case list
// 1. Create data readonly source
// 2. Create schema readonly source

function insufficientAccessTest() {
  let context;

  beforeEach(async function () {
    console.time('#### readonlySourceTest');
    context = await init();
    console.timeEnd('#### readonlySourceTest');
  });

  it('Readonly data', async () => {
    const base = await createSakilaProject(context, {
      is_schema_readonly: true,
      is_data_readonly: true,
    });

    const countryTable = await getTable({
      base,
      name: 'country',
    });

    // const sakilaCtx = {
    //   workspace_id: base.fk_workspace_id,
    //   base_id: base.id,
    // };
    //
    // const countryColumns = (await countryTable.getColumns(sakilaCtx)).filter(c => !c.pk);
    // const rowAttributes = Array(99)
    //   .fill(0)
    //   .map((index) =>
    //     generateDefaultRowAttributes({ columns: countryColumns, index }),
    //   );

    const response = await request(context.app)
        .post(`/api/v1/db/data/bulk/noco/${base.id}/${countryTable.id}`)
        .set('xc-auth', context.token)
        .send("test")
        .expect(403);

    console.log("Response for invalid token:");
    console.log(response.body); // Debugging log to verify the response structure

    const response2 = await request(context.app)
        .post(`/api/v1/db/data/bulk/noco/non_existent_data`)
        .set('xc-auth', context.token)
        .send("test")
        .expect(404);

    console.log("Response for non_existent_data:");
    console.log(response2.body); // Debugging log to verify the response structure
  });
}

export default function () {
  describe('insufficientAccess', insufficientAccessTest);
}
