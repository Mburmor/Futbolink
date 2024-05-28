import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard'; // Importa el guardia de autenticación

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
    // No proteger esta ruta para que sea accesible siempre
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'create-match',
    loadChildren: () => import('./pages/create-match/create-match.module').then(m => m.CreateMatchPageModule),
    canActivate: [AuthGuard] //Ruta protegida
  },
  {
    path: 'match-list',
    loadChildren: () => import('./pages/match-list/match-list.module').then(m => m.MatchListPageModule),
    canActivate: [AuthGuard] //Ruta protegida
  },
  {
    path: 'menu',
    loadChildren: () => import('./menu/menu.module').then(m => m.MenuPageModule),
    canActivate: [AuthGuard] //Ruta protegida
  },
  {
    path: 'fotografias',
    loadChildren: () => import('./fotografias/fotografias.module').then(m => m.FotografiasPageModule),
    canActivate: [AuthGuard] //Ruta protegida
  },
  {
    path: 'tactibot',
    loadChildren: () => import('./pages/tactibot/tactibot.module').then(m => m.TactibotModule),
    canActivate: [AuthGuard] //Ruta protegida
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule),
    canActivate: [AuthGuard] //Ruta protegida
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
