import { Dealer, Participant, Player } from "./participant";
import { MoveOption, Rank } from "./types";

export class Rules {
  // TODO: should this be here?

  readonly moveOptions: MoveOption[] = [
    {
      optionName: "hit",
      optionNumber: "1",
    },
    {
      optionName: "stand",
      optionNumber: "2",
    },
  ];
  readonly maxScore: number = 21;
  dealerStops: number = 17;

  private readonly rankToScore: { [key in Rank]: number } = {
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    "10": 10,
    J: 10,
    Q: 10,
    K: 10,
    A: 11,
  };

  setScore(participant: Participant) {
    let count = 0;
    let hasAce = false;
    participant.hand.forEach((card) => {
      count += this.rankToScore[card.rank];
      if (card.rank == "A") {
        hasAce = true;
      }
    });
    if (hasAce && count > 21 && count - 10 < 21) {
      count -= 10;
    }
    participant.score = count;
  }

  hasLost(participant: Participant): boolean {
    return participant.score > this.maxScore;
  }

  shouldStop(dealer: Dealer) {
    return dealer.score >= this.dealerStops;
  }

  determineWinner(player: Player, dealer: Dealer): Participant {
    if (player.score > dealer.score) {
      return player;
    } else {
      return dealer;
    }
  }
}
