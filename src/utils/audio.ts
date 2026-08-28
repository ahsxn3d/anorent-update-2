// Sound engine completely muted per user request
class SoundEngine {
  public toggleSound(): boolean {
    return false;
  }

  public isSoundEnabled(): boolean {
    return false;
  }

  public setSoundEnabled(_val: boolean) {}

  public playSquish() {}

  public playHover() {}

  public playClick() {}

  public playPageSwitch() {}

  public playChime() {}
}

export const sound = new SoundEngine();
