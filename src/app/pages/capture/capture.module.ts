import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CapturePage } from './capture.page';

const routes: Routes = [
  {
    path: '',
    component: CapturePage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), CapturePage],
})
export class CapturePageModule {}
