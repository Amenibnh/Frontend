import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateRepaComponent } from './update-repa.component';

describe('UpdateRepaComponent', () => {
  let component: UpdateRepaComponent;
  let fixture: ComponentFixture<UpdateRepaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateRepaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateRepaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
