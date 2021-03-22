import { Component, OnInit } from '@angular/core';
import {
  melodyChords,
  bassChords,
  marioSamples
} from './notes.const';
import * as Tone from 'tone';


@Component({
  selector: 'app-instrument',
  templateUrl: './instrument.component.html',
  styleUrls: ['./instrument.component.scss']
})
export class InstrumentComponent implements OnInit {
  notes: string[] = [];
  isTransportStarted: boolean = false;
  minVolume: any;
  mediumVolume: any;
  polySynthSquare: any;
  polySynthSaw: any;
  melodyPart: any;
  bassPart: any;
  noise: any;
  sampler: any;

  constructor() { }

  ngOnInit(): void {
    //this.synth = new Tone.Synth().toDestination();
    this.notes = ['C2', 'D2', 'E2', 'F2', 'G2', 'A2', 'B2', 'C3', 'D3', 'E3', 'F3', 'G3', 'A3', 'B3', 'C4'];
    this.minVolume = new Tone.Volume(-30);
    this.mediumVolume = new Tone.Volume(-15);
    this.initializeBrassInstrument();
  }

  private initializeBrassInstrument() {
    this.sampler = new Tone.Sampler({
      G2: '../../assets/TR-808Clap01.wav'
    }).chain(this.mediumVolume, Tone.Master);

    this.polySynthSquare = new Tone.MonoSynth({
      oscillator: {
        type: 'square'
      }
    }).chain(new Tone.Volume(-25), Tone.Master);
  }

  playNote(note: string) {
    this.sampler.triggerAttack(note);
    this.polySynthSquare.triggerAttackRelease(note, '4n'); 
  }

  toggleMelody() {
    if (this.melodyPart) {
      this.melodyPart.mute = !this.melodyPart.mute;
    } else {
      this.polySynthSaw = new Tone.MonoSynth({
        oscillator: {
          type: 'fatsawtooth'
        },
        envelope: {
          attack: 0.01,
          release: 0.4
        }
      }).chain(this.minVolume, Tone.Master);

      this.melodyPart = new Tone.Part((time, chord) => {
        this.sampler.triggerAttackRelease(chord.note, chord.duration, time);
        this.polySynthSaw.triggerAttackRelease(
          chord.note,
          chord.duration,
          time
        );
      }, melodyChords);

      this.playPart(this.melodyPart);
    }
  }

  private playPart(part: { start: (arg0: number) => void; loop: boolean; loopEnd: string; }) {
    if (!this.isTransportStarted) {
      Tone.Transport.toggle();
      this.isTransportStarted = true;
      Tone.Transport.bpm.value = 132;
    }

    part.start(0);
    part.loop = true;
    part.loopEnd = '4m';
  }

  toggleBass() {
    if (this.bassPart) {
      this.bassPart.mute = !this.bassPart.mute;
    } else {
      this.bassPart = new Tone.Part((time, chord) => {
        this.polySynthSquare.triggerAttackRelease(
          chord.note,
          chord.duration,
          time
        );
      }, bassChords);

      this.playPart(this.bassPart);
    }
  }

  toggleNoise() {
    if (this.noise) {
      this.noise.mute = !this.noise.mute;
    } else {
      this.noise = new Tone.Noise('pink').start();
      const filter = new Tone.AutoFilter({
        frequency: '8m'
      }).chain(new Tone.Volume(-20), Tone.Master);

      this.noise.connect(filter);
      filter.start();
    }
  }

  playRandomMarioSample() {
    this.playSample(
      marioSamples[Math.floor(Math.random() * marioSamples.length)]
    );
  }

  private playSample(sampleName: string) {
    new Tone.Player({
      url: `../../assets/${sampleName}.wav`,
      autostart: true
    }).chain(this.mediumVolume, Tone.Master);
  }

  speedUpBpm() {
    Tone.Transport.bpm.value += 20;
  }

  stopInstruments() {
    this.playSample('powerup');

    this.stopInstrument(this.melodyPart);
    this.stopInstrument(this.bassPart);
    this.stopInstrument(this.noise);
  }

  private stopInstrument(instrument: { mute: boolean; stop: () => void; }) {
    if (instrument) {
      instrument.mute = true;
      instrument.stop();
    }
  }


}


