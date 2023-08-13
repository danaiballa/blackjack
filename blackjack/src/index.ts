const p = require('prompt-sync')()
import { BlackJackGame } from "./blackJackGame";
import { Participant } from "./participant";
import { Deck } from "./deck";
import { formatData } from "./display";

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
  console.log(formatData(player))

  // give again a card to player and dealer, but do not show dealer's card
  game.giveCard(deck, player);
  console.log(formatData(player))

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
    console.log(formatData(player))
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
    console.log(formatData(dealer))
    console.log(dealer.totalCount)
    // TODO: implement it correctly...
    while (!game.shouldStop(dealer)) {
//       dealer: [{"suit":"diamond","rank":"2"},{"suit":"heart","rank":"3"},{"suit":"heart","rank":"6"},{"suit":"club","rank":"1"},{"suit":"spade","rank":"8"}], count = 20 

// dealer: [{"suit":"diamond","rank":"2"},{"suit":"heart","rank":"3"},{"suit":"heart","rank":"6"},{"suit":"club","rank":"1"},{"suit":"spade","rank":"8"},{"suit":"diamond","rank":"6"}], count = 26 
      game.giveCard(deck, dealer)
      console.log(formatData(dealer))
      console.log(dealer.totalCount)
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