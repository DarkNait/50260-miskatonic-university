import { TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { MockProvider } from 'ng-mocks';
import { AuthService } from '../../auth.service';
import { SharedModule } from '../../../../shared/shared.module';
import { Validators } from '@angular/forms';

describe('LoginComponent', () => {
  let component: LoginComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [SharedModule],
      providers: [MockProvider(AuthService)],
    });

    component = TestBed.createComponent(LoginComponent).componentInstance;
  });

  it('Los campos "email" y "contraseña" deben ser campos requeridos', () => {
    expect(
      component.loginForm.get('password')?.hasValidator(Validators.required)
    ).toBeTrue();
    expect(
      component.loginForm.get('email')?.hasValidator(Validators.required)
    ).toBeTrue();
  });

  it('Si el formulario es invalido, al llamar a la funcion submit, este debe marcar sus campos como "touched"', () => {
    component.loginForm.patchValue({
      email: '',
      password: '',
    });

    expect(component.loginForm.invalid).toBeTrue();

    const spyOnMarkAllAsTouched = spyOn(
      component.loginForm,
      'markAllAsTouched'
    );

    component.onSubmit();

    expect(spyOnMarkAllAsTouched).toHaveBeenCalled();
  });
});