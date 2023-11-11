import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartManagementComponent } from './part-management.component';

describe('PartManagementComponent', () => {
  let component: PartManagementComponent;
  let fixture: ComponentFixture<PartManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PartManagementComponent]
    });
    fixture = TestBed.createComponent(PartManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
