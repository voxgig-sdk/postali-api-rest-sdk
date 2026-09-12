import { PostaliApiRestEntityBase } from '../PostaliApiRestEntityBase';
import type { PostaliApiRestSDK } from '../PostaliApiRestSDK';
import type { Control } from '../types';
import type { PostalCode, PostalCodeLoadMatch } from '../PostaliApiRestTypes';
declare class PostalCodeEntity extends PostaliApiRestEntityBase<PostalCode> {
    constructor(client: PostaliApiRestSDK, entopts: any);
    make(this: PostalCodeEntity): PostalCodeEntity;
    load(this: any, reqmatch?: PostalCodeLoadMatch, ctrl?: Control): Promise<PostalCodeEntity>;
}
export { PostalCodeEntity };
