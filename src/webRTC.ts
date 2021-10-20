// See also: https://blog.mozilla.org/webrtc/perfect-negotiation-in-webrtc/

export const createHost = async (): Promise<RTCPeerConnection> =>
    new Promise((resolve) => {
        const peerConn = new webkitRTCPeerConnection({
            iceServers: [{ urls: ['stun:stun.l.google.com:19302'] }],
        });
        const dataChannel = peerConn.createDataChannel('projecting');
        // peerConn.ontrack = () => {};
        // dataChannel.onopen = () => {};

        dataChannel.onmessage = async (message) => {
            console.log(message);
            const parsedMessage =
                typeof message.data === 'string' && message.data.startsWith('{')
                    ? JSON.parse(message.data)
                    : message.data;
            const { description } = parsedMessage;
            const { candidate } = parsedMessage;
            if (description) {
                await peerConn.setRemoteDescription(description);
                if (description.type === 'offer') {
                    await peerConn.setLocalDescription(
                        await peerConn.createAnswer({
                            offerToReceiveVideo: true,
                        })
                    );
                    dataChannel.send(
                        JSON.stringify({
                            description: peerConn.localDescription,
                        })
                    );
                }
            } else if (candidate) {
                console.log('CANDIDATEO');
                await peerConn.addIceCandidate(candidate);
            }
        };

        peerConn.onicecandidate = (e) => {
            console.log('ice candidate');
            if (e.candidate === null) {
                if (dataChannel && dataChannel.readyState === 'open') {
                    dataChannel.send(
                        JSON.stringify({ candidate: e.candidate })
                    );
                }
                peerConn.onnegotiationneeded = async () => {
                    console.log('there is a need to negotiate');

                    await peerConn.setLocalDescription(
                        await peerConn.createOffer()
                    );
                    dataChannel.send(
                        JSON.stringify({
                            description: peerConn.localDescription,
                        })
                    );
                };
            }
        };
        peerConn.createOffer().then((desc) => {
            peerConn.setLocalDescription(desc).then(() => {
                resolve(peerConn);
            });
        });
    });

export const createGuest = async (
    offerDesc: RTCSessionDescriptionInit
): Promise<RTCPeerConnection> =>
    new Promise((resolve) => {
        const peerConn = new webkitRTCPeerConnection({
            iceServers: [{ urls: ['stun:stun.l.google.com:19302'] }],
        });

        peerConn.ondatachannel = (event) => {
            event.channel.onopen = () => {
                event.channel.onmessage = async (ent) => {
                    console.log(ent);

                    const parsedMessage =
                        typeof ent.data === 'string' && ent.data.startsWith('{')
                            ? JSON.parse(ent.data)
                            : ent.data;
                    const { description, candidate } = parsedMessage;

                    if (description) {
                        await peerConn.setRemoteDescription(description);
                        if (description.type === 'offer') {
                            await peerConn.setLocalDescription(
                                await peerConn.createAnswer({
                                    offerToReceiveVideo: true,
                                })
                            );
                            event.channel.send(
                                JSON.stringify({
                                    description: peerConn.localDescription,
                                })
                            );
                        }
                    } else if (candidate) {
                        await peerConn.addIceCandidate(candidate);
                    }
                };
            };
        };
        peerConn.onicecandidate = (e) => {
            if (e.candidate === null) {
                navigator.clipboard.writeText(
                    JSON.stringify(peerConn.localDescription)
                );
            }
        };
        peerConn.setRemoteDescription(new RTCSessionDescription(offerDesc));

        peerConn.createAnswer({ offerToReceiveVideo: true }).then((desc) => {
            peerConn.setLocalDescription(desc).then(() => {
                resolve(peerConn);
            });
        });
    });
