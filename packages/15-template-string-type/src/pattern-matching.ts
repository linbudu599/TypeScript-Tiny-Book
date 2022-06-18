type ReverseName<Str extends string> =
  Str extends `${infer First} ${infer Last}`
    ? `${Capitalize<Last>} ${First}`
    : Str;

type ReversedTomHardy = ReverseName<'Tom hardy'>; // "Hardy Tom"
type ReversedLinbudu = ReverseName<'Lin budu'>; // "Budu Lin"

type ReversedRes1 = ReverseName<'Lin Budu 599'>; // "Budu 599 Lin"

declare function handler<Str extends string>(arg: `Guess who is ${Str}`): Str;

handler(`Guess who is Linbudu`); // "Linbudu"
handler(`Guess who is `); // ""
handler(`Guess who is  `); // " "

handler(`Guess who was`); // Error
handler(``); // Error
