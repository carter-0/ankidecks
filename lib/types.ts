type Deck = {
    id: string;
    user: string;
    name: string;
    cards: Card[];
}

type Card = {
    id: string;
    front: string;
    back: string;
    dateCreated: Date;
    dateModified: Date;
    deckId?: string;
    deck?: Deck;
}