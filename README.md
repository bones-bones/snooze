# Welcome to snooze, the browserbased video mixer!
This project started because I think visualing and VJs stuff is cool. I went to enough raves to get an idea of the stuff that gets used as visualizers and I thought, hey, could that be done in the browser. So I started this project. Now it's become a way for me to use emerging web techs, learn new things, and discover the wrong way to do things.



# Usage guide
I'll keeep a version up at https://skeleton.club/snooze, but it will likely be the older/stabler/staler copy of the code.

From the page, drop webms, jpegs, mp4s, pngs, (and more I'm just not sure what else works) onto the left and right decks. The centeral deck is the screen and below it is the fader and several fade effects. Under each deck there is a whole list of buttons to add different effects to that input. Once added the effects can be moved up or down in the order of application.

# Dev guide
This repo uses `yarn`.
Because this is a pile of hacks, `yarn start` only starts the server, you'll also need to `yarn watch`.
As this project uses assemblyscript you well need ta `yarn asbuild` at the beginning (and every time you make a change, obviously)