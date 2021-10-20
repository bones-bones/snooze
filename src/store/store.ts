import {
    createSlice,
    configureStore,
    combineReducers,
    PayloadAction,
} from '@reduxjs/toolkit';
import { DeckState, Source } from '../deck';
import { MixEffect, MixTypes } from '../mixer/MixerEffects';

import lighthouse from '../webms/lighthouse.webm';
import cubes from '../webms/cubes.webm';
import Effect from '../EffectClass';
import { EffectTypes } from '../effect-functions/EffectTypes';
import { bars } from '../effect-functions/bars';
import { LoopBehavior } from '../deck/enums';

interface ScreenState {
    slider: number;
    mixEffect: MixEffect;
    outboundstream?: MediaStream;
}

const initAppState: ScreenState = {
    slider: 50,
    mixEffect: {
        type: MixTypes.Str8tOverlay,
    },
    outboundstream: undefined,
};

const screenSlice = createSlice({
    name: 'screenState',
    initialState: initAppState,
    reducers: {
        adjustMixer: (state, { payload }: PayloadAction<number>) => {
            state.slider = payload;
        },
        updateMixEffect: (state, { payload }: PayloadAction<MixTypes>) => {
            state.mixEffect.type = payload;
        },
        setStream: (
            state,
            { payload }: PayloadAction<MediaStream | undefined>
        ) => {
            state.outboundstream = payload;
        },
    },
});

export enum SourceMediaType {
    Video = 'Video',
    Image = 'Image',
    GeneratedSVG = 'GeneratedSVG'
}

const generateDeckSlice = ({
    name,
    source,
}: {
    name: string;
    source: Source;
}) => {
    const initialDeckState: DeckState = {
        source,
        effects: [
            {
                label: 'bar',
                type: EffectTypes.Bars,
                parms: [],
                active: true,
                composedFunctionHolder: bars,
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
            addEffect: (state, { payload }: PayloadAction<Effect>) => {
                state.effects.push(payload);
            },
            orderEffect: (
                state,
                {
                    payload: { startIndex, endIndex },
                }: PayloadAction<{ startIndex: number; endIndex: number }>
            ) => {
                const effectToMove = state.effects[startIndex];
                const newerIndex = endIndex; //> startIndex ? newIndex : newIndex;
                state.effects.splice(startIndex, 1);
                state.effects.splice(newerIndex, 0, effectToMove);
            },
            removeEffect: (state, { payload }: PayloadAction<number>) => {
                // this seems super suspect
                state.effects.splice(payload, 1);
            },
            changeLoop: (state, { payload }: PayloadAction<LoopBehavior>) => {
                state.loopBehavior = payload;
            },
            toggleEffectActive: (state, { payload }: PayloadAction<number>) => {
                const effectImLookingFor = state.effects[payload];
                if (effectImLookingFor) {
                    effectImLookingFor.active = !effectImLookingFor?.active;
                }
            },
        },
    });
};

const deck0Slice = generateDeckSlice({ name: 'deck0', source: { sourceMediaType: SourceMediaType.GeneratedSVG } });
const deck1Slice = generateDeckSlice({ name: 'deck1', source: { sourcePath: cubes, sourceMediaType: SourceMediaType.Video } });

export const {
    newSource: deck0NewSource,
    changeLoop: deck0ChangeLoop,
    addEffect: deck0AddEffect,
    orderEffect: deck0OrderEffect,
    removeEffect: deck0RemoveEffect,
    toggleEffectActive: deck0ToggleEffectActive,

} = deck0Slice.actions;
export const {
    newSource: deck1NewSource,
    changeLoop: deck1ChangeLoop,
    addEffect: deck1AddEffect,
    orderEffect: deck1OrderEffect,
    removeEffect: deck1RemoveEffect,
    toggleEffectActive: deck1ToggleEffectActive,
} = deck1Slice.actions;
export const { adjustMixer, updateMixEffect, setStream } = screenSlice.actions;

export const store = configureStore({
    reducer: combineReducers({
        screenState: screenSlice.reducer,
        deck0: deck0Slice.reducer,
        deck1: deck1Slice.reducer,
    }),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
