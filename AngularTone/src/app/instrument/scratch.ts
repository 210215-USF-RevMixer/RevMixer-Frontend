

// this.snareBlocks[1].onOff , this.snareBlocks[2].onOff, this.snareBlocks[3].onOff, this.snareBlocks[4].onOff,
// this.snareBlocks[5].onOff, this.snareBlocks[6].onOff, this.snareBlocks[7].onOff, this.snareBlocks[8].onOff,
// this.snareBlocks[9].onOff, this.snareBlocks[10].onOff, this.snareBlocks[11].onOff, this.snareBlocks[12].onOff,
// this.snareBlocks[13].onOff, this.snareBlocks[14].onOff, this.snareBlocks[15].onOff, this.snareBlocks[16].onOff

//   toggleSnare() {
//     if (this.snareTrack) {
//       this.snareTrack.mute = !this.snareTrack.mute;
//     } else {
//       this.snareTrack = this.snareSample;
//     this.snareTrack = new Tone.Part((time, chord) => {
//       this.snareSample.triggerAttackRelease(chord.note, chord.duration, time);
//     }, DrumPattern);
//     this.playPart(this.snareTrack);
//    }
//   }
//   toggleKick() {
//     if (this.kickTrack) {
//       this.kickTrack.mute = !this.kickTrack.mute;
//     } else {
//       this.kickTrack = this.kickSample;
//     this.kickTrack = new Tone.Part((time, chord) => {
//       this.kickSample.triggerAttackRelease(chord.note, chord.duration, time);
//     }, DrumPattern);
//     this.playPart(this.kickTrack);
//    }
//   }
//   toggleHiHat() {
//     if (this.hiHatTrack) {
//       this.hiHatTrack.mute = !this.hiHatTrack.mute;
//     } else {
//       this.hiHatTrack = this.hiHatSample;
//     this.hiHatTrack = new Tone.Part((time, chord) => {
//       this.hiHatSample.triggerAttackRelease(chord.note, chord.duration, time);
//     }, DrumPattern);
//     this.playPart(this.hiHatTrack);
//    }
//   }

//   toggleClap() {
//     if (this.clapTrack) {
//       this.clapTrack.mute = !this.clapTrack.mute;
//     } else {
//       this.clapTrack = this.clapSample;
//     this.clapTrack = new Tone.Part((time, note) => {
//       this.clapSample.triggerAttackRelease("C3", "16n", time, note.velocity );
//     }, ClapPattern);
//     this.playPart(this.clapTrack);
//    }
//  }


  // playNote(note: string) {
  //   this.sampler.triggerAttack(note);
  // }

  // toggleEverything() {
  //   this.toggleClap();
  //   this.toggleHiHat();
  //   this.toggleKick();
  //   this.toggleSnare();
  // }

  // private playSample(sampleName: string) {
  //   new Tone.Player({
  //     url: `../../assets/${sampleName}.wav`,
  //     autostart: true
  //   }).chain(this.volume, Tone.Destination);
  // }

  // playKick() {
  //   this.playSample('Kick');
  // }
  // playSnare() {
  //   this.playSample('Snare');
  // }
  // playClosedHat() {
  //   this.playSample('ClosedHat');
  // }
  // playClap() {
  //   this.playSample('Clap');
  // }





























toggleRhythm() {
    if (this.drumMachine) {
      this.drumMachine.mute = !this.drumMachine.mute;
    } else {
      this.drumMachine = this.sampler;
    this.drumMachine = new Tone.Part((time, chord) => {
      this.sampler.triggerAttackRelease(chord.note, chord.duration, time);
    }, DrumPattern);
    this.playPart(this.drumMachine);
   }
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
        // this.polySynthSaw.triggerAttackRelease(
        //   chord.note,
        //   chord.duration,
        //   time
        // );
      }, melodyChords);

      this.playPart(this.melodyPart);
    }
  }

  playRandomDrumSample() {
    this.playSample(
      drumSamples[Math.floor(Math.random() * drumSamples.length)]
    );
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

  speedUpBpm() {
    Tone.Transport.bpm.value += 20;
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

      }, DrumPattern);

      this.playPart(this.melodyPart);
    }
  }