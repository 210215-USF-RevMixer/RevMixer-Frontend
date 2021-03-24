interface Chord {
  time: string | number;
  note: string;
  duration: string | number;
}

interface Note {
  note: string;
  time: string | number;
  duration: string | number;
  velocity: string | number;
}

export const ClapPattern: Note[] = [
  { note: 'C3', time: '0:0', duration: '0.5',   velocity: 1 },
  { note: 'C3', time: '0:0:2', duration: '0.5', velocity: 0 },
  { note: 'C3', time: '0:1', duration: '0.5',   velocity: 0 },
  { note: 'C3', time: '0:1:2', duration: '0.5', velocity: 0 },
  { note: 'C3', time: '0:2', duration: '0.5',   velocity: 1 },
  { note: 'C3', time: '0:2:2', duration: '0.5', velocity: 0 },
  { note: 'C3', time: '0:3', duration: '0.5',   velocity: 0 },
  { note: 'C3', time: '0:3:2', duration: '0.5', velocity: 0 },
  { note: 'C3', time: '0:4', duration: '0.5',   velocity: 1 },
  { note: 'C3', time: '0:4:2', duration: '0.5', velocity: 0 },
  { note: 'C3', time: '0:5', duration: '0.5',   velocity: 0 },
  { note: 'C3', time: '0:5:2', duration: '0.5', velocity: 0 },
  { note: 'C3', time: '0:6', duration: '0.5',   velocity: 1 },
  { note: 'C3', time: '0:6:2', duration: '0.5', velocity: 0 },
  { note: 'C3', time: '0:7', duration: '0.5',   velocity: 0 },
  { note: 'C3', time: '0:7:2', duration: '0.5', velocity: 0 }
]



export const DrumPattern: Chord[] = [
  {
    time: '0:0',
    note: 'C3',
    duration: '1'
  },
  {
    time: '0:0:2',
    note: 'C3',
    duration: '1'
  },
  {
    time: '0:1',
    note: 'E3',
    duration: '1'
  },
  {
    time: '0:1:2',
    note: 'E3',
    duration: '1'
  },
  {
    time: '0:2',
    note: 'D3',
    duration: '1'
  },
  {
    time: '0:2:2',
    note: 'D3',
    duration: '1'
  },
  {
    time: '0:3',
    note: 'E3',
    duration: '1'
  },
  {
    time: '0:3:2',
    note: 'E3',
    duration: '1'
  },
  {
    time: '0:4',
    note: 'C3',
    duration: '1'
  },
  {
    time: '0:4:2',
    note: 'C3',
    duration: '1'
  },
  {
    time: '0:5',
    note: 'E3',
    duration: '1'
  },
  {
    time: '0:5:2',
    note: 'E3',
    duration: '1'
  },
  {
    time: '0:6',
    note: 'D3',
    duration: '1'
  },
  {
    time: '0:6:2',
    note: 'D3',
    duration: '1'
  },
  {
    time: '0:7',
    note: 'E3',
    duration: '1'
  },
  {
    time: '07:2',
    note: 'E3',
    duration: '1'
  }
];


export const marioSamples: string[] = [
  'bump',
  'coin',
  'fireball',
  'flagpole',
  'jump',
  'powerup'
];

export const drumSamples: string[] = [
  'Kick',
  'Snare',
  'ClosedHat',
  'Clap'
];

