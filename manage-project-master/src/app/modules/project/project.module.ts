import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectRoutingModule } from './project-routing.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { CreateEditProjectComponent } from './components/create-edit-project/create-edit-project.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditorModule } from "@tinymce/tinymce-angular";
import { ProjectDetailComponent } from './components/project-detail/project-detail.component';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { FirstCharacterPipePipe } from '../shared/pipes/first-character-pipe.pipe';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { TaskDetailComponent } from './components/task-detail/task-detail.component';
import { CreateUpdateTaskComponent } from './components/create-update-task/create-update-task.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { ProjectComponent } from './components/project-list/project-list.component';
import { ProjectRouterComponent } from './project-router.component';
@NgModule({
  declarations: [
    ProjectComponent,
    CreateEditProjectComponent,
    ProjectDetailComponent,
    FirstCharacterPipePipe,
    TaskDetailComponent,
    CreateUpdateTaskComponent,
    ProjectRouterComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    ProjectRoutingModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    EditorModule,
    MatButtonModule,
    MatMenuModule,
    MatAutocompleteModule,
    MatIconModule,
    MatProgressBarModule,
    MatDialogModule
  ],

})
export class ProjectModule { }
