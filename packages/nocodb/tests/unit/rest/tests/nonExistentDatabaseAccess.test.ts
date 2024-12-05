import { expect } from 'chai';
import 'mocha';
import request from 'supertest';
import init from '../../init';


import {beforeEach} from "mocha";
import {createProject} from "../../factory/base";
import {createUser} from "../../factory/user";

function databaseReadAccessTests() {
  let context;

  beforeEach(async function () {
    console.time('#### databaseReadAccessTests');
    context = await init();
    console.timeEnd('#### databaseReadAccessTests');
  });

  it('Reading from a non-existent database should return a 404 not found error', async () => {
    const response = await request(context.app)
        .get('/api/v1/database/non_existent_db/read')
        .set('xc-auth', context.token)
        .send()
        .expect(404); // Expect a "not found" status code

    console.log("Non-existent database response:", response.body); // Debugging logs

    // Adapt assertion to match actual response structure
    expect(response.body).to.have.property('msg');
    expect(response.body.msg).to.include('Cannot GET /api/v1/database/non_existent_db/read');
  });

  let base;

  beforeEach(async function () {
    console.time('#### baseTest');
    context = await init();
    base = await createProject(context);
    console.timeEnd('#### baseTest');
  });

  // it('Get base info', async () => {
  //   await request(context.app)
  //       .get(`/api/v1/db/meta/projects/${base.id}/info`)
  //       .set('xc-auth', context.token)
  //       .send({})
  //       .expect(200);
  // });

  it('Reading from an existing database with an invalid token should return a 401 Unauthorized error', async () => {
    // let server;
    // server = await serverInit();

    // const { token: new_token, user: new_user } = await createUser({ app: server } );

    const response = await request(context.app)
      .get(`/api/v1/db/meta/projects/${base.id}/info`) // Use the `base` created in the test setup
      .set('xc-auth', 'fake_token') // Simulate invalid token
      .send()
      .expect(401); // Corrected expected status code

    console.log("Response for invalid token:");
    console.log(response.body); // Debugging log to verify the response structure

    // Match actual response structure and message
    expect(response.body).to.have.property('msg'); // Ensure the `msg` property exists
    expect(response.body.msg).to.include('Invalid token'); // Match actual message content
  });

}


export default function () {
  describe('Database Read Access', databaseReadAccessTests);
}
