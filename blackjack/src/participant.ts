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
  // TODO: doesn't make sense to set 'player' twice...
  // TODO: set the name
  readonly identifier: "player";
  constructor() {
    super();
    this.identifier = "player";
  }
}

export class Dealer extends Participant {
  readonly identifier: "dealer";
  constructor() {
    super();
    this.identifier = "dealer";
  }
}
