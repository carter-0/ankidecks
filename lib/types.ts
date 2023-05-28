type Deck = {
    id: string;
    user: string;
    name: string;
    cards: Card[];
    dateCreated: Date;
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