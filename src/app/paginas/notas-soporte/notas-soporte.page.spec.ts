import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotasSoportePage } from './notas-soporte.page';

describe('NotasSoportePage', () => {
  let component: NotasSoportePage;
  let fixture: ComponentFixture<NotasSoportePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NotasSoportePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
