import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmJoinComponent } from './confirm-join.component';

describe('ConfirmJoinComponent', () => {
  let component: ConfirmJoinComponent;
  let fixture: ComponentFixture<ConfirmJoinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmJoinComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmJoinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
