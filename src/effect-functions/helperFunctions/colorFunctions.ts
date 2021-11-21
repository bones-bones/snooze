//returns between 0 and 1
export const getLuminosity = (r: number, g: number, b: number) => 
     (r + r + b + g + g + g) / 1530; //(r * 0.2126 + g * 0.7152 + b * 0.0722) / 255;
    //holy shit ty rjmuro
//    return ((r << 1 + r + g << 2 + b) >> 3) / 255 weird stuff
