import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
chartOptions: any;
chartLabels: any;
chartData: any;
projectInfo: any = {};
  

constructor(private projectService: ProjectService, @Inject(PLATFORM_ID) private platformId: Object) {}

ngOnInit() {
  this.projectService.getProjectInfo().subscribe(
    (res) => (this.projectInfo = res),
    (error) => console.log(error)
  );

 
}

}
