import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'Features',
        loadChildren: () =>
          import('./features/features.module').then((x) => x.FeaturesModule),
      },

      {
        path: 'Shared',
        loadChildren: () =>
          import('./shared/shared.module').then((x) => x.SharedModule),
      },
      {
        path: '',
        redirectTo: '/Features/salary-calculator',
        pathMatch: 'full',
      },
      {
        path: '**',
        redirectTo: '/Shared/not-found',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
