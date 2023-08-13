import { type } from "os";
import { Card } from "./card";

type Identifier = 'player' | 'dealer';

export class Participant implements Participant{
  readonly identifier: Identifier
  totalCount: [number, number];
  cards: Card[] = [];

  constructor(identifier: Identifier, totalCount: [number, number]){
    this.identifier = identifier;
    this.totalCount = totalCount;
  }

  addCard(card: Card): void {
    this.cards.push(card)
  }

}
