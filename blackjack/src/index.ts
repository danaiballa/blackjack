// const p = require("prompt-sync")();
import { Rules } from "./rules";
import { Player, Dealer, Participant } from "./participant";
import { Deck } from "./deck";
import {
  endMessage,
  formatHand,
  formatScore,
  newMoveMessage,
  newTurnMessage,
  playerLostMessage,
  resultsMessage,
  winMessage,
} from "./display";
import { Card } from "./types";

import * as rl from "readline-sync";

// TODO: put this in mechanics file
function drawAndAdd(
  participant: Participant,
  rules: Rules,
  deck: Deck
): Card | null {
  let card = deck.draw();
  participant.addToHand(card);
  rules.setScore(participant);
  return card;
}

async function main() {
  // TODO: make functions that make a move
  let rules = new Rules();
  let deck = new Deck();
  let player = new Player();
  let dealer = new Dealer();
  // shuffle the cards
  deck.shuffle();

  // draw a card for player
  drawAndAdd(player, rules, deck);
  // show player's hand
  console.log(formatHand(player));
  console.log(formatScore(player));

  // draw a card for dealer
  drawAndAdd(dealer, rules, deck);
  // show dealer's hand
  console.log(formatHand(dealer));
  console.log(formatScore(dealer));

  // draw again a card for player
  drawAndAdd(player, rules, deck);
  console.log(formatHand(player));
  console.log(formatScore(player));

  // draw again a card for dealer but don't show dealer's hand
  drawAndAdd(dealer, rules, deck);
  console.log("dealer drew their second card!\n");

  // TODO: fix this so that newMoveMessage takes as input the array
  // TODO: place a message if option is not one of the two
  // Player's turn
  console.log(newTurnMessage(player));
  while (true) {
    let choise = rl.question(
      newMoveMessage(rules.moveOptions[0], rules.moveOptions[1], player)
    );
    if (choise == "1") {
      drawAndAdd(player, rules, deck);
      console.log(formatHand(player));
      console.log(formatScore(player));
      if (rules.hasLost(player)) {
        break;
      }
    } else {
      break;
    }
  }

  if (rules.hasLost(player)) {
    console.log(playerLostMessage);
    return;
  }

  console.log(newTurnMessage(dealer));
  // print dealer hand and score to show the hidden card
  console.log(formatHand(dealer));
  console.log(formatScore(dealer));
  // dealer draws cards until has to stop or is over 21
  while (!(rules.shouldStop(dealer) || rules.hasLost(dealer))) {
    drawAndAdd(dealer, rules, deck);
    console.log(formatHand(dealer));
    console.log(formatScore(dealer));
  }

  let winner: Participant;
  if (rules.hasLost(dealer)) {
    winner = player;
  } else {
    winner = rules.determineWinner(player, dealer);
  }
  console.log(resultsMessage)
  console.log(formatScore(dealer));
  console.log(formatScore(player));
  console.log(winMessage(winner));
  console.log(endMessage);
}

main();
