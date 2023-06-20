import useFetch from "@/lib/useFetch";

export const deleteDeck = async (deckId: string) => {
    const fetch = useFetch();

    const response = await fetch(`/api/decks/${deckId}`, {
        method: "DELETE",
    })

    if (!response.ok) {
        throw new Error(response.statusText)
    }

    return response.json()
}

export const deleteCards = async (deckId: string, cardIds: string[]) => {
    const fetch = useFetch();

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