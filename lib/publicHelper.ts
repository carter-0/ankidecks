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
    return cards * 250
}
