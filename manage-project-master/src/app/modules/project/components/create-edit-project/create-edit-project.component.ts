import { OnInit, Component, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProjectService } from '../../project.service';
import { Category, Project } from '../../models/project.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-edit-project',
  templateUrl: './create-edit-project.component.html',
  styleUrls: ['./create-edit-project.component.scss']
})
export class CreateEditProjectComponent implements OnInit {

  listProjectCategory: Category[] = [];
  formProject: FormGroup;
  isEdit: boolean = false;
  title: string = 'Create Project';
  creator: number | undefined;

  constructor(
    private _projectService: ProjectService,
    private _fb: FormBuilder,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<CreateEditProjectComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Project
  ) {

    if (this.data?.id) {
      this.isEdit = true;
      this.title = 'Edit Project'
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
    this._projectService.getProjectCategory().subscribe((res) => {
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
      this._snackBar.open('Required: ', 'Please input correct value required', {
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
