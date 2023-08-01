import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { ProjectDetailComponent } from './components/project-detail/project-detail.component';
import { TaskDetailComponent } from './components/task-detail/task-detail.component';
import { CreateUpdateTaskComponent } from './components/create-update-task/create-update-task.component';
import { ProjectComponent } from './components/project-list/project-list.component';
import { ProjectRouterComponent } from './project-router.component';

const routes: Routes = [

  {
    path: '',
    component: ProjectRouterComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: ProjectComponent,
        canActivate: [AuthGuard]
      },
      {
        path: ':id',
        component: ProjectDetailComponent,
        canActivate: [AuthGuard]
      },
      {
        path: ':projectId/task-detail/:id',
        component: TaskDetailComponent
      },
      {

        path: ':projectId/task/:taskId',
        component: CreateUpdateTaskComponent
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule { }
