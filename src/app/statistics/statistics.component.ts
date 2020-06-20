import { Component, OnInit } from '@angular/core';
import { DataService } from 'app/services/app-data/data.service';
import { SharedDataService } from 'app/services/shared-data/shared-data.service';
import { empty } from 'app/utils/common-methods';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
})
export class StatisticsComponent implements OnInit {
  title = 'Downloads Statistics';
  chart = [];
  lineModel: true;
  data: any;
  data1: any;
  data2: any;
  data3: any;
  statsLoad: boolean;
  constructor(private dataService: DataService, private sharedService: SharedDataService) {
    this.sharedService.getChartStatsSet().subscribe(res => {
      if (res === 0) {
        this.dataService.getChartData().subscribe(stats => {
          this.sharedService.setChartStatistics(stats);
        })
      } else {
        this.fetchStatistics();
      }
    })
  }
  ngOnInit() {
  }
  fetchStatistics() {
    this.sharedService.getChartStatistics().subscribe(res => {
      if (empty(res)) {
        return;
      }
      // Day_Names
      console.log(res);

      const weeksComparison = res['comparison']['weeks'];
      // tslint:disable-next-line: prefer-const
      let labels = [], dataSet1 = [], dataSet2 = [];
      weeksComparison['this_week'].forEach(element => {
        labels.push(element['day']);
        dataSet1.push(element['total_reads']);
      });
      weeksComparison['last_week'].forEach(element => {
        dataSet2.push(element['total_reads']);
      });
      this.data = {
        labels: labels,
        datasets: [
          {
            label: 'This week reads',
            backgroundColor: '#42A5F5',
            borderColor: '#1E88E5',
            data: dataSet1,
          },
          {
            label: 'Last week reads',
            backgroundColor: '#9CCC65',
            borderColor: '#7CB342',
            data: dataSet2
          },
        ],
      };

      const monthsComparison = res['comparison']['months'];
      // tslint:disable-next-line: prefer-const
      labels = [], dataSet1 = [], dataSet2 = [];
      monthsComparison['this_month'].forEach(element => {
        labels.push(element['week']);
        dataSet1.push(element['total_reads']);
      });
      monthsComparison['last_month'].forEach(element => {
        dataSet2.push(element['total_reads']);
      });
      this.data2 = {
        labels: labels,
        datasets: [
          {
            label: 'This Month',
            data: dataSet1,
            fill: false,
            borderColor: '#4bc0c0',
          },
          {
            label: 'Last Month',
            data: dataSet2,
            fill: false,
            borderColor: '#565656',
          },
        ],
      };


      const daysStats = res['statistics']['day_names'];
      // tslint:disable-next-line: prefer-const
      labels = [], dataSet1 = [], dataSet2 = [];
      daysStats.forEach(element => {
        labels.push(element['day']);
        dataSet1.push(element['total_reads']);
      });

      this.data1 = {
        labels: labels,
        datasets: [
          {
            data: dataSet1,
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#65DEF1',
              '#D62828', '#F77F00', '#003049'],
            hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#65DEF1',
              '#D62828', '#F77F00', '#003049']
          },
        ],
      };

      const monthStats = res['statistics']['months'];
      // tslint:disable-next-line: prefer-const
      labels = [], dataSet1 = [], dataSet2 = [];
      monthStats.forEach(element => {
        labels.push(element['month']);
        dataSet1.push(element['total_reads']);
      });

      this.data3 = {
        datasets: [
          {
            data: dataSet1,
            backgroundColor: [
              '#FF6384', '#4BC0C0', 'F49D6E',
              '#FFCE56', '#F96900', '#36A2EB',
              '#D62828', '#F77F00', '#003049',
              '#750D37', '#353D2F', '#A40E4C'

            ],
            label: 'My dataset',
          },
        ],
        labels: labels
      };
      this.statsLoad = true;
    });
  }

}
