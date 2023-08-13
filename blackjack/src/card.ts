export type Suit = 'club'| 'diamond' | 'heart'| 'spade'
export type Rank = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K' | 'A'

/** A card of a deck. */
export class Card implements Card{
  // TODO/Question: If I put values in different order (for example Card(rank, suit) - this happened), Card is not created correctly. How to fix it?
  constructor(
    public suit: Suit,
    public rank: Rank,
  ) {}
}