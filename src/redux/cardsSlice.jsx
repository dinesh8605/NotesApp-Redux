
import { createSlice } from "@reduxjs/toolkit";

// Creating a slice for managing the cards state
export const cardsSlice = createSlice({
    name: 'cards', // Name of the slice
    initialState: [
        // Initial state with sample cards
        {
            id: 1,
            title: 'Feedback',
            body: 'Lorem ipsum dolor sit amet consectetur. Sollicitudin enim risus ut vestibulum morbi tellus sit ac. Fames auctor quisque et aliquam maecenas sed at vitae facilisis. .'
        },
        {
            id: 2,
            title: 'Lyrics',
            body: 'Lorem ipsum dolor sit amet consectetur. Sollicitudin enim risus ut vestibulum morbi tellus sit ac. Fames auctor quisque et aliquam maecenas sed at vitae facilisis. .'
        },
        {
            id: 3,
            title: 'Weekly Task',
            body: 'Lorem ipsum dolor sit amet consectetur. Sollicitudin enim risus ut vestibulum morbi tellus sit ac. Fames auctor quisque et aliquam maecenas sed at vitae facilisis. .'
        }
    ],
    reducers: {
        // Reducer function for adding a new card
        add: (state, action) => {
            const newCard = action.payload;
            state.push(newCard);
        },
        // Reducer function for removing a card
        remove: (state, action) => {
            const cardToRemove = action.payload;
            return state.filter((card) => card.id !== cardToRemove);
        },
        // Reducer function for editing a card
        edit: (state, action) => {
            const { id, updateddata } = action.payload;
            const editedCardIndex = state.findIndex((card) => card.id === id);

            if (editedCardIndex !== -1) {
                const editedCard = { ...state[editedCardIndex], ...updateddata };
                state[editedCardIndex] = editedCard;
            }
        },
        // Reducer function (placeholder) for toggling card state
        toggle: (state, action) => {
            // Add toggle logic as needed
        }
    }
});

export const { add, remove, edit, toggle } = cardsSlice.actions;

export default cardsSlice.reducer;
