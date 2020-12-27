import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactCreateComponent } from './components/contact-create/contact-create.component';
import { ContactEditComponent } from './components/contact-edit/contact-edit.component';
import { ContactListComponent } from './components/contact-list/contact-list.component';

const routes: Routes = [
  {
    path: 'contact-list', component: ContactListComponent
  },
  {
    path: 'contact-create', component: ContactCreateComponent
  },
  {
    path: 'contact-edit/:id', component: ContactEditComponent
  },
  { path: '', redirectTo: 'contact-list' , pathMatch: 'full' },
  { path: '**', redirectTo: 'contact-list' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
