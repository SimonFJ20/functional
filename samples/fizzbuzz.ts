import {
    concat,
    flattenIO,
    IO,
    map,
    putStrLn,
    range,
    string,
    String,
} from "../utils.ts";

type FizzBuzz = (n: number) => String;

const fizzbuzzDoubleCheck: FizzBuzz = (n) =>
    n % 3 === 0
        ? n % 5 === 0
            ? string("FizzBuzz")
            : string("Fizz")
        : n % 5 === 0
        ? string("Buzz")
        : string(n.toString());

const fizzbuzz: FizzBuzz = (n) =>
    ((test) =>
        ((fizz, buzz, id) => fizz(buzz(id))(string(n.toString())))(
            test(3, string("Fizz")),
            test(5, string("Buzz")),
            (s: String) => s,
        ))(
        (c: number, s: String) => (f: (s: String) => String) =>
            n % c === 0 ? () => concat(s)(f(string(""))) : f,
    );

const main = (): IO<void> =>
    flattenIO(map(range(1)(100))((n) => putStrLn(fizzbuzz(n))));

main()();
