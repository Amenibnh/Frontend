import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetAllDailypassComponent } from './get-all-dailypass.component';

describe('GetAllDailypassComponent', () => {
  let component: GetAllDailypassComponent;
  let fixture: ComponentFixture<GetAllDailypassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetAllDailypassComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GetAllDailypassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
