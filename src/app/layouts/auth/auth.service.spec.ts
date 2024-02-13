import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { User } from '../../pages/users/model/user';

describe('AuthService', () => {
  let authService: AuthService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService],
      imports: [HttpClientTestingModule],
    });

    authService = TestBed.inject(AuthService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('AuthService debe estar definido', () => {
    expect(authService).toBeTruthy();
  });

  it('Al llamar login() debe establecer un authUser', () => {
    const MOCK_RESPONSE: User[] = [
      {
        id: 999,
        firstName: 'MOCKNAME',
        lastName: 'MOCKLASTNAME',
        birthday: new Date("1982-11-15T03:00:00.000Z"),
        email: 'mock@mail.com',
        password: '123456',
        role: { id: 'ADMIN', role: 'ADMIN'} ,
        token: 'a4s54a5s4a5s4a5s',
      },
    ];

    // Llamamos al login
    authService
      .login({ email: 'mock@mail.com', password: '123456' })
      .subscribe({
        next: () => {
          // Verificamos que el login establezca correctamente el usuario
          expect(authService.authUser).toEqual(MOCK_RESPONSE[0]);
        },
      });

    // Sobre escribimos la request por una request falsa
    httpController
      .expectOne({
        url: 'http://localhost:3000/users?email=mock@mail.com&password=123456',
        method: 'GET',
      })
      .flush(MOCK_RESPONSE);
  });
});