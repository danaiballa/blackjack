/** A deck with 52 cards. */
import { Card, Suit, Rank } from "./card";

export class Deck {
  // TODO: restrict suits to be only this array?
  readonly suits: Suit[] = ['club', 'diamond', 'heart', 'spade'];
  readonly ranks: Rank[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
  cards: Card[];

  constructor(){
    this.cards = []
    // TODO-question: could I do this without the nested loop, by using array methods?
    for (let i = 0; i < this.suits.length;  i++){
      for (let j = 0; j < this.ranks.length; j++ ){
        this.cards.push(new Card(this.suits[i], this.ranks[j]))
      }
    }
  }

  /** Fisher–Yates shuffle the deck. */
  shuffle(){
    const total = this.cards.length
    for (let i = 0; i < total; i++){
      let randomIndex = Math.floor(total*Math.random());
      // Swap the elements of index i and randomIndex
      // TODO: is there a way to do this with a built-in method?
      const temp = this.cards[i];
      this.cards[i] = this.cards[randomIndex];
      this.cards[randomIndex] = temp;
    }
  }

  /**  Draw a card. */
  draw(): Card {
    // TODO: Handle the case where the array is empty
    let card = this.cards.pop()!;
    return card
  }
}