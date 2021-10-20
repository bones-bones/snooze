import styled from '@emotion/styled';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { adjustMixer, RootState } from './store';

export const Slider = () => {
    const sliderValue = useSelector(
        ({ screenState: { slider } }: RootState) => slider
    );
    const dispatch = useDispatch();

    return (
        <SliderInput
            type="range"
            min={0}
            value={sliderValue}
            max={100}
            onWheel={({ deltaY }: React.WheelEvent) => {
                // e.preventDefault();
                const newValue = Math.min(
                    Math.max(0, Math.round(sliderValue - deltaY / 11)),
                    100
                );

                dispatch(adjustMixer(newValue));
                return false;
            }}
            onChange={({
                target: { value },
            }: React.ChangeEvent<HTMLInputElement>) => {
                dispatch(adjustMixer(parseInt(value)));
            }}
            name="deckFader"
        />
    );
};

const SliderInput = styled.input({
    WebkitAppearance: 'none',
    height: '50px',
    width: '90%',
});
