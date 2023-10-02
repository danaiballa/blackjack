import { Card } from "./types";

export abstract class Participant {
  abstract identifier: "player" | "dealer";
  hand: Card[] = [];
  score: number = 0;

  // TODO: does it make sense to take as input 'null'?
  addToHand(card: Card | null): void {
    if (card == null) {
      return;
    } else {
      this.hand.push(card);
    }
  }
}

export class Player extends Participant {
  // TODO: set the name
  // TODO: does the identifier field make sense? how should we set it?
  readonly identifier: "player" | "dealer";
  constructor() {
    super();
    this.identifier = "player";
  }
}

export class Dealer extends Participant {
  readonly identifier: "dealer" | "dealer";
  constructor() {
    super();
    this.identifier = "dealer";
  }
}
