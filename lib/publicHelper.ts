export const deleteDeck = async (deckId: string) => {
    const response = await fetch(`/api/decks/${deckId}`, {
        method: "DELETE",
    })

    if (!response.ok) {
        throw new Error(response.statusText)
    }

    return response.json()
}

export const deleteCards = async (deckId: string, cardIds: string[]) => {
    cardIds.forEach(async (cardId) => {
        const response = await fetch(`/api/decks/${deckId}/cards/${cardId}`, {
            method: "DELETE",
        })

        if (!response.ok) {
            throw new Error(response.statusText)
        }
    })

    return { success: true }
}