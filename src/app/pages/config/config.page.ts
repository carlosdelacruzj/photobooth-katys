import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import {
  LayoutPreset,
  PhotoboothStateService,
} from '../../services/photobooth-state.service';

@Component({
  selector: 'app-config',
  templateUrl: './config.page.html',
  styleUrls: ['./config.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
})
export class ConfigPage implements OnInit {
  layout: LayoutPreset = '2x2';
  countdownSeconds = 3;
  totalShots = 4;
  useFrontCamera = true;

  constructor(
    private readonly state: PhotoboothStateService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    const config = this.state.config;
    this.layout = config.layout;
    this.countdownSeconds = config.countdownSeconds;
    this.totalShots = config.totalShots;
    this.useFrontCamera = config.useFrontCamera;
  }

  async start(): Promise<void> {
    this.state.setConfig({
      layout: this.layout,
      countdownSeconds: this.countdownSeconds,
      totalShots: this.totalShots,
      useFrontCamera: this.useFrontCamera,
    });
    this.state.resetSession();
    await this.router.navigateByUrl('/capture');
  }
}
