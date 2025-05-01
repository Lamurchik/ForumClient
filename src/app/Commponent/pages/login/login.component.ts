
import { Component } from "@angular/core";
import {FormsModule } from "@angular/forms";
import { GraphQLService } from "../../../services/grapql.service"
import { HttpClientModule } from "@angular/common/http";   
import {Router} from "@angular/router";

@Component({
 selector: "login-app",
 standalone: true,
 imports: [FormsModule, HttpClientModule ],
 templateUrl: './Login.component.html',
 styleUrl: './login.component.css',
 providers: [GraphQLService] 
})
export class LoginComponent {
     // Переменные для хранения данных из формы
  email: string = '';
  password: string = '';
  showPassword: boolean = false; // Флаг для отображения пароля
  errorMessage: string = ''; // <-- Поле для текста ошибки

  // Метод для переключения видимости пароля
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }


  // В классе LoginComponent добавь свойство для иконки
get eyeIcon(): string {
    return this.showPassword ? '◎' : '◉'; 
  }

  constructor(private QLService: GraphQLService, private router: Router ){}

  onSubmit(): void {
    this.errorMessage = ''; // очищаем ошибку перед новым запросом

    const query = `
      mutation {
        signIn(email: "${this.email}", password: "${this.password}") {
          id
          message
          token
        }
      }
    `;

    this.QLService.RequestString<{ data: { signIn: { id: number, message: string | null, token: string } } }>({ query })
      .subscribe(response => {
        const result = response.data.signIn;

        if (result.message) {
          // Если сервер вернул ошибку
          this.errorMessage = result.message;
        } else {
          // Всё ок — сохраняем токен и id
          this.QLService.setToken(result.token);
          this.QLService.setUserId(result.id);
          console.log('Успешный вход!');
          this.router.navigate([""]);
          // Тут можно сделать переход на главную страницу, если хочешь
        }
      }, error => {
        // Если вообще ошибка запроса
        this.errorMessage = 'Ошибка соединения с сервером.';
      });
  }
}
