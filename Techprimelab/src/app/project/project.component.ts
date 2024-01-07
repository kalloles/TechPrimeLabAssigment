import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectService } from '../project.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent {
  
  formData: any = {
    Projecttheme: '',
    reason: 'For Business',
    type: 'internal',
    division: 'Filters',
    category: 'Quality A',
    priority: 'High',
    department: 'Strategy',
    startDate: '',
    endDate: '',
    location: 'Pune',
  };

  projectForm: FormGroup; 

  constructor(private fb: FormBuilder, private projectService: ProjectService ,private router: Router) {

    this.projectForm = this.fb.group({
      projectTheme: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
    
    });
  }

  handleInputStartDateChange(event: any): void {
    this.formData = { ...this.formData, Startdate: event.target.value };
  }

  handleInputEndDateChange(event: any): void {
    this.formData = { ...this.formData, Enddate: event.target.value };
  }

  handleSubmit(): void {
    if (
      this.formData.projectTheme !== '' &&
      this.formData.startDate !== '' &&
      this.formData.endDate !== ''
    ) {
      console.log('Form Data:', this.formData);
  
      
      const dataToSave = {
        ...this.formData,
       
        Projecttheme: this.formData.Projecttheme
      };
  
      this.projectService.createProject(dataToSave).subscribe(
        response => {
          alert(response);
          // this.router.navigate(['/project-list']);
        },
        error => {
          console.error('API Error:', error);
          this.router.navigate(['/project-list']);
        }
      );
    }
  }
  
  handleTypeChange(value: string): void {
    this.formData.type = value; 
  }
  handleCategoryChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.formData.category = target.value;
  }
  
  handleDivisionChange(event :Event):void
{
  const target = event.target as HTMLSelectElement;
  this.formData.division= target.value;
}  
  
}
