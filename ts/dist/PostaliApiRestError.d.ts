import { Context } from './Context';
declare class PostaliApiRestError extends Error {
    isPostaliApiRestError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
}
export { PostaliApiRestError };
