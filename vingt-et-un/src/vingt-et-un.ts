interface Card {
  rank: string;
  suit: string;
}

class Card implements Card{
  /// A card of a deck.
  constructor(
    public rank : string,
    public suit: string,
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

  draw(): Card | null{
    /**
     * Draw a card.
     */
    // TODO: better way to draw cards than throwing errors
    let card = this.cards.pop();
    if (card == undefined){
      throw new Error('Deck is empty!')
    }
    else {
      return card
    }
  }
}

type Identifier = 'player' | 'dealer';

class Participant {
  identifier: Identifier
  totalCount: number = 0;

  constructor(identifier: Identifier){
    this.identifier = identifier;
  }

  incrementTotalCount(score: number){
    this.totalCount += score;
  }

  hasLost(): boolean{
    return (this.totalCount > 21)
  }
}

class VingtEtUnGame{
  /**
   * This is Vingt-et-Un, in this game Ace is counted for 11 (comparing to BlackJack that is either 11 or 1).
   */
  
  dealer: Participant
  player: Participant
  nextPlayer: Participant
  deck: Deck

  rankToScore: { [key: string]: number } = {
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
    "A": 11,
  }

  constructor(){
    this.dealer = new Participant('dealer');
    this.player = new Participant('player');
    this.nextPlayer = this.player;
    // TODO/Question: are arrays passed by reference? In Python, I would first set the deck and then shuffle it, and this.deck would be shuffled.
    let deck = new Deck();
    deck.shuffle();
    this.deck = deck;
  }

  setNextPlayer(){
    this.nextPlayer == this.dealer ? this.nextPlayer = this.player : this.nextPlayer = this.dealer;
  }

  newturn(){
    let card = this.deck.draw();
    console.log('Card is ', card)
    if (card == null){
      const winner = this.selectWinner()
      console.log(winner.identifier)
    } else {
      console.log('Here')
      const suit: string = card.suit
      console.log('rank is ', suit)
      const score = this.rankToScore[suit]
      console.log(score)
      this.nextPlayer.incrementTotalCount(score)
      // this.player.incrementTotalCount(5)

    }
  }

  selectWinner(): Participant {
    return this.dealer
  }
  

}



function main(){
  const deck = new Deck();
  console.log(deck)
  deck.shuffle()
  // console.log(deck)
  const game = new VingtEtUnGame();
  console.log(game.rankToScore['J'])
  console.log(game.rankToScore["3"])
  // console.log()
  game.newturn()
}

main()