import React from 'react';
import { CreditInfo } from './types';

export const CreditBar = ({ credits }: { credits: CreditInfo[] }) => {
    return (
        <div>
            {credits.map(({ name, link, description }) => (
                <div key={name}>
                    <span>{name}</span>
                    {link && <a href={link}>Link</a>}
                    <div>{description}</div>
                </div>
            ))}
        </div>
    );
};
