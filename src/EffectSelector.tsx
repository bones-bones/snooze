import React from 'react';

import { MixTypes } from './mixer/MixerEffects';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, updateMixEffect } from './store';
import styled from '@emotion/styled';

//import falter from './svgFilters/test.svg';
export const EffectSelector = () => {
    const type = useSelector(
        ({
            screenState: {
                mixEffect: { type },
            },
        }: RootState) => type
    );
    const dispatch = useDispatch();
    return (
        <Select
            onChange={({ target: { value } }) => {
                dispatch(updateMixEffect(value as MixTypes));
            }}
        >
            {(Object.keys(MixTypes) as MixTypes[]).map((secondEnt) => (
                <option
                    key={secondEnt}
                    label={secondEnt}
                    selected={type == secondEnt}
                >
                    {secondEnt}
                </option>
            ))}
        </Select>
    );
};
const Select = styled.select({ height: '30px', minWidth: '120px' });
