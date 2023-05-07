import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/services/auth.guard';
import { ReverseAuthGuard } from './shared/services/reverse-auth.guard';

const routes: Routes = [
  { path: 'not-found', loadChildren: () => import('./pages/not-found/not-found.module').then(m => m.NotFoundModule)},
  { path: 'contacts', loadChildren: () => import('./pages/contacts/contacts.module').then(m => m.ContactsModule) },
  { path: 'products', loadChildren: () => import('./pages/products/products.module').then(m => m.ProductsModule) , canActivate:[AuthGuard]},
  { path: 'main', loadChildren: () => import('./pages/main/main.module').then(m => m.MainModule) },
  { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule), canActivate:[ReverseAuthGuard]},
  { path: 'signup', loadChildren: () => import('./pages/signup/signup.module').then(m => m.SignupModule), canActivate:[ReverseAuthGuard] },
  { path: 'reviews', loadChildren: () => import('./pages/reviews/reviews.module').then(m => m.ReviewsModule), canActivate:[AuthGuard]},
  { path: '', redirectTo: '/main', pathMatch: 'full'},
  { path: '**', redirectTo: '/not-found'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
