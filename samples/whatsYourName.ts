import { bindIO, getStr, IO, putStr, string } from "../utils.ts";

const main = (): IO<void> =>
    bindIO(putStr(string("name? ")))(() =>
        bindIO(getStr())((name) => putStr(string("name is " + name))),
    );

main()();
