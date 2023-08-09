const p = require('prompt-sync')()

// TODO: cleanup code

interface Card {
  suit: string,
  rank: string,
}

class Card implements Card{
  /// A card of a deck.
  constructor(
    public suit: string,
    public rank: string,
  ) {}
}

class Deck {
  /// 52 cards
  suits = ['club', 'diamond', 'heart', 'spade'];
  ranks = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
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

  shuffle(){
    /** 
    * Fisher–Yates shuffle the deck. 
    */
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

  draw(): Card {
    /**
     * Draw a card.
     */
    // TODO: This throws an error if card array is empty.
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

  incrementTotalCount(score: number){
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
    // TODO: should we also add the card to participant's data?
    /** Give a card and add the rank of the card to player's data. */

    let card = this.deck.draw()
    let score = this.rankToScore[card.rank]

    if ( Array.isArray(score)) {
      participant.willLose(score[1]) ? participant.incrementTotalCount(score[0]) : participant.incrementTotalCount(score[1])
    } else {
      participant.incrementTotalCount(score)
    }
    return card
  }

  determineWinner(player: Participant, dealer: Participant): Participant {
    return (player.totalCount > dealer.totalCount ? player : dealer)
  }
}



function main(){
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