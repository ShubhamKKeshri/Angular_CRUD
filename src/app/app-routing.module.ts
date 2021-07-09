import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from './add/add.component';
import { UpdateComponent } from './update/update.component';
import { ListComponent } from './list/list.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path:"", component:AddComponent
  },
  {
    path:"add", component:AddComponent
  },
  {
    path:"update", component:UpdateComponent
  },
  {
    path:"list", component:ListComponent
  },
  {
    path:"login", component:LoginComponent
  },
  {
    path:"register", component:RegisterComponent
  },
  {
    path:"**", component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
