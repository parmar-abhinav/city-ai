import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReportissueComponent } from './reportissue/reportissue.component';

const routes: Routes = [
  { path: '', component: HomeComponent }, // Default route
  { path: 'dashboard', component: DashboardComponent },
  { path: 'issues', component: ReportissueComponent },
  { path: '**', redirectTo: '' } // Redirects any unknown route to home
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
