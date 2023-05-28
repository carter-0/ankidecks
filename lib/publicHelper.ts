export const deleteDeck = async (deckId: string) => {
    const response = await fetch(`/api/decks/${deckId}`, {
        method: "DELETE",
    })

    if (!response.ok) {
        throw new Error(response.statusText)
    }

    return response.json()
}