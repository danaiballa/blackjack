import { Card } from "./card";
import { Deck } from "./deck";
import { Participant } from "./participant";

// TODO: cleanup code
// TODO: should we make things readonly?


export class BlackJackGame{

  // TODO: can I make the key to rank?
  rankToScore: { [key: string]: [number, number]} = {
    "1": [1, 1],
    "2": [2, 2],
    "3": [3, 3],
    "4": [4, 4],
    "5": [5, 5],
    "6": [6, 6],
    "7": [7, 7],
    "8": [8, 8],
    "9": [9, 9],
    "10": [10, 10],
    "J": [10, 10],
    "Q": [10, 10],
    "K": [10, 10],
    "A": [1, 11],
  }

  incrementTotalCount(participant: Participant, score: [number, number]): void{
    for (let i=0; i< participant.totalCount.length; i++){
      participant.totalCount[i] += score[i]
    }
  }


  hasLost(participant: Participant): boolean{
    let [score1, score2] = participant.totalCount;
    if (score1 > 21 && score2 > 21) {
      return true
    }
    return false
  }

  shouldStop(participant: Participant): boolean {
    let [score1, score2] = participant.totalCount;
    if (score1 == 21 || score2 == 21) {
      return true
    }
    return false
  }

  /** Give a card and add the rank of the card to player's data. */
  giveCard(deck: Deck, participant: Participant): Card {
    let card = deck.draw()
    let score = this.rankToScore[card.rank]
    this.incrementTotalCount(participant, score)
    participant.addCard(card)
    return card
  }

  determineWinner(player: Participant, dealer: Participant): Participant {
    // TODO: handle blackjack case (player wins!)
    // TODO: this shouldn't be working...
    return (player.totalCount > dealer.totalCount ? player : dealer)
  }
}


