import { Card, Suit } from "./card";
import { Participant } from "./participant";

export type SuitToSymbol = {
    [key in Suit]: string;
  };

const suitToSymbol: SuitToSymbol = {
  "spade": `\u2660`,
  "heart": `\u2665`,
  "diamond": `\u2666`,
  "club": `\u2663`,
}

function formatCards(cards: Card[]): string {
  let formattedCards = cards.map(card => {
    return `${suitToSymbol[card.suit]}${card.rank}`
  })
  return formattedCards.join(" ")
}

export function formatData(participant: Participant): string{
  
  const [count1, count2] = participant.totalCount;
  let formattedCount = []
  if (count1 == count2 && count1 <= 21) {
    formattedCount.push(count1)
  } else if (count1 > 21 || count2 > 21){
    formattedCount.push(Math.min(count1, count2))
  } else if (count1 == 21 || count2 == 21){
    formattedCount.push(21)
  } else {
    formattedCount.push(participant.totalCount)
  }

  return(`${participant.identifier}: ${formatCards(participant.cards)}, count = ${formattedCount} \n`)
}

