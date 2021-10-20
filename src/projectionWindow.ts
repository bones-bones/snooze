import { createHost } from './webRTC';

export function beginProjection() {
    return new Promise<RTCPeerConnection>((resolve) => {
        const bc = new BroadcastChannel('projectionChannel');
        createHost().then((test) => {
            window.open(
                '/projection' + '?' + JSON.stringify(test.localDescription),
                'Projector'
            ); //, 'resizable');

            bc.onmessage = function (ev) {
                console.log(ev);

                test.setRemoteDescription(JSON.parse(ev.data));
                resolve(test);
            }; /* receive */
        });
    });
}
