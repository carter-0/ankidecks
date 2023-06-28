export const deleteDeck = async (deckId: string, fetch: any) => {
    const response = await fetch(`/api/decks/${deckId}`, {
        method: "DELETE",
    })

    if (!response.ok) {
        throw new Error(response.statusText)
    }

    return response.json()
}

export const deleteCards = async (deckId: string, cardIds: string[], fetch: any) => {
    for (const cardId of cardIds) {
        const response = await fetch(`/api/decks/${deckId}/cards/${cardId}`, {
            method: "DELETE",
        })

        if (!response.ok) {
            throw new Error(response.statusText)
        }
    }

    return { success: true }
}

export const getTokenEstimate = async (document: string) : Promise<{ success: boolean, tokens: number }> => {
    const response = await fetch(`/api/token-estimate`, {
        method: "POST",
        body: JSON.stringify({ input: document })
    })

    if (!response.ok) {
        throw new Error(response.statusText)
    }

    return response.json()
}

export const getVariationTokenEstimate = (cards: number) : number => {
    // In this case, input is the number of cards present in the deck of which a variation will be generated.
    // To simplify this code, I'm just assuming each card will use about 100 tokens. This *could* be abused later on, but it's fine for now.
    return cards * 100
}

export const getTagTokenEstimate = (tags: number) : number => {
    // In this case, input is the number of cards present in the deck of which tags will be added.
    // To simplify this code, I'm just assuming each card will use about 100 tokens. This *could* be abused later on, but it's fine for now.
    return tags * 100
}
