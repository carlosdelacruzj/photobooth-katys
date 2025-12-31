import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfigPage } from './config.page';

const routes: Routes = [
  {
    path: '',
    component: ConfigPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), ConfigPage],
})
export class ConfigPageModule {}
