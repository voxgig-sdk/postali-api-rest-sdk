

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


describe('PostalCodeEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when POSTALI_API_REST_TEST_LIVE=TRUE.
  afterEach(liveDelay('POSTALI_API_REST_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = PostaliApiRestSDK.test()
    const ent = testsdk.PostalCode()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.POSTALI_API_REST_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'postal_code.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"ciudad","req":false,"short":"City name","type":"`$STRING`","index$":0},{"active":true,"name":"codigo_postal","req":false,"short":"Postal code","type":"`$STRING`","index$":1},{"active":true,"name":"colonias","req":false,"short":"List of settlements/neighborhoods","type":"`$ARRAY`","index$":2},{"active":true,"name":"estado","req":false,"short":"State name","type":"`$STRING`","index$":3},{"active":true,"name":"municipio","req":false,"short":"Municipality name","type":"`$STRING`","index$":4}],"name":"postal_code","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"example":"01000","kind":"param","name":"postal_code","orig":"postal_code","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /codigo_postal/{postalCode}","json":"{\"operationId\":\"getByPostalCode\",\"parameters\":[{\"description\":\"Mexican postal code (5 digits)\",\"in\":\"path\",\"name\":\"postalCode\",\"required\":true,\"schema\":{\"example\":\"01000\",\"pattern\":\"^[0-9]{5}$\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"ciudad\":{\"description\":\"City name\",\"example\":\"Ciudad de México\",\"type\":\"string\"},\"codigo_postal\":{\"description\":\"Postal code\",\"example\":\"01000\",\"type\":\"string\"},\"colonias\":{\"description\":\"List of settlements/neighborhoods\",\"example\":[\"San Ángel\",\"Tizapán\"],\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"estado\":{\"description\":\"State name\",\"example\":\"Ciudad de México\",\"type\":\"string\"},\"municipio\":{\"description\":\"Municipality name\",\"example\":\"Álvaro Obregón\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Successful response with postal code information\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"example\":\"Postal code not found\",\"type\":\"string\"},\"message\":{\"description\":\"Detailed error description\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Invalid postal code format\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"example\":\"Postal code not found\",\"type\":\"string\"},\"message\":{\"description\":\"Detailed error description\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Postal code not found\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/codigo_postal/{postalCode}","rename":{"param":{"postalCode":"postal_code"}},"segments":[{"lit":"codigo_postal"},{"var":"postal_code"}],"select":{"exist":["postal_code"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[["codigo_postal"]]},"key$":"postal_code","name__orig":"postal_code","Name":"PostalCode","name_":"postal_code","name-":"postal-code","NAME":"POSTAL_CODE","index$":1}, {"active":true,"entity":"postal_code","key$":"BasicPostalCodeFlow","kind":"basic","name":"BasicPostalCodeFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"postal_code_ref01","srcdatavar":"postal_code_ref01_data","suffix":"_dt0"},"match":{"id":"postal_code01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-postal_code_ref01"}}],"index$":0}]}, 'PostalCode')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let postal_code_ref01_data = Object.values(setup.data.existing.postal_code)[0] as any

    // LOAD: skipped — no entity id field and load requires path params.
    // Entity-var is declared here so later flow steps still compile.
    const postal_code_ref01_ent = client.PostalCode()


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/postal_code/PostalCodeTestData.json')

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
    ['postal_code01','postal_code02','postal_code03','codigo_postal01','codigo_postal02','codigo_postal03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'POSTALI_API_REST_TEST_POSTAL_CODE_ENTID': idmap,
    'POSTALI_API_REST_TEST_LIVE': 'FALSE',
    'POSTALI_API_REST_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['POSTALI_API_REST_TEST_POSTAL_CODE_ENTID']

  const live = 'TRUE' === env.POSTALI_API_REST_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['POSTALI_API_REST_TEST_POSTAL_CODE_ENTID']
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
  
