export type CreditInfo = {
    name: string;
    link?: string;
    description: string;
};

export const Credits: CreditInfo[] = [
    {
        name: 'The Metropolitan Museum of Art (the "Museum")',
        link: 'https://www.metmuseum.org/information/terms-and-conditions',
        description: 'Shared various pieces of art. Mostly used the skulls.',
    },
    {
        name: 'Archive.org)',
        link: 'https://archive.org/',
        description: 'General hosting and sourcing of various media.',
    },
    {
        name: 'Jan-Ivar Bruaroey of Mozilla',
        link: 'https://blog.mozilla.org/webrtc/perfect-negotiation-in-webrtc/',
        description:
            'Wrote an incredibly helpful guide on the onnegotiationneeded event',
    },
];
