export type Suit = "club" | "diamond" | "heart" | "spade";
export type Rank =
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "10"
  | "J"
  | "Q"
  | "K"
  | "A";

export type Card = {
    suit: Suit,
    rank: Rank,
}

export type MoveOption = {
  optionNumber: string,
  optionName: "hit" | 'stand',
}