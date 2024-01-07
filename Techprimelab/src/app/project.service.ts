import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from './project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
 

  private baseUrl = 'http://localhost:8080/project'; 

  constructor(private http: HttpClient) { }

  createProject(project: Project): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}/create`, project);
  }

  getProjectInfo(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/projectinfo`);
  }

  getDashboardChart(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/dashboardchart`);
  }

  
  getAllProjects(search: string, page: number, sort: string): Observable<Project[]> {
    const params = { search, page: page.toString(), sort };
    return this.http.get<Project[]>(`${this.baseUrl}/list`, { params });
  }

  updateProjectStatus(id: number, status: string): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/status/${id}/${status}`, {});
  }

  
}
