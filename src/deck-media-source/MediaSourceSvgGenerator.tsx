import React from 'react';
import { generate as generateGeoPattern } from 'geopattern';
import { VIDEO_HEIGHT, VIDEO_WIDTH } from '../constants';
import { getSongDataArray } from '../InputSource';
import { useRequestInterval } from '../useRequestInterval';
import { useState } from 'react';


export const MediaSourceSvgGenerator = ({ imageRef }: { imageRef: React.RefObject<HTMLImageElement> }) => {

    const [seed, setSeed] = useState<string>("o")
    useRequestInterval(() => {
        const dataa = getSongDataArray();
        setSeed("" + dataa[3] + dataa[6] + dataa[11])

    }, 45)
    const tempSrc = generateGeoPattern(seed, { generator: 'chevrons' }).toDataUri();

    return <img
        height={VIDEO_HEIGHT}
        width={VIDEO_WIDTH}
        ref={imageRef}
        src={tempSrc} />
}



            // const pattern = generateGeoPattern('a' + dataArray[8]).toDataUri();
            // svgTest.src = pattern;
            // canvasCtx.drawImage(svgTest, 0, 0, srcCurrent!.width,
            //     srcCurrent!.height)
            // aw shit svg stuff