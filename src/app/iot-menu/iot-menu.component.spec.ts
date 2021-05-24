import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IotMenuComponent } from './iot-menu.component';

describe('IotMenuComponent', () => {
  let component: IotMenuComponent;
  let fixture: ComponentFixture<IotMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IotMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IotMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
