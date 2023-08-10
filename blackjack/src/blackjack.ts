const p = require('prompt-sync')()

// TODO: cleanup code
// TODO: should we make things readonly?


type Suit = 'club'| 'diamond' | 'heart'| 'spade'
type Rank = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K' | 'A'

interface Card {
  suit: Suit,
  rank: Rank,
}

/** A card of a deck. */
class Card implements Card{
  // TODO/Question: If I put values in different order (for example Card(rank, suit) - this happened), Card is not created correctly. How to fix it?
  constructor(
    public suit: Suit,
    public rank: Rank,
  ) {}
}

/** A deck with 52 cards. */
class Deck {
  // TODO: restrict suits to be only this array?
  suits: Suit[] = ['club', 'diamond', 'heart', 'spade'];
  ranks: Rank[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
  cards: Card[];

  constructor(){
    this.cards = []
    // TODO-question: could I do this without the nested loop, by using array methods?
    for (let i = 0; i < this.suits.length;  i++){
      for (let j = 0; j < this.ranks.length; j++ ){
        this.cards.push(new Card(this.suits[i], this.ranks[j]))
      }
    }
  }

  /** Fisher–Yates shuffle the deck. */
  shuffle(){
    const total = this.cards.length
    for (let i = 0; i < total; i++){
      let randomIndex = Math.floor(total*Math.random());
      // Swap the elements of index i and randomIndex
      // TODO: is there a way to do this with a built-in method?
      const temp = this.cards[i];
      this.cards[i] = this.cards[randomIndex];
      this.cards[randomIndex] = temp;
    }
  }

  /**  Draw a card. */
  draw(): Card {
    // TODO: Handle the case where the array is empty
    let card = this.cards.pop()!;
    return card
  }
}

type Identifier = 'player' | 'dealer';

class Participant {
  identifier: Identifier
  totalCount: number = 0;
  cards: Card[] = [];

  constructor(identifier: Identifier){
    this.identifier = identifier;
  }

  addCard(card: Card): void {
    this.cards.push(card)
  }

  incrementTotalCount(score: number): void{
    this.totalCount += score;
  }

  hasLost(): boolean{
    return (this.totalCount > 21)
  }

  willLose(score: number): boolean{
    return (this.totalCount + score > 21)
  }
}

class BlackJackGame{
  
  // TODO: remove these from attributes
  dealer: Participant
  player: Participant
  deck: Deck

  // TODO: can I make the key to rank?
  rankToScore: { [key: string]: number | [number, number]} = {
    "1": 1,
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    "10": 10,
    "J": 10,
    "Q": 10,
    "K": 10,
    "A": [1, 11],
  }


  constructor(){
    this.dealer = new Participant('dealer');
    this.player = new Participant('player');
    this.deck = new Deck()
  }

  giveCard(participant: Participant): Card {
    // TODO: should we also add the card to participant's cards?
    /** Give a card and add the rank of the card to player's data. */

    let card = this.deck.draw()
    let score = this.rankToScore[card.rank]
    // TODO: check call signatures for this (Udemy lesson)
    // TODO: if A + 4 = 15, then if I draw 10 it can be 15 again (instead of 25)
    // so we can have 2 options and log both (perhaps function overloading might help)
    if ( Array.isArray(score)) {
      participant.willLose(score[1]) ? participant.incrementTotalCount(score[0]) : participant.incrementTotalCount(score[1])
    } else {
      participant.incrementTotalCount(score)
    }
    return card
  }

  determineWinner(player: Participant, dealer: Participant): Participant {
    // TODO: handle blackjack case (player wins!)
    return (player.totalCount > dealer.totalCount ? player : dealer)
  }
}



function main(){
  // TODO: make functions that make a move
  let game = new BlackJackGame();
  // shuffle the cards
  game.deck.shuffle();

  // give a card to player and dealer
  const playerCardInit1 = game.giveCard(game.player);
  game.player.addCard(playerCardInit1)
  
  const dealerCardInit1 = game.giveCard(game.dealer);
  game.dealer.addCard(dealerCardInit1)
  console.log(`Dealer: ${JSON.stringify(game.dealer.cards)}, count = ${game.dealer.totalCount}`)

  // give again a card to player and dealer, but do not show dealer's card
  const playerCardInit2 = game.giveCard(game.player);
  game.player.addCard(playerCardInit2)
  console.log(`Player: ${JSON.stringify(game.player.cards)}, count = ${game.player.totalCount}`)

  const dealerCardInit2 = game.giveCard(game.dealer);
  game.dealer.addCard(dealerCardInit2)

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
    const playerCard = game.giveCard(game.player);
    game.player.addCard(playerCard)
    console.log(`Player: ${JSON.stringify(game.player.cards)}, count = ${game.player.totalCount}`)
    if (game.player.hasLost()) {
      console.log('Sorry, you lose...')
      break
    }
  }

  // if player has not lost, start with dealer
  if (!game.player.hasLost()){
    // reveal dealer's cards
    console.log(`Dealer: ${JSON.stringify(game.dealer.cards)}, count = ${game.dealer.totalCount}`)
    while (game.dealer.totalCount < 17) {
      const dealerCard = game.giveCard(game.dealer)
      game.dealer.addCard(dealerCard)
      console.log(`Dealer: ${JSON.stringify(game.dealer.cards)}, count = ${game.dealer.totalCount}`)
      // if dealer has lost, player wins
      if (game.dealer.hasLost()) {
        console.log(`Player wins!`);
        break
      }
    }
  }

  if (!game.player.hasLost() && !game.dealer.hasLost()){
    let winner = game.determineWinner(game.player, game.dealer)
    console.log(`Winner is ${winner.identifier}!`)
  }

}

main()