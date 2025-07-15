import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

// Importamos el componente usando default export
import {BottomBarComponent} from './bottom-bar.component';

describe('BottomBarComponent', () => {
  let component: BottomBarComponent;
  let fixture: ComponentFixture<BottomBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BottomBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BottomBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // 🧪 TEST BÁSICO 1: Verificar que el componente se crea correctamente
  it('should create', () => {
    expect(component).toBeTruthy();
    console.log('✅ BottomBarComponent se ha creado correctamente');
  });

  it('should display footer on screen', () => {
    const footerElement: DebugElement = fixture.debugElement.query(By.css('footer'));
    expect(footerElement).toBeTruthy();
    expect(footerElement.nativeElement.style.display).not.toBe('none');
    console.log('✅ Footer se muestra correctamente en pantalla');
  });

  // 🧪 TEST BÁSICO 3: Verificar que contiene texto básico
  it('should contain basic footer text', () => {
    // 📋 PASO 1: Buscar el elemento footer completo
    const footerElement: DebugElement = fixture.debugElement.query(By.css('footer'));
    const footerText = footerElement.nativeElement.textContent;
    expect(footerText).toContain('Contacto');
    expect(footerText).toContain('2025');
    console.log('✅ Footer contiene el texto básico esperado');
  });



  // 🧪 TEST BÁSICO 5: Verificar que contiene enlaces básicos
  it('should contain basic links', () => {
    const linkElements: DebugElement[] = fixture.debugElement.queryAll(By.css('footer a'));
    expect(linkElements.length).toBeGreaterThan(0);
    console.log(`✅ Footer contiene ${linkElements.length} enlaces`);
  });
});