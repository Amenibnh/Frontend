import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetAllRepasComponent } from './get-all-repas.component';

describe('GetAllRepasComponent', () => {
  let component: GetAllRepasComponent;
  let fixture: ComponentFixture<GetAllRepasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetAllRepasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GetAllRepasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
