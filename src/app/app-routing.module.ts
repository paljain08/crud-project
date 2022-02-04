import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from './add/add.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path:"",redirectTo:'home',pathMatch:'full'},
  {path:"home",component:HomeComponent},
  {path:"add",component:AddComponent},
  {path:"edit/:id",component:AddComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
