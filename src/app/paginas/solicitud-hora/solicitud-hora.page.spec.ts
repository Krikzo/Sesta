import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SolicitudHoraPage } from './solicitud-hora.page';

describe('SolicitudHoraPage', () => {
  let component: SolicitudHoraPage;
  let fixture: ComponentFixture<SolicitudHoraPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitudHoraPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
