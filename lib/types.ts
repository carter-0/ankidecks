type Deck = {
    id: string;
    user: string;
    name: string;
    cards: Card[];
    dateCreated: Date;
    tokensUsed: number;
    public: boolean;
    imported: boolean;
    key: string;
    tasks?: Task[];
}

type PartialDeck = {
    id: string,
    name: string,
    dateCreated: Date,
    _count: {
        cards: number
    }
}

type Card = {
    id: string;
    front: string;
    back: string;
    type: 'CLOZE' | 'BASIC';
    tags: string;
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

type ScrapedDeck = {
    id: number;
    name: string;
    cardCount: number;
    positiveRatings: number;
    negativeRatings: number;
    ankiId: string;
    dateModified: number;
    topics: ScrapedTopic[];
    urlSafeName: string;
}

type ScrapedTopic = {
    id: number;
    name: string;
    decks: ScrapedDeck[];
}

type ScrapedTopicsWithCount = {
    id: number;
    name: string;
    _count: {
        decks: number
    }
}

type Props = any

type User = {
    id: number;
    userId: string;
    tokenAllowance: number;
    tokensUsed: number;
    stripeCustomerId: string;
    stripeSubscriptionId: string;
    freeAccount: boolean;
}

type Task = {
    id: number;
    userId: string;
    type: string;
    title: string;
    status: string;
    startedAt: Date;
    finishedAt?: Date;
    error?: string;
    deckId?: string;
    deck?: Deck;
}