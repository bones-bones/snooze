import React from 'react';
import styled from '@emotion/styled';
import { VIDEO_HEIGHT, VIDEO_WIDTH } from '../constants';
import { useSelector } from 'react-redux';
import { RootState, SourceMediaType } from '../store';
import { MediaSourceVideo } from './MediaSourceVideo';
import { MediaSourceSvgGenerator } from './MediaSourceSvgGenerator';
import { MediaSourceControls } from './MediaSourceControls';

interface Props {
    videoRef: React.RefObject<HTMLVideoElement>;
    imageRef: React.RefObject<HTMLImageElement>;
    deckId: 0 | 1;
}

export const DeckMediaSource = ({ videoRef, imageRef, deckId }: Props) => {
    const { sourcePath, sourceMediaType } = useSelector(
        (state: RootState) => (deckId == 0 ? state.deck0 : state.deck1).source
    );
    const loopBehavior = useSelector(
        (state: RootState) =>
            (deckId == 0 ? state.deck0 : state.deck1).loopBehavior
    );

    return (
        <MediaContainer><MediaSourceControls />
            {(() => {
                switch (sourceMediaType) {
                    case (SourceMediaType.Video): {
                        return <MediaSourceVideo videoRef={videoRef} loopBehavior={loopBehavior} sourcePath={sourcePath!} />
                    }
                    case (SourceMediaType.Image): {
                        return <img
                            crossOrigin="anonymous"
                            src={sourcePath!}
                            height={VIDEO_HEIGHT}
                            width={VIDEO_WIDTH}
                            ref={imageRef}
                        />
                    }
                    case (SourceMediaType.GeneratedSVG): {
                        return <MediaSourceSvgGenerator imageRef={imageRef} />
                    }

                    default: return <>nothing</>
                }
            })()}
        </MediaContainer>
    );
};

//seems like that chrome bug was fixed
const MediaContainer = styled.div({ display: 'none' });
