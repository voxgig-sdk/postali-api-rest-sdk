import { MunicipalityEntity } from './entity/MunicipalityEntity';
import { PostalCodeEntity } from './entity/PostalCodeEntity';
import { StateEntity } from './entity/StateEntity';
export type * from './PostaliApiRestTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { PostaliApiRestEntityBase } from './PostaliApiRestEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class PostaliApiRestSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    _rawRequest(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    Municipality(entopts?: Record<string, any>): MunicipalityEntity;
    PostalCode(entopts?: Record<string, any>): PostalCodeEntity;
    State(entopts?: Record<string, any>): StateEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): PostaliApiRestSDK;
    tester(testopts?: any, sdkopts?: any): PostaliApiRestSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof PostaliApiRestSDK;
export { stdutil, config, BaseFeature, PostaliApiRestEntityBase, PostaliApiRestSDK, SDK, };
