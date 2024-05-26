import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard, loggedInGuard } from './views/auth.guard';

import { Page404Component } from './views/pages/page404/page404.component';
import { Page500Component } from './views/pages/page500/page500.component';
import { LoginComponent } from './views/pages/login/login.component';
import { RegisterComponent } from './views/pages/register/register.component';
import { ForgetPasswordComponent } from './views/pages/forget-password/forget-password.component';
import { ResetPasswordComponent } from './views/pages/reset-password/reset-password.component';
import { HomeComponent } from './views/home/home/home.component';
import { DashComponent } from './containers/dash/dash.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: '',
    component: DashComponent,
    data: {
      title: ''
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./views/dashboard/dashboard.module').then((m) => m.DashboardModule),
        canActivate: [authGuard]
      },
      {
        path: 'pages',
        loadChildren: () =>
          import('./views/pages/pages.module').then((m) => m.PagesModule),
      },
      // {
      //   path: 'users',
      //   loadChildren: () =>
      //     import('./views/users/users.module').then((m) => m.UsersModule),
      //   canActivate: [authGuard]

      // },
      {
        path: 'dailypass',
        loadChildren: () =>
          import('./views/dailypass/dailypass.module').then((m) => m.DailypassModule),
        canActivate: [authGuard]

      },
      {
        path: 'Profile',
        loadChildren: () =>
          import('./views/profile/profile.module').then((m) => m.ProfileModule),
        canActivate: [authGuard]
      },
      {
        path:'AdminGlobal',
        loadChildren:()=>
          import('./views/admin-global/admin-global.module').then((m) => m.AdminGlobalModule),
        canActivate: [authGuard]
      },
      {
        path:'Resultat',
        loadChildren:()=>
          import('./views/resultat/resultat.module').then((m) => m.ResultatModule),
        canActivate: [authGuard]

      }
      ,
      {
        path:'Home',
        loadChildren: () =>
         import('./views/home/home.module').then((m)=>m.HomeModule)
      },
      
    ]
  },
  {
    path: '404',
    component: Page404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: Page500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    },
    canActivate: [loggedInGuard]
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page'
    },
    canActivate: [loggedInGuard]
  },
  {
    path: 'forget-password',
    component: ForgetPasswordComponent,
    data: {
      title: 'forget-password Page'
    },
    canActivate: [loggedInGuard]
  },{
    path: 'reset-Password',
    component: ResetPasswordComponent,
    data: {
      title: 'reset-Password Page'
    },
    canActivate: [loggedInGuard]
  },
  {
    path: 'ameni',
    component: HomeComponent,
    data: {
      title: 'Page Home'
    }
  },{ path: '**', redirectTo: 'dashboard' }

];

@NgModule({
  imports: [
    // RouterModule,
    // RouterModule.forRoot(routes)

    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
      anchorScrolling: 'enabled',
      initialNavigation: 'enabledBlocking'
      // relativeLinkResolution: 'legacy'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}