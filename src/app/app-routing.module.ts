import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './components/list/list.component';
import { ContentComponent } from './components/content/content.component';
const routes: Routes = [
  {
    path:'list',
    component:ListComponent
  },
  {
     path:'content/:id',
     component:ContentComponent
  }
  ,
  {
    path:'',
    component:ContentComponent
 }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }