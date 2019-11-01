import { genSalt , hash as _hash, compare as _compare} from "bcryptjs";

export async function hash(plain: string) : Promise<string>{
    const salt = await genSalt(7);
    return _hash(plain, salt);
}

export async function compare(str: string, hash: string) {
    return _compare(str, hash);
}