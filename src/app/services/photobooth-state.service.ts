import { Injectable } from '@angular/core';

export type LayoutPreset = '2x2' | 'strip';

export interface PhotoboothConfig {
  layout: LayoutPreset;
  countdownSeconds: number;
  totalShots: number;
  useFrontCamera: boolean;
}

@Injectable({ providedIn: 'root' })
export class PhotoboothStateService {
  private configState: PhotoboothConfig = {
    layout: '2x2',
    countdownSeconds: 3,
    totalShots: 4,
    useFrontCamera: true,
  };

  private shotsState: string[] = [];

  get config(): PhotoboothConfig {
    return { ...this.configState };
  }

  get shots(): string[] {
    return [...this.shotsState];
  }

  setConfig(patch: Partial<PhotoboothConfig>): void {
    this.configState = { ...this.configState, ...patch };
  }

  resetSession(): void {
    this.shotsState = [];
  }

  addShot(fakePath: string): void {
    this.shotsState = [...this.shotsState, fakePath];
  }
}
