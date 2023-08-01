import { Component, Inject, OnInit } from '@angular/core';
import { ProjectService } from '../../project.service';
import { Category, Project } from '../../models/project.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProjectCategoryService } from 'src/app/modules/shared/services/project-category.service';

@Component({
  selector: 'app-create-edit-project',
  templateUrl: './create-edit-project.component.html',
  styleUrls: ['./create-edit-project.component.scss']
})
export class CreateEditProjectComponent implements OnInit {

  title: string = 'Create Project';
  listProjectCategory: Category[] = [];
  formProject: FormGroup;
  isEdit: boolean = false;
  creator: number | undefined;

  constructor(
    private _projectService: ProjectService,
    private _fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private _projectCategoryService: ProjectCategoryService,
    public dialogRef: MatDialogRef<CreateEditProjectComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Project
  ) {

    if (this.data?.id) {
      this.isEdit = true;
      this.title = 'Edit Project';
    }

    this.formProject = this._fb.group({
      id: this.data?.id,
      projectName: [this.data?.projectName, Validators.required],
      categoryId: this.data?.categoryId ?? 1,
      description: this.data?.description,
      creator: 0
    })
  }

  ngOnInit(): void {
    this.getProjectCategory();
  }

  getProjectCategory() {
    this._projectCategoryService.getProjectCategory().subscribe((res) => {
      this.listProjectCategory = res.content;
    })
  }

  public myError = (controlName: string, errorName: string) => {
    return this.formProject?.controls[controlName].hasError(errorName);
  }

  onChangeCategory() {
    console.log(this.formProject);
  }

  onSave() {
    if (this.formProject.invalid) {
      this._snackBar.open('Please input correct value required', 'Create Project', {
        verticalPosition: 'top',
        panelClass: 'error-snackbar',
        duration: 3000,
      })
      return;
    }

    const val = this.formProject.value;

    if (val.id) {
      this._projectService.updateProject(val.id, val).subscribe((res) => {
        if (res?.statusCode === 200) {
          this._snackBar.open(res.message, '', {
            duration: 3000,
            verticalPosition: 'top',
            panelClass: 'success-snackbar'
          })
          this.dialogRef.close();
        }
      },
        error => {
          this.dialogRef.close();
        })
    } else {
      this._projectService.createProject(val).subscribe((res) => {
        if (res?.statusCode === 200) {
          this._snackBar.open(res.message, 'Create Project', {
            duration: 3000,
            verticalPosition: 'top',
            panelClass: 'success-snackbar'
          })
          this.dialogRef.close();
        } else {

        }

      })
    }


  }

}
