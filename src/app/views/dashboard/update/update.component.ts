import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UpdateService } from './update.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  userId: string = '';
  patient: any = {};
  message: string = '';
  errMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private updateService: UpdateService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.userId = params.get('userId') || '';
      console.log('ID de l\'utilisateur récupéré :', this.userId);

      if (this.userId) {
        this.updateService.getPatientById(this.userId).subscribe(
          (response) => {
            this.patient = response;
          },
          (error) => {
            console.error(error);
          }
        );
      }
    });
  }

  updatePatient(event: any) {
    event.preventDefault();
    if (!this.userId) {
      console.error('ID de l\'utilisateur non défini');
      return;
    }
    this.updateService.updatePatient(this.userId, this.patient).subscribe(
      (response) => {
        this.message = 'success';
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        console.error(error);
        this.message = 'failed';
      }
    );
  }
}
