import { DeckState, Source } from '../deck';

import Effect from '../EffectClass';
import { EffectTypes } from '../effect-functions/EffectTypes';
import { slideBright } from '../effect-functions/slideBright';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoopBehavior } from './enums';
import { SourceMediaType } from '../store';

export const generateDeckSlice = ({
    name,
    source,
}: {
    name: string;
    source: string;
}) => {
    const initialDeckState: DeckState = {
        source: {
            sourcePath: source,
            sourceMediaType: SourceMediaType.GeneratedSVG,
        },
        effects: [
            {
                label: 'slideBright',
                type: EffectTypes.SlideBright,
                parms: [],
                active: true,
                composedFunctionHolder: slideBright,
            },
        ],
        loopBehavior: LoopBehavior.Loop,
    };

    return createSlice({
        name,
        initialState: initialDeckState,
        reducers: {
            newSource: (state, { payload }: PayloadAction<Source>) => {
                state.source = payload;
            },
            addEffect: ({ effects }, { payload }: PayloadAction<Effect>) => {
                effects.push(payload);
            },
            orderEffect: (
                { effects },
                {
                    payload: { startIndex, endIndex },
                }: PayloadAction<{ startIndex: number; endIndex: number }>
            ) => {
                const effectToMove = effects[startIndex];
                const newerIndex = endIndex; //> startIndex ? newIndex : newIndex;
                effects.splice(startIndex, 1);
                effects.splice(newerIndex, 0, effectToMove);
            },
            removeEffect: (state, { payload }: PayloadAction<Effect>) => {
                // this seems super suspect
                state.effects = state.effects.filter((e) => e !== payload);
            },
            changeLoop: (state, { payload }: PayloadAction<LoopBehavior>) => {
                state.loopBehavior = payload;
            },
            toggleEffectActive: (state, { payload }: PayloadAction<Effect>) => {
                const effectImLookingFor = state.effects.find(
                    (e) => e == payload
                );
                if (effectImLookingFor) {
                    effectImLookingFor.active = !effectImLookingFor?.active;
                }
            },
        },
    });
};
