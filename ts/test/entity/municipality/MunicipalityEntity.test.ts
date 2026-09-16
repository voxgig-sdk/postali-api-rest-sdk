

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


describe('MunicipalityEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when POSTALI_API_REST_TEST_LIVE=TRUE.
  afterEach(liveDelay('POSTALI_API_REST_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = PostaliApiRestSDK.test()
    const ent = testsdk.Municipality()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.POSTALI_API_REST_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'municipality.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"estado","req":false,"short":"State name","type":"`$STRING`","index$":0},{"active":true,"name":"municipios","req":false,"short":"List of municipalities","type":"`$ARRAY`","index$":1}],"name":"municipality","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"example":"Ciudad de México","kind":"param","name":"state","orig":"state","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /municipios/{state}","json":"{\"operationId\":\"getMunicipalitiesByState\",\"parameters\":[{\"description\":\"Mexican state name or code\",\"in\":\"path\",\"name\":\"state\",\"required\":true,\"schema\":{\"example\":\"Ciudad de México\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"estado\":{\"description\":\"State name\",\"example\":\"Ciudad de México\",\"type\":\"string\"},\"municipios\":{\"description\":\"List of municipalities\",\"example\":[\"Álvaro Obregón\",\"Azcapotzalco\",\"Benito Juárez\"],\"items\":{\"type\":\"string\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"Successful response with list of municipalities\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"example\":\"Postal code not found\",\"type\":\"string\"},\"message\":{\"description\":\"Detailed error description\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"State not found\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/municipios/{state}","segments":[{"lit":"municipios"},{"var":"state"}],"select":{"exist":["state"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[["municipio"]]},"key$":"municipality","name__orig":"municipality","Name":"Municipality","name_":"municipality","name-":"municipality","NAME":"MUNICIPALITY","index$":0}, {"active":true,"entity":"municipality","key$":"BasicMunicipalityFlow","kind":"basic","name":"BasicMunicipalityFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"municipality_ref01","srcdatavar":"municipality_ref01_data","suffix":"_dt0"},"match":{"id":"municipality01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-municipality_ref01"}}],"index$":0}]}, 'Municipality')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let municipality_ref01_data = Object.values(setup.data.existing.municipality)[0] as any

    // LOAD: skipped — no entity id field and load requires path params.
    // Entity-var is declared here so later flow steps still compile.
    const municipality_ref01_ent = client.Municipality()


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/municipality/MunicipalityTestData.json')

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
    ['municipality01','municipality02','municipality03','municipio01','municipio02','municipio03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'POSTALI_API_REST_TEST_MUNICIPALITY_ENTID': idmap,
    'POSTALI_API_REST_TEST_LIVE': 'FALSE',
    'POSTALI_API_REST_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['POSTALI_API_REST_TEST_MUNICIPALITY_ENTID']

  const live = 'TRUE' === env.POSTALI_API_REST_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['POSTALI_API_REST_TEST_MUNICIPALITY_ENTID']
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
  
