import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { PhotoboothStateService } from '../../services/photobooth-state.service';

@Component({
  selector: 'app-capture',
  templateUrl: './capture.page.html',
  styleUrls: ['./capture.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule],
})
export class CapturePage implements OnInit, OnDestroy {
  countdown = 0;
  currentIndex = 0;
  totalShots = 0;
  countdownSeconds = 3;
  isRunning = false;

  private isCancelled = false;
  private countdownIntervalId: number | null = null;
  private countdownTimeoutId: number | null = null;
  private countdownResolver: (() => void) | null = null;

  constructor(
    private readonly state: PhotoboothStateService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    const config = this.state.config;
    this.totalShots = config.totalShots;
    this.countdownSeconds = config.countdownSeconds;
  }

  ngOnDestroy(): void {
    this.clearCountdownTimers();
  }

  async start(): Promise<void> {
    if (this.isRunning || this.totalShots === 0) {
      return;
    }

    this.isRunning = true;
    this.isCancelled = false;
    this.currentIndex = 0;
    this.state.resetSession();

    for (let i = 0; i < this.totalShots; i += 1) {
      if (this.isCancelled) {
        break;
      }

      await this.runCountdown(this.countdownSeconds);
      if (this.isCancelled) {
        break;
      }

      this.state.addShot(`shot-${Date.now()}-${i}`);
      this.currentIndex = i + 1;
    }

    this.isRunning = false;
    if (this.isCancelled) {
      return;
    }

    await this.router.navigateByUrl('/result');
  }

  async cancel(): Promise<void> {
    if (this.isCancelled) {
      return;
    }

    this.isCancelled = true;
    this.isRunning = false;
    this.countdown = 0;
    this.clearCountdownTimers();
    await this.router.navigateByUrl('/config');
  }

  private async runCountdown(seconds: number): Promise<void> {
    this.clearCountdownTimers();
    const totalSeconds = Math.max(1, Math.floor(seconds));
    this.countdown = totalSeconds;

    return new Promise((resolve) => {
      this.countdownResolver = resolve;
      this.countdownIntervalId = window.setInterval(() => {
        if (this.isCancelled) {
          this.countdown = 0;
          this.clearCountdownTimers();
          resolve();
          return;
        }
        this.countdown = Math.max(0, this.countdown - 1);
      }, 1000);

      this.countdownTimeoutId = window.setTimeout(() => {
        this.countdown = 0;
        this.clearCountdownTimers();
        resolve();
      }, totalSeconds * 1000);
    });
  }

  private clearCountdownTimers(): void {
    if (this.countdownIntervalId !== null) {
      clearInterval(this.countdownIntervalId);
      this.countdownIntervalId = null;
    }
    if (this.countdownTimeoutId !== null) {
      clearTimeout(this.countdownTimeoutId);
      this.countdownTimeoutId = null;
    }
    if (this.countdownResolver) {
      const resolver = this.countdownResolver;
      this.countdownResolver = null;
      resolver();
    }
  }
}
