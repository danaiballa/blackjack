/** A deck with 52 cards. */
import { Card, Suit, Rank } from "./types";

export class Deck {
  // TODO: restrict suits to be only this array?
  // TODO: perhaps this should be taken as input in constructor
  private readonly suits: Suit[] = ["club", "diamond", "heart", "spade"];
  private readonly ranks: Rank[] = [
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
    "A",
  ];
  cards: Card[];

  constructor() {
    this.cards = [];
    for (const suit of this.suits) {
      for (const rank of this.ranks) {
        this.cards.push({ suit, rank });
      }
    }
  }

  /** Fisher–Yates shuffle the deck. */
  shuffle() {
    const total = this.cards.length;
    for (let i = 0; i < total; i++) {
      let randomIndex = Math.floor(total * Math.random());
      // Swap the elements of index i and randomIndex
      // TODO: is there a way to do this with a built-in method?
      const temp = this.cards[i];
      this.cards[i] = this.cards[randomIndex];
      this.cards[randomIndex] = temp;
    }
  }

  /**  Draw a card. */
  draw(): Card | null {
    if (this.cards.length == 0) {
      return null;
    } else {
      return this.cards.pop()!;
    }
  }
}
