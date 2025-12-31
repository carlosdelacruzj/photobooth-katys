import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import {
  LayoutPreset,
  PhotoboothStateService,
} from '../../services/photobooth-state.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.page.html',
  styleUrls: ['./result.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule],
})
export class ResultPage implements OnInit {
  layout: LayoutPreset = '2x2';
  shots: string[] = [];

  constructor(
    private readonly state: PhotoboothStateService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.layout = this.state.config.layout;
    this.shots = this.state.shots;
  }

  async startNewSession(): Promise<void> {
    await this.router.navigateByUrl('/config');
  }
}
