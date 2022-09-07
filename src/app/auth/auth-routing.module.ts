import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';

const route: Routes = [
  {
    path: '',
    children: [
      {
        path: 'login',
        component:  LoginComponent
      },
      {
        path: 'Registro',
        component: RegistroComponent
      },
      {
        path: '**',
        redirectTo: 'login'
      }
    ]
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild ( route )
  ],
  exports: [
    RouterModule
  ]
})
export class AuthRoutingModule { }
