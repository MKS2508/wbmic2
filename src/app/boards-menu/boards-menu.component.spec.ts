import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardsMenuComponent } from './boards-menu.component';

describe('BoardsMenuComponent', () => {
  let component: BoardsMenuComponent;
  let fixture: ComponentFixture<BoardsMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardsMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardsMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
