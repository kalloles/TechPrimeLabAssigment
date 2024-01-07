import { Component } from '@angular/core';
import { ProjectService } from '../project.service';
import { ChartOptions, ChartDataset, TooltipLabelStyle } from 'chart.js';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent {
  data: any[] = [];
  chartData: ChartDataset[] = [];
  chartLabels: TooltipLabelStyle[] = [];
  chartOptions: ChartOptions = {
    responsive: true,
    scales: {
      x: { beginAtZero: true },
      y: { beginAtZero: true },
    },
  };

  constructor(private projectService: ProjectService) {}



  ngOnInit() {

  this.projectService.getDashboardChart().subscribe(
    (res) => {
      this.data = res;

      this.chartLabels = this.data.map((el) => el.department);
      this.chartData = [
        {
          data: this.data.map((el) => el.registeredCount),
          label: 'Total',
          backgroundColor: 'blue',
        },
        {
          data: this.data.map((el) => el.closedCount),
          label: 'Closed',
          backgroundColor: 'green',
        },
      ];
    },
    (error) => console.log(error)
  );
}
}