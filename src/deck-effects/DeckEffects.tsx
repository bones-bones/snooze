import styled from '@emotion/styled';
import {
    deck0OrderEffect,
    deck0RemoveEffect,
    deck0ToggleEffectActive,
    deck1OrderEffect,
    deck1RemoveEffect,
    deck1ToggleEffectActive,
    RootState,
} from '../store';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

interface Props {
    deckId: 0 | 1;
}

const RowContainer = styled.div({
    overflowY: 'scroll',
    marginTop: '10px',
    height: '25vh',
});

export const DeckEffects = ({ deckId }: Props) => {
    const effects = useSelector(
        (state: RootState) => (deckId == 0 ? state.deck0 : state.deck1).effects
    );
    const dispatch = useDispatch();
    const orderEffect = deckId == 0 ? deck0OrderEffect : deck1OrderEffect;
    const removeEffect = deckId == 0 ? deck0RemoveEffect : deck1RemoveEffect;
    const toggleEffectActive =
        deckId == 0 ? deck0ToggleEffectActive : deck1ToggleEffectActive;

    return (
        <RowContainer>
            {effects.map((entry, i) => (
                <Row
                    key={i}
                    draggable
                    onDragStart={(e) => {
                        e.dataTransfer.setData('text/plain', i + '');
                    }}
                    {...{ effectId: i }}
                    onDrop={({ dataTransfer }) =>
                        dispatch(
                            orderEffect({
                                startIndex: parseInt(
                                    dataTransfer.getData('text/plain')
                                ),
                                endIndex: i,
                            })
                        )
                    }
                    onDragOver={(e) => e.preventDefault()}
                    onDragEnter={(e) => e.preventDefault()}
                >
                    {entry.label}
                    <ButtonBox>
                        <button onClick={() => dispatch(removeEffect(i))}>
                            🗑️
                        </button>
                        <EffectActiveCheckBox
                            type="checkbox"
                            onClick={() => dispatch(toggleEffectActive(i))}
                            checked={entry.active}
                        />
                    </ButtonBox>
                </Row>
            ))}
        </RowContainer>
    );
};

const ButtonBox = styled.div({ display: 'flex' });

const Row = styled.div({
    backgroundColor: 'GREY',
    display: 'flex',
    justifyContent: 'space-between',
});

const EffectActiveCheckBox = styled.input({
    minHeight: '25px',
    minWidth: '25px',
});
