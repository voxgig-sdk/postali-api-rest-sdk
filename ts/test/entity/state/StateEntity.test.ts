

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { PostaliApiRestSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
loadEnvLocal(__dirname + '/../../../.env.local')


describe('StateEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when POSTALI_API_REST_TEST_LIVE=TRUE.
  afterEach(liveDelay('POSTALI_API_REST_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = PostaliApiRestSDK.test()
    const ent = testsdk.State()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.POSTALI_API_REST_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'state.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"estados","req":false,"short":"List of Mexican states","type":"`$ARRAY`","index$":0}],"name":"state","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{},"contract":{"id":"GET /estados","json":"{\"operationId\":\"getStates\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"estados\":{\"description\":\"List of Mexican states\",\"example\":[\"Aguascalientes\",\"Baja California\",\"Baja California Sur\",\"Campeche\",\"Chiapas\",\"Chihuahua\",\"Ciudad de México\",\"Coahuila\",\"Colima\",\"Durango\"],\"items\":{\"type\":\"string\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"Successful response with list of states\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/estados","segments":[{"lit":"estados"}],"select":{},"transform":{"req":"`reqdata`","res":"`body.estados`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"state","name__orig":"state","Name":"State","name_":"state","name-":"state","NAME":"STATE","index$":2}, {"active":true,"entity":"state","key$":"BasicStateFlow","kind":"basic","name":"BasicStateFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"state_ref01"}}],"index$":0}]}, 'State')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let state_ref01_data = Object.values(setup.data.existing.state)[0] as any

    // LIST
    const state_ref01_ent = client.State()
    const state_ref01_match: any = {}

    const state_ref01_list = (await state_ref01_ent.list(state_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/state/StateTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = PostaliApiRestSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['state01','state02','state03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'POSTALI_API_REST_TEST_STATE_ENTID': idmap,
    'POSTALI_API_REST_TEST_LIVE': 'FALSE',
    'POSTALI_API_REST_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['POSTALI_API_REST_TEST_STATE_ENTID']

  const live = 'TRUE' === env.POSTALI_API_REST_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['POSTALI_API_REST_TEST_STATE_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new PostaliApiRestSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.POSTALI_API_REST_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
