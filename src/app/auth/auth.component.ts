import { AuthService } from './auth.service';
import { NgForm } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent {
    isLoginMode = true;
    isLoading = false;
    error: string = null;

    constructor(private authService: AuthService) { }
    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(form: NgForm) {
        if (!form.valid) {
            return;
        }
        const email = form.value.email;
        const password = form.value.password;
        this.isLoading = true;
        if (this.isLoginMode) {

        } else {
            this.authService.signUp(email, password)
                .subscribe(resData => {
                    console.log(resData);
                    this.isLoading = false;
                },
                    errorMessage => {
                        this.error = errorMessage;
                        this.isLoading = false;
                    });
        }
        form.reset();
    }
}