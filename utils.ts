export const panic = (m: string) => {
    throw new Error(m);
};

export const None = Symbol("None");
export type Option<T> = T | typeof None;
export const none: <T>() => Option<T> = () => None;
export const some: <T>(v: T) => Option<T> = (v) => v;
export const isNone: <T>(v: Option<T>) => boolean = (v) => v === None;
export const isSome: <T>(v: Option<T>) => boolean = (v) => v !== None;
export const bindOption: <A>(
    v: Option<A>,
) => <B>(a: (v: A) => Option<B>) => Option<B> = (v) => (a) =>
    v !== None ? a(v) : None;

export type IO<T> = () => T;
export const putStr: (v: string) => IO<void> = (v) => () => console.log(v);
export const getStr: () => IO<string> = () => () => prompt("", "") ?? "";
export const bindIO: <A>(v: IO<A>) => <B>(a: (v: A) => IO<B>) => IO<B> =
    (v) => (a) => () =>
        a(v())();

export type Pair<L, R> = { fst: L; snd: R };
export const pair: <L, R>(fst: L, snd: R) => Pair<L, R> = (fst, snd) => ({
    fst,
    snd,
});
export const fst: <L, R>(p: Pair<L, R>) => L = (p) => p.fst;
export const snd: <L, R>(p: Pair<L, R>) => R = (p) => p.snd;

// type List<T> = Option<Pair<T, List<T>>>;
export type List<T> = Option<{ fst: T; snd: List<T> }>;
export const head: <T>(l: List<T>) => T = (l) =>
    l === None ? panic("list out of range") : fst(l);
export const tail: <T>(l: List<T>) => List<T> = (l) =>
    l === None ? panic("list out of range") : snd(l);
export const length: <T>(l: List<T>) => number = (l) =>
    isNone(l) ? 0 : length(tail(l));
export const map: <T>(l: List<T>) => <R>(a: (v: T) => R) => List<R> =
    (l) => (a) =>
        isNone(l) ? None : pair(a(head(l)), map(tail(l))(a));
export const range: (b: number) => (e: number) => List<number> = (b) => (e) =>
    b === e ? None : pair(b, range(b + 1)(e));
