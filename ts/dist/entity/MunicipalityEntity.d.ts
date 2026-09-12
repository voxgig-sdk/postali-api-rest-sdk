import { PostaliApiRestEntityBase } from '../PostaliApiRestEntityBase';
import type { PostaliApiRestSDK } from '../PostaliApiRestSDK';
import type { Control } from '../types';
import type { Municipality, MunicipalityLoadMatch } from '../PostaliApiRestTypes';
declare class MunicipalityEntity extends PostaliApiRestEntityBase<Municipality> {
    constructor(client: PostaliApiRestSDK, entopts: any);
    make(this: MunicipalityEntity): MunicipalityEntity;
    load(this: any, reqmatch?: MunicipalityLoadMatch, ctrl?: Control): Promise<MunicipalityEntity>;
}
export { MunicipalityEntity };
