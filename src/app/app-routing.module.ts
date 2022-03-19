import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';
import { ErrorComponent } from './shared/error/error.component';


const routes:Routes = [
  {
    path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'sf', loadChildren: () => import('./sf/sf.module').then(m =>  m.SfModule),
    canLoad: [AuthGuard], canActivate: [AuthGuard]
  },
  {
    path: '404', component: ErrorComponent
  },
  {
    path: '**', redirectTo: '404'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
