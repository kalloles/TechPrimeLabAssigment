import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ProjectService } from '../project.service';
import { Project } from '../project';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent {

  projects: Project[] = [];
  paginatedProjects: Project[] = [];
  search: string = '';
  sortColumn: string = '';
  currentPage: number = 1;
  pageSize: number = 10;
  totalItems: number = 0;

  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects() {
    this.projectService.getAllProjects(this.search, this.currentPage, this.sortColumn)
      .subscribe((projects: Project[]) => {
        this.projects = projects;
        this.totalItems = this.projects.length;
        this.paginateProjects();
      });
  }

  paginateProjects() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedProjects = this.projects.slice(startIndex, endIndex);
  }

  updateStatus(id: number | undefined, status: string) {
    if (id) {
      this.projectService.updateProjectStatus(id, status)
        .subscribe(() => {
          const projectToUpdate = this.projects.find(p => p.id === id);
          if (projectToUpdate) {
            projectToUpdate.status = status;
          }
        });
    }
  }

  onSearch() {
    this.loadProjects();
  }

  onSort() {
    this.loadProjects();
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.paginateProjects();
  }

  get pages(): number[] {
    return Array(Math.ceil(this.totalItems / this.pageSize)).fill(0).map((_, i) => i + 1);
  }
}