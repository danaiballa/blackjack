import { Deck } from "../src/deck";

describe("Deck tests", () => {
  test("Deck hash 52 cards", () => {
    const deck = new Deck();
    expect(deck.cards.length).toBe(52);
  });

  // TODO: right now the test doesn't work - write a test for this case
  // test("Card order in deck is different after shuffling", () => {
  //   const unshuffledDeck = new Deck();
  //   const deckToShuffle = new Deck();
  //   deckToShuffle.shuffle();
  //   expect(unshuffledDeck.cards).not.toBe(deckToShuffle.cards);
  // })

  test("Deck has no cards after drawing them all", () => {
    const deck = new Deck();
    const total = deck.cards.length;
    for (let i = 0; i < total; i++) {
      deck.draw();
    }
    expect(deck.cards.length).toBe(0);
    const shouldBeNull = deck.draw();
    expect(shouldBeNull).toBe(null);
  });
});
