import { createHost } from './webRTC';

export function beginProjection() {
    return new Promise<RTCPeerConnection>((resolve) => {
        const bc = new BroadcastChannel('projectionChannel');
        createHost().then((test) => {
            window.open(
                '/projection' + '?' + JSON.stringify(test.localDescription),
                'Projector'
            ); //, 'resizable');

            bc.onmessage = function async(ev) {
                console.log(ev);

                test.setRemoteDescription(JSON.parse(ev.data)).then(() => { resolve(test); });

            }; /* receive */
        });
    });
}
