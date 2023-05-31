type Deck = {
    id: string;
    user: string;
    name: string;
    cards: Card[];
    dateCreated: Date;
    public: boolean;
}

type Card = {
    id: string;
    front: string;
    back: string;
    type: 'CLOZE' | 'BASIC';
    dateCreated: Date;
    dateModified: Date;
    deckId?: string;
    deck?: Deck;
}

type RawCard = {
    type: 'BASIC' | 'CLOZE';
    question: string;
    answer?: string;
}