import React, { useState } from 'react';

import { CustomPicker } from './EffectPickerElements';
import { EffectTypes } from './effect-functions/EffectTypes';
import Effect from './EffectClass';

const effectTypes = Object.keys(EffectTypes) as EffectTypes[];

export const EffectPicker = ({
    addFunc,
}: {
    addFunc: (effect: Effect) => void;
}) => {
    const [activeEffect, setActiveEffect] = useState<EffectTypes>(
        effectTypes[0]
    );
    return (
        <>
            {effectTypes.map((entry) => (
                <button key={entry} onClick={() => setActiveEffect(entry)}>
                    {entry}
                </button>
            ))}

            {activeEffect in EffectTypes && (
                <CustomPicker
                    key={activeEffect}
                    keyType={activeEffect}
                    addFunc={addFunc}
                />
            )}
        </>
    );
};
