import { PostaliApiRestEntityBase } from '../PostaliApiRestEntityBase';
import type { PostaliApiRestSDK } from '../PostaliApiRestSDK';
import type { Control } from '../types';
import type { State, StateListMatch } from '../PostaliApiRestTypes';
declare class StateEntity extends PostaliApiRestEntityBase<State> {
    constructor(client: PostaliApiRestSDK, entopts: any);
    make(this: StateEntity): StateEntity;
    list(this: any, reqmatch?: StateListMatch, ctrl?: Control): Promise<StateEntity[]>;
}
export { StateEntity };
