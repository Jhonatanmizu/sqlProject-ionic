import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // {
  //   path: 'home',
  //   loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  // },
  {
    path: '',
    redirectTo: 'contacts',
    pathMatch: 'full'
  },
  // {
  //   path: 'product',
  //   loadChildren: () => import('./pages/details/details.module').then(m => m.DetailsPageModule)
  // },
  {
    path: 'contacts',
    loadChildren: () => import('./pages/contacts/contact-list/contact-list.module').then(m => m.ContactListPageModule)
  },
  {
    path: 'contacts/new',
    loadChildren: () => import('./pages/contacts/contact-form/contact-form.module').then(m => m.ContactFormPageModule)
  },
  {
    path: 'contacts/edit/:id',
    loadChildren: () => import('./pages/contacts/contact-form/contact-form.module').then(m => m.ContactFormPageModule)
  },

  // {
  //   path: 'contact-form',
  //   loadChildren: () => import('./pages/contacts/contact-form/contact-form.module').then(m => m.ContactFormPageModule)
  // },
  // {
  //   path: 'contact-list',
  //   loadChildren: () => import('./pages/contacts/contact-list/contact-list.module').then(m => m.ContactListPageModule)
  // },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
