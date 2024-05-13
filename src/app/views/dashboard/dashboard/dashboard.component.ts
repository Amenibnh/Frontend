 
import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { DashboardService } from './dashboard.service'
// import { DashboardChartsData, IChartProps } from './dashboard-charts-data';
import { Router } from '@angular/router';
import { brandSet, flagSet, freeSet } from '@coreui/icons';



@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.css']
})
@Injectable({
  providedIn: 'root',
})
export class DashboardComponent implements OnInit {
  
  users: any[]= [];
  malePercentage: number = 0;
  femalePercentage: number = 0;
  RecurringUserCount:number=0;
  newUsersCount:number=0;
  public dailyStatistics: { date: string, newUsersPercentage: number, totalCountPercentage: number }[] = [];

  constructor(private userService: DashboardService, private router: Router) {
    this.dailyStatistics = [];

   }

  ngOnInit(): void {
    // this.initCharts();
    this.getAllUsers();

  }
  getAllUsers() {
    // console.log(this.dailyStatistics);
    this.userService.getAllUsers().subscribe(
      (response) => {
        this.users = response.users.map((user: any) => {
          user.activity = this.formatLastActivity(user.activity);
          return user;
        });
        this.RecurringUserCount=response.totalCount;
        this.newUsersCount = response.newUsersCount;
        this.malePercentage = response.malePercentage;
        this.femalePercentage = response.femalePercentage;

        // this.calculateDailyStatistics();
       
        console.log(this.users);
      },
      (error) => {
        console.error(error);
      }
    );
  }
  // Status------------------------------
  getStatus(status: string): string {
    switch (status) {
      case 'connected':
          return 'green'; 
      case 'disconnected':
          return 'gray'; 
      default:
          return ''; 
  }
  }
  // Color Bar Usage------------------
  getProgressBarColor(usage: number): string {
    if (usage < 30) {//inférieures à 30%
      return 'bg-success';
    } else if (usage < 60) {
      return 'bg-info';
    } else if (usage < 80) {
      return 'bg-warning';
    } else {
      return 'bg-danger';
    }
  }
// Last deconnexion------------------
 formatLastActivity(lastActivity: any): string {
  const activityDate = new Date(lastActivity);
  const currentDate = new Date();

  // Calculer la différence de mois entre les dates
  const diffMonths = (currentDate.getFullYear() - activityDate.getFullYear()) * 12 + (currentDate.getMonth() - activityDate.getMonth());
  
  if (isNaN(diffMonths)){
    return 'Connection not established';
  }

  if (diffMonths === 0) {
      const diffMilliseconds = currentDate.getTime() - activityDate.getTime();
      const diffSeconds = Math.floor(diffMilliseconds / 1000);
      const diffMinutes = Math.floor(diffSeconds / 60);
      const diffHours = Math.floor(diffMinutes / 60);
      const diffDays = Math.floor(diffHours / 24);

      if (diffSeconds < 60) {
          return 'just now';
      } else if (diffMinutes === 1) {
          return 'a minute ago';
      } else if (diffMinutes < 60) {
          return `${diffMinutes} minutes ago`;
      } else if (diffHours === 1) {
          return 'an hour ago';
      } else if (diffHours < 24) {
          return `${diffHours} hours ago`;
      } else if (diffDays === 1) {
          return 'Yesterday';
      } else if (diffDays < 7) {
          return `${diffDays} days ago`;
      } else {
          return `${diffDays} days ago`;
      }
  } else if (diffMonths === 1) {
      return 'Last month';
  } else if (diffMonths < 12) {
      return `${diffMonths} months ago`;
  }else if(diffMonths>=12 && diffMonths<24){
       return 'Last year';
  } else {
      return 'more than a year ago';
  }
}



  
  //pourcentages de newUsersCount et totalCount pour chaque jours
  // calculateDailyStatistics() {
  //   const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  //   const dailyStatisticsMap = new Map<string, { newUsersCount: number, totalCount: number }>();
  
  //   // Initialize dailyStatisticsMap with 0 counts for each day
  //   daysOfWeek.forEach(day => {
  //     dailyStatisticsMap.set(day, { newUsersCount: 0, totalCount: 0 });
  //   });
  
  //   this.users.forEach((user: any) => {
  //     const registrationDate = new Date(user.registered);
  //     const dayOfWeek = daysOfWeek[registrationDate.getDay()]; // Getting the day of the week
  //     const dailyStatistics = dailyStatisticsMap.get(dayOfWeek);
  //     if (dailyStatistics) {
  //       dailyStatistics.totalCount += 1; // Incrementing total count for the day
  //       if (registrationDate >= new Date(new Date().setHours(0, 0, 0, 0))) {
  //         // Checking if the registration date is today or later
  //         dailyStatistics.newUsersCount += 1; // Incrementing new users count for the day
  //       }
  //     }
  //   });
  
  //   const totalUsers = this.users.length; // Total number of users
  
  //   dailyStatisticsMap.forEach((value, key) => {
  //     const { newUsersCount, totalCount } = value;
  //     const newUsersPercentage = (newUsersCount / totalUsers) * 100; // Calculating percentage of new users
  //     const totalCountPercentage = (totalCount / totalUsers) * 100; // Calculating percentage of total count
  //     this.dailyStatistics.push({ date: key, newUsersPercentage, totalCountPercentage });
  //   });
  // }
  
  
}
