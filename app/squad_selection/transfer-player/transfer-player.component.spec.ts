import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferPlayerComponent } from './transfer-player.component';

describe('TransferPlayerComponent', () => {
  let component: TransferPlayerComponent;
  let fixture: ComponentFixture<TransferPlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransferPlayerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransferPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
