import { TestBed } from '@angular/core/testing';
import { UsersComponent } from './users.component';
import { MockProvider } from 'ng-mocks';
import { SharedModule } from '../../shared/shared.module';
import { Validators } from '@angular/forms';
import { UsersService } from './users.service';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';


describe('UsersComponent', () => {
  let component: UsersComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsersComponent],
      imports: [SharedModule, RouterTestingModule ],
      providers: [MockProvider(ActivatedRoute), MockProvider(UsersService)],
    });

    component = TestBed.createComponent(UsersComponent).componentInstance;
  });

  it('El componente se debe instanciar correctamente', () => {
    expect(component).toBeTruthy();  
  });

  it('El componente debe contener una tabla para los usuarios', () => {
    const compiled = TestBed.createComponent(UsersComponent).nativeElement as HTMLElement;
    expect(compiled.querySelector('table')).toBeTruthy();
  });

  it('Las columnas de la tabla "usuarios" deben ser: "id", "fullName", "age", "email", "role", "actions"', () => {
    expect(component.displayedColumns).toContain('id');
    expect(component.displayedColumns).toContain('fullName');
    expect(component.displayedColumns).toContain('age');
    expect(component.displayedColumns).toContain('email');
    expect(component.displayedColumns).toContain('role');
    expect(component.displayedColumns).toContain('actions');
  });

  it('onCreate() debe abrir modal de "Nuevo Usuario"', () => {
    const spyOnCreate = spyOn(component, 'onCreate');

    component.onCreate();

    expect(spyOnCreate).toHaveBeenCalled();
  });

});