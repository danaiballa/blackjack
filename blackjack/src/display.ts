import { Card, Suit, MoveOption } from "./types";
import { Participant, Player } from "./participant";

export const playerLostMessage = `Sorry, you lose...\n`;
export const endMessage = "Game ends!\n";

export function newTurnMessage(participant: Participant): string {
  return `------------- ${participant.identifier}'s turn -------------\n`;
}

export const resultsMessage = `------------- Results -------------\n`

const suitToSymbol: { [key in Suit]: string } = {
  spade: `\u2660`,
  heart: `\u2665`,
  diamond: `\u2666`,
  club: `\u2663`,
};

// TODO: format options
export function newMoveMessage(
  option1: MoveOption,
  option2: MoveOption,
  player: Player,
): string {
  return `${option1.optionName} or ${option2.optionName}?\n
  ${option1.optionNumber} for ${option1.optionName} and ${option2.optionNumber} for ${option2.optionName}\n
  ${formatScore(player)}`;
}

function formatCards(cards: Card[]): string {
  let formattedCards = cards.map((card) => {
    return `${suitToSymbol[card.suit]}${card.rank}`;
  });
  return formattedCards.join(" ");
}

export function formatHand(participant: Participant): string {
  return `${participant.identifier}: ${formatCards(participant.hand)}\n`;
}

export function formatScore(participant: Participant): string {
  return `Total for ${participant.identifier} is: ${participant.score}\n`;
}

export function winMessage(participant: Participant): string {
  return `Winner is: ${participant.identifier}!\n`;
}
