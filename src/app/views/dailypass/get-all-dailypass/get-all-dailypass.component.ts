import { Component, OnInit, ElementRef } from '@angular/core';
import {GetAllDailypassService} from './get-all-dailypass.service'

@Component({
  selector: 'app-get-all-dailypass',
    templateUrl:'./get-all-dailypass.component.html',
    styleUrls: ['./get-all-dailypass.component.css']
  })
export class GetAllDailypassComponent implements OnInit {
  dailypass: any;
  ascendingOrder: boolean = true;
  sortBy: string = ''; 
  constructor( private el: ElementRef, private dailypassService: GetAllDailypassService) { }

  ngOnInit(): void {
    this.getAllDailypass();

    //1/Searching with ID
    const input = document.querySelector('.input-group input') as HTMLInputElement | null;
    if (input) {
      input.addEventListener('input', (event) => {
        this.searchTable('ID');
      });
    }
 
    
    // Define table headings for sorting
    const table_headings = document.querySelectorAll('th');

    // Sorting functionality
    table_headings.forEach((head, i) => {
      let sort_asc = true;
      head.onclick = () => {
        table_headings.forEach(head => head.classList.remove('active'));
        head.classList.add('active');

        document.querySelectorAll('td').forEach(td => td.classList.remove('active'));
        const table_rows = document.querySelectorAll('tbody tr');
        table_rows.forEach(row => {
          row.querySelectorAll('td')[i].classList.add('active');
        });
        head.classList.toggle('asc',sort_asc);
        
      };
    });
  }

   

  getAllDailypass() {
    this.dailypassService.getAllDailypass().subscribe(
      (response) => {
        this.dailypass = response.dailypass;
        console.log(this.dailypass);
      },
      (error) => {
        console.error(error);
      }
    );
  }
  
  deleteDailyPass(id:any){
    this.dailypassService.deleteDailyPass(id).subscribe(
      (response) => {
        // this.dailypass = response.dailyPass;
        console.log("worked!");
        //to refresh the page
        window.location.reload()
      },
      (error) => {
        console.error(error);
      }
    );}
    
  // 1. Searching with ID

    searchTable(searchType: string = ''): void {
      const input = document.querySelector('.input-group input') as HTMLInputElement | null;
      if (!input) return;
    
      const filter = input.value.trim().toUpperCase(); 
      const table = document.querySelector('table') as HTMLTableElement | null;
      if (!table) return;
    
      const rows = table.getElementsByTagName('tr');
      for (let i = 0; i < rows.length; i++) {
        let shouldHide = false; // ne pas masquer la ligne si le champ de recherche est vide
        if (filter !== '') { // Si le champ de recherche n'est pas vide
          const cells = rows[i].getElementsByTagName('td');
          for (let j = 0; j < cells.length; j++) {
            const cell = cells[j];
            if (cell) {
              let txtValue = (cell.textContent || cell.innerText).trim().toUpperCase(); 
              if (searchType === 'ID') {//recherche par id
                const cellValue = parseFloat(txtValue);
                if (!isNaN(cellValue) && cellValue === parseFloat(filter)) {
                  shouldHide = false; // Ne pas masquer la ligne si le filtre correspond
                  break;
                } else {
                  shouldHide = true; // Masquer la ligne si le filtre ne correspond pas
                }
              } else if (!txtValue.includes(filter)) {
                shouldHide = true; // Masquer la ligne si le filtre ne correspond pas
              }
            }
          }
        }
        rows[i].style.display = shouldHide ? 'none' : '';
      }
    }
   



    sortTable(): void {
      // Tri du tableau en fonction de la colonne "Dish Name"
      this.dailypass.sort((a: any, b: any) => {
        const firstValue = a.repaId.nomRepa.toString().toLowerCase();
        const secondValue = b.repaId.nomRepa.toString().toLowerCase();
        if (this.ascendingOrder) {
          return firstValue.localeCompare(secondValue);
        } else {
          return secondValue.localeCompare(firstValue);
        }
      });
      // Inversion de l'ordre de tri
      this.ascendingOrder = !this.ascendingOrder;
    }

}
