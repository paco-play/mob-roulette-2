import type { Avatar } from '~/types/sprite'

const INK = '#2b2118'

export const ANIMAL_AVATARS: readonly Avatar[] = [
  {
    id: 'cat', label: 'Chat', kind: 'animal',
    palette: { f: '#d9a066', d: '#a96f3a', w: '#fff3df', e: INK, n: '#e58a8a' },
    rows: ['............', '..f......f..', '.fdf....fdf.', '.ffffffffff.', '.ffffffffff.', '.ffeffffeff.', '.ffffnnffff.', '..fwwwwwwf..', '...wwwwww...', '..ffffffff..', '.ffffffffff.', 'ffffffffffff'],
  },
  {
    id: 'capybara', label: 'Capybara', kind: 'animal',
    palette: { f: '#9b6b43', d: '#6e4a2b', s: '#b88a5e', e: INK, n: '#3a261a' },
    rows: ['............', '............', '..dd....dd..', '.ffffffffff.', '.ffffffffff.', '.ffeffffeff.', '.ffffffffff.', '.ssssssssss.', '.ssnssnssss.', '..ssssssss..', '.ffffffffff.', 'ffffffffffff'],
  },
  {
    id: 'dog', label: 'Chien', kind: 'animal',
    palette: { f: '#e8c48a', d: '#8a5a2b', w: '#fff3df', e: INK, n: INK },
    rows: ['............', '.dd......dd.', '.dd.ffff.dd.', '.dffffffffd.', '.dffffffffd.', '.dffeffeffd.', '..ffwwwwff..', '..fwwnnwwf..', '...wwwwww...', '..ffffffff..', '.ffffffffff.', 'ffffffffffff'],
  },
  {
    id: 'fox', label: 'Renard', kind: 'animal',
    palette: { f: '#e0742e', d: '#8a3d14', w: '#fff3df', e: INK, n: INK },
    rows: ['............', '.f........f.', '.ff......ff.', '.ffffffffff.', '.ffffffffff.', '.ffeffffeff.', '.fwwffffwwf.', '..wwwwwwww..', '...wwnnww...', '..ffffffff..', '.ffffffffff.', 'ffffffffffff'],
  },
  {
    id: 'frog', label: 'Grenouille', kind: 'animal',
    palette: { f: '#7fb069', d: '#4f7f3f', w: '#f4f0d0', e: INK, n: '#c75c5c' },
    rows: ['............', '.ww......ww.', '.wew....wew.', '.ffffffffff.', '.ffffffffff.', '.ffffffffff.', '.ffffffffff.', '.fnnnnnnnnf.', '..ffffffff..', '..dddddddd..', '.dddddddddd.', 'dddddddddddd'],
  },
  {
    id: 'rabbit', label: 'Lapin', kind: 'animal',
    palette: { f: '#e9e4dc', d: '#f0b8bf', e: INK, n: '#e58a8a' },
    rows: ['..ff....ff..', '..fd....df..', '..fd....df..', '..ffffffff..', '.ffffffffff.', '.ffeffffeff.', '.ffffnnffff.', '..ffffffff..', '...ffffff...', '..ffffffff..', '.ffffffffff.', 'ffffffffffff'],
  },
  {
    id: 'bear', label: 'Ours', kind: 'animal',
    palette: { f: '#8b5e3c', d: '#c9a27a', e: INK, n: INK },
    rows: ['............', '.ff......ff.', '.fff....fff.', '.ffffffffff.', '.ffffffffff.', '.ffeffffeff.', '..ffddddff..', '..fddnnddf..', '..ffddddff..', '..ffffffff..', '.ffffffffff.', 'ffffffffffff'],
  },
  {
    id: 'penguin', label: 'Manchot', kind: 'animal',
    palette: { f: '#2f3b45', w: '#f5f2ea', o: '#e8a33d', e: INK },
    rows: ['............', '....ffff....', '...ffffff...', '..ffffffff..', '..fwwffwwf..', '..fwewwewf..', '..fwwooowf..', '...wwwwww...', '..fwwwwwwf..', '.ffwwwwwwff.', '.ffwwwwwwff.', 'fffwwwwwwfff'],
  },
  {
    id: 'owl', label: 'Hibou', kind: 'animal',
    palette: { f: '#a07a52', d: '#6e5236', w: '#f4eedd', e: INK, o: '#e8a33d' },
    rows: ['............', '.d........d.', '.dd......dd.', '.ffffffffff.', '.fwwwffwwwf.', '.fwewffwewf.', '.fwwwooowwf.', '.ffffooffff.', '.fdfdfdfdff.', '.ffdfdfdfff.', '.fdfdfdfdff.', 'ffffffffffff'],
  },
  {
    id: 'pig', label: 'Cochon', kind: 'animal',
    palette: { f: '#f2b6bb', d: '#e08c97', e: INK, n: '#b9505e' },
    rows: ['............', '.dd......dd.', '.ddf....fdd.', '.ffffffffff.', '.ffffffffff.', '.ffeffffeff.', '..ffddddff..', '..fdnddndf..', '..ffddddff..', '..ffffffff..', '.ffffffffff.', 'ffffffffffff'],
  },
  {
    id: 'duck', label: 'Canard', kind: 'animal',
    palette: { f: '#f3d54e', o: '#e8892d', e: INK },
    rows: ['............', '....ffff....', '...ffffff...', '..ffffffff..', '..ffeffeff..', '..ffffffff..', '..ooooooof..', '..oooooooo..', '...ffffff...', '..ffffffff..', '.ffffffffff.', 'ffffffffffff'],
  },
  {
    id: 'hamster', label: 'Hamster', kind: 'animal',
    palette: { f: '#e7b878', w: '#fff1dc', d: '#c28a4a', e: INK, n: '#e58a8a' },
    rows: ['............', '..dd....dd..', '.dddf..fddd.', '.ffffffffff.', '.ffffffffff.', '.ffeffffeff.', '.wwfffnffww.', '.wwwwwwwwww.', '.wwwwwwwwww.', '..wwwwwwww..', '..ffffffff..', '.ffffffffff.'],
  },
]
