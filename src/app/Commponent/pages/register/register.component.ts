import { Component } from "@angular/core";
import {FormsModule } from "@angular/forms";


@Component({
 selector: "login-app",
 standalone: true,
 imports: [FormsModule],
 templateUrl: './register.component.html',
 styleUrl: './register.component.css'

})
export class RegisterComponent {
     // Переменные для хранения данных из формы
  email: string = '';
  password: string = '';
  nickName: string = ''; 
  showPassword: boolean = false; // Флаг для отображения пароля

  // Метод для переключения видимости пароля
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }


  // В классе LoginComponent добавь свойство для иконки
get eyeIcon(): string {
    return this.showPassword ? '◎' : '◉'; 
  }

  // Метод-заглушка для отправки формы (логика добавится позже)
  onSubmit(): void {
    console.log('Данные формы:', { email: this.email, password: this.password });
    // Здесь будет вызов API или другая логика авторизации
  }
}