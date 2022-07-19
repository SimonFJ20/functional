import { bindIO, getStr, IO, putStr } from "./utils.ts";

const main = (): IO<void> =>
    bindIO(putStr("name? "))(() =>
        bindIO(getStr())((name) => putStr("name is " + name)),
    );

main();
