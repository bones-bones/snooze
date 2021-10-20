import React, { useState } from 'react';
import styled from '@emotion/styled';
import {
    EffectTypeProperty,
    EffectTypes,
} from './effect-functions/EffectTypes';
import Effect from './EffectClass';
import { VIDEO_HEIGHT, VIDEO_WIDTH } from './constants';



export const CustomPicker = ({
    keyType,
    addFunc,
    mixEffects
}: {
    keyType: EffectTypes;
    addFunc?: (effect: Effect) => void;
    mixEffects: { [key in EffectTypes]: EffectTypeProperty };
}) => {

    const tempParms = mixEffects[keyType].parms;

    let tstate: { [key: string]: string | number } = {};

    if (tempParms) {
        tstate = tempParms.reduce(
            (
                obj: { [key: string]: string | number },
                { label, defaultValue }
            ) => {
                obj[label] = defaultValue;
                return obj;
            },
            tstate
        );
    }

    // console.log(tstate, 'temp state is');
    const [parm, setParm] = useState(tstate);

    // uh oh, when this is updadated it doesn't clear its stuff
    return (
        <Container>
            {keyType}
            <div>
                {tempParms?.map(({ label, type, values }) => (
                    <div key={label}>
                        <label>{label}</label>
                        {getInput({
                            type,
                            values,
                            value: parm[label],
                            onChange: ({ target: { value } }) => {
                                setParm({
                                    ...parm,
                                    [label]: value,
                                });
                            },
                        })}
                    </div>
                ))}
            </div>
            <button
                onClick={() => {
                    // generatorFunctionHolder?: Generator;
                    // composedFunctionHolder?: (input: GenericParms) => number[];
                    // const myFunc = EffectTypeProperties[type as EffectTypes].func;
                    // const generatorFunc = EffectTypeProperties[type as EffectTypes].generatorFunction;
                    // if (generatorFunc) {
                    //     this.addEffect({
                    //         type,
                    //         label,
                    //         active: true,
                    //         parms,
                    //         generatorFunctionHolder: generatorFunc
                    //     });
                    // } else if (myFunc) {

                    //     this.addEffect({
                    //         type,
                    //         label,
                    //         active: true,
                    //         parms,
                    //         composedFunctionHolder: myFunc || metaFunk(myFunc, 1)
                    //     });
                    // }


                    addFunc?.({
                        type: keyType,
                        parms: parm,
                        label: `${keyType}: ${Object.entries(parm).map(
                            ([a, b]) => `${a}=[${b}]`
                        )}`,
                        active: true,
                        ...(mixEffects[keyType]
                            .generatorFunction && {
                            generatorFunctionHolder: mixEffects[
                                keyType
                            ].generatorFunction!(
                                {
                                    input: new Array(
                                        VIDEO_WIDTH * VIDEO_HEIGHT * 4
                                    ),
                                    width: VIDEO_WIDTH,
                                },
                                ...Object.values(parm)
                            ), // hey i'm really sorry person. this is gonna suck real hard to fix.
                            // hey person, it's person again, fuck you.
                            // i wish i had left better comments
                        }),
                        ...(mixEffects[keyType].func && {
                            composedFunctionHolder:
                                mixEffects[keyType].func,
                        }),
                    });
                }}
            >
                add This Effect
            </button>
        </Container>
    );
};
const Container = styled.div({ backgroundColor: '#AAAAAA' });
const NumberInput = styled.input({ height: '30px' });
const TextInput = styled.input({ height: '30px' });
const Select = styled.select({ height: '30px', minWidth: '120px' });

const getInput = ({
    type,
    onChange,
    values,
    value,
}: {
    type: 'text' | 'enum' | 'number';
    onChange: (event: any) => void;
    values: string[] | undefined;
    value: string | number;
}) => {
    switch (type) {
        case 'number': {
            return (
                <NumberInput
                    type="number"
                    value={value as number}
                    onChange={onChange}
                />
            );
        }
        case 'text': {
            return (
                <TextInput
                    type="text"
                    value={value as string}
                    onChange={onChange}
                />
            );
        }
        case 'enum': {
            return (
                <Select value={value as string} onChange={onChange}>
                    {values!.map((secondEnt) => (
                        <option key={secondEnt} label={secondEnt}>
                            {secondEnt}
                        </option>
                    ))}
                </Select>
            );
        }
    }
};
