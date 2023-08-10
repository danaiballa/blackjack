const p = require('prompt-sync')()
import { BlackJackGame } from "./blackJackGame";
import { Participant } from "./participant";
import { Deck } from "./deck";

function formatScore(participant: Participant): string{
  const [count1, count2] = participant.totalCount;
  let formattedCount = []
  if (count1 == count2 && count1 < 21) {
    formattedCount.push(count1)
  } else if (count1 > 21 || count2 > 21){
    formattedCount.push(Math.min(count1, count2))
  } else {
    formattedCount.push(participant.totalCount)
  }

  return(`${participant.identifier}: ${JSON.stringify(participant.cards)}, count = ${formattedCount} \n`)

}

function main(){
  // TODO: make functions that make a move
  let game = new BlackJackGame();
  let deck = new Deck();
  let player = new Participant('player', [0, 0]);
  let dealer = new Participant('dealer', [0, 0])
  // shuffle the cards
  deck.shuffle();

  // give a card to player and dealer
  game.giveCard(deck, player);
  
  game.giveCard(deck, dealer);
  console.log(formatScore(player))

  // give again a card to player and dealer, but do not show dealer's card
  game.giveCard(deck, player);
  console.log(formatScore(player))

  game.giveCard(deck, dealer);

  // until player has lost or decides to stop
  while (true) {
    let choise = '0'
    while (choise != '1' && choise != '2') {
      // TODO: message appears twice
      choise = p('Draw or stop? 1 for Draw, 2 for Stop \n');
    }
    if (choise == '2') {
      break
    }

    // give a card to the player
    game.giveCard(deck, player);
    console.log(formatScore(player))
    if (game.hasLost(player)) {
      console.log('Sorry, you lose...')
      break
    }
    else if (game.shouldStop(player)){
      break
    }
  }

  // if player has not lost, start with dealer
  if (!game.hasLost(player)){
    // reveal dealer's cards
    console.log(formatScore(dealer))
    let [dealerScore1, dealerScore2] = dealer.totalCount;
    // TODO: add this to the game rules & implement it correctly...
    while (dealerScore1 < 17 && dealerScore2 < 17) {
      game.giveCard(deck, dealer)
      console.log(formatScore(dealer))
      // if dealer has lost, player wins
      if (game.hasLost(dealer)) {
        console.log(`Player wins!`);
        break
      }
      else if (game.shouldStop(dealer)){
        break
      }
    }
  }

  if (!game.hasLost(player) && !game.hasLost(dealer)){
    let winner = game.determineWinner(player, dealer)
    console.log(`Winner is ${winner.identifier}!`)
  }

}

main()