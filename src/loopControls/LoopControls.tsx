import React from 'react';
import { deck0ChangeLoop, deck1ChangeLoop, RootState } from '../store';
import { useDispatch, useSelector } from 'react-redux';
import { LoopBehavior } from '../deck/enums';

export const LoopControls = ({ deckId }: { deckId: number }) => {
    const dispatch = useDispatch();
    const { loopBehavior } = useSelector((state: RootState) => {
        const correctDeck = deckId == 0 ? state.deck0 : state.deck1;
        return correctDeck;
    });

    return (
        <select
            onChange={({ target: { value } }) => {
                const loopFunction =
                    deckId == 0 ? deck0ChangeLoop : deck1ChangeLoop;
                dispatch(loopFunction(value as LoopBehavior));
            }}
        >
            {(Object.keys(LoopBehavior) as LoopBehavior[]).map((entry) => (
                <option
                    key={entry}
                    selected={loopBehavior == LoopBehavior[entry]}
                >
                    {entry}
                </option>
            ))}
        </select>
    );
};
