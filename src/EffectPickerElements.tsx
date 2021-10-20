import React, { useState } from 'react';
import styled from '@emotion/styled';
import {
    EffectTypeProperties,
    EffectTypes,
} from './effect-functions/EffectTypes';
import Effect from './EffectClass';
import { VIDEO_HEIGHT, VIDEO_WIDTH } from './constants';

export const CustomPicker = ({
    keyType,
    addFunc,
}: {
    keyType: EffectTypes;
    addFunc?: (effect: Effect) => void;
}) => {
    const { parms } = EffectTypeProperties[keyType];

    let tstate: { [key: string]: string | number } = {};

    if (parms) {
        tstate = parms.reduce(
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
                {parms?.map(({ label, type, values }) => (
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

                    addFunc &&
                        addFunc({
                            type: keyType,
                            parms: parm,
                            label: `${keyType}: ${Object.entries(parm).map(
                                ([a, b]) => `${a}=[${b}]`
                            )}`,
                            active: true,
                            ...(EffectTypeProperties[keyType]
                                .generatorFunction && {
                                generatorFunctionHolder: EffectTypeProperties[
                                    keyType
                                ].generatorFunction!(
                                    {
                                        input: new Array(
                                            VIDEO_WIDTH * VIDEO_HEIGHT * 4
                                        ),
                                        width: VIDEO_WIDTH,
                                    },
                                    ...Object.values(parm)
                                ), // hey i'm really sorry elliot. this is gonna suck real hard to fix.
                                // hey elliot, it's elliot again, fuck you.
                                // i wish i had left better comments
                            }),
                            ...(EffectTypeProperties[keyType].func && {
                                composedFunctionHolder:
                                    EffectTypeProperties[keyType].func,
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
