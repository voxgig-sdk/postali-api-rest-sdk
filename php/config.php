<?php
declare(strict_types=1);

// PostaliApiRest SDK configuration

class PostaliApiRestConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "PostaliApiRest",
                "slug" => "postali-api-rest",
                "version" => "0.0.1",
                "target" => "php",
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
          'transport' => 'base',
        ],
            ],
            "options" => [
                "base" => "https://postali.app/api",
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "municipality" => [],
                    "postal_code" => [],
                    "state" => [],
                ],
            ],
            "entity" => [
        'municipality' => [
          'fields' => [
            [
              'name' => 'estado',
              'short' => 'State name',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'municipios',
              'short' => 'List of municipalities',
              'type' => '`$ARRAY`',
            ],
          ],
          'name' => 'municipality',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'example' => 'Ciudad de México',
                        'kind' => 'param',
                        'name' => 'state',
                        'orig' => 'state',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/municipios/{state}',
                  'parts' => [
                    'municipios',
                    '{state}',
                  ],
                  'select' => [
                    'exist' => [
                      'state',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [
              [
                'municipio',
              ],
            ],
          ],
        ],
        'postal_code' => [
          'fields' => [
            [
              'name' => 'ciudad',
              'short' => 'City name',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'codigo_postal',
              'short' => 'Postal code',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'colonias',
              'short' => 'List of settlements/neighborhoods',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'estado',
              'short' => 'State name',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'municipio',
              'short' => 'Municipality name',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'postal_code',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'example' => '01000',
                        'kind' => 'param',
                        'name' => 'postal_code',
                        'orig' => 'postal_code',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/codigo_postal/{postalCode}',
                  'parts' => [
                    'codigo_postal',
                    '{postal_code}',
                  ],
                  'rename' => [
                    'param' => [
                      'postalCode' => 'postal_code',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'postal_code',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [
              [
                'codigo_postal',
              ],
            ],
          ],
        ],
        'state' => [
          'fields' => [
            [
              'name' => 'estados',
              'short' => 'List of Mexican states',
              'type' => '`$ARRAY`',
            ],
          ],
          'name' => 'state',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/estados',
                  'parts' => [
                    'estados',
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.estados`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return PostaliApiRestFeatures::make_feature($name);
    }
}
