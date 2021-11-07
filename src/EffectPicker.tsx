import React, { useEffect, useRef, useState } from 'react';

import { CustomPicker } from './EffectPickerElements';
import { EffectTypeProperty, EffectTypes, loadEffectTypeProperties } from './effect-functions/EffectTypes';
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
    const [loaded, setLoaded] = useState(false)
    const mixEffects = useRef<{
        [key in EffectTypes]: EffectTypeProperty;
    } | null>(null)


    useEffect(() => {
        loadEffectTypeProperties().then(a => {
            mixEffects.current = a;
            setLoaded(true)
        })

    }, [])
    return (loaded ?
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
                    mixEffects={mixEffects.current!}

                />
            )}
        </> : <>loading effects</>
    );
};
