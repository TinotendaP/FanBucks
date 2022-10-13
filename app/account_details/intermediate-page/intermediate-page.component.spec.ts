import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntermediatePageComponent } from './intermediate-page.component';

describe('IntermediatePageComponent', () => {
  let component: IntermediatePageComponent;
  let fixture: ComponentFixture<IntermediatePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntermediatePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IntermediatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
