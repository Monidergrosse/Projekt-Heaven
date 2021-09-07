import * as alt from 'alt-server';
alt.onClient('Noclip:Update', (player, pos) => player.pos = pos);
