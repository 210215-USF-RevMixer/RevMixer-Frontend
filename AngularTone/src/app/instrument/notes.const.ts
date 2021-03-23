interface Chord {
  time: string | number;
  note: string;
  duration: string | number;
}

interface Note {
  note: string;
  time: string | number;
  velocity: string;
}

export const DrumPatternn: Note[] = [
  {
    note: 'C3',
    time: '0:0',
    velocity: '1'
  },
  {
    note: 'C3',
    time: '0:0:2',
    velocity: '1'
  },
  {
    note: 'E3',
    time: '0:1',
    velocity: '1'
  },
  {
    note: 'E3',
    time: '0:1:2',
    velocity: '1'
  },
  {
    note: 'D3',
    time: '0:2',
    velocity: '1'
  },
  {
    note: 'D3',
    time: '0:2:2',
    velocity: '1'
  },
  {
    note: 'E3',
    time: '0:3',
    velocity: '1'
  },
  {
    note: 'E3',
    time: '0:3:2',
    velocity: '1'
  }
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
  }
];

export const melodyChords: Chord[] = [
  {
    time: '100i',
    note: 'C3',
    duration: '10i'
  },
  {
    time: '100i',
    note: 'E3',
    duration: '10i'
  },
  {
    time: '200i',
    note: 'E3',
    duration: '10i'
  },
  {
    time: '300i',
    note: 'D3',
    duration: '10i'
  },
  {
    time: '300i',
    note: 'E3',
    duration: '10i'
  },
  {
    time: '400i',
    note: 'F3',
    duration: '10i'
  }
];

export const bassChords: Chord[] = [
  {
    time: 0,
    note: 'C2',
    duration: '768i'
  },
  {
    time: '768i',
    note: 'C2',
    duration: '768i'
  },
  {
    time: '1536i',
    note: 'C2',
    duration: '768i'
  },
  {
    time: '2304i',
    note: 'C2',
    duration: '192i'
  },
  {
    time: '2496i',
    note: 'F1',
    duration: '192i'
  },
  {
    time: '2688i',
    note: 'G1',
    duration: '384i'
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

