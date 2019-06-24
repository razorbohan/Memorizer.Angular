import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { AbstractControl } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Message } from 'src/app/shared/models/message';

@Component({
	selector: 'memo-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

	registerForm: FormGroup;
	errorMessage: Message;
	isCheckingEmail: boolean;
	isLoading: boolean;

	constructor(
		private formBuilder: FormBuilder,
		private authService: AuthService) { }

	ngOnInit() {
		this.registerForm = this.formBuilder.group({
			email: ['', [Validators.required, Validators.email], this.checkEmail.bind(this)],
			password: ['', [Validators.required, Validators.minLength(5)]],
			confirmPassword: ['', Validators.required]
		}, {
				validator: this.matchPassword
			});
	}

	async onSubmit() {
		try {
			this.isLoading = true;
			await this.authService.register(this.registerForm.value);
		} catch (error) {
			this.errorMessage = new Message(error.message, 'danger');
		} finally {
			this.isLoading = false;
		}
	}

	private matchPassword(control: AbstractControl) {
		const password = control.get('password').value;
		const confirmPassword = control.get('confirmPassword').value;
		if (password != confirmPassword) {
			control.get('confirmPassword').setErrors({ MatchPassword: true });
		} else {
			return null;
		}
	}

	private async checkEmail(control: FormControl) {
		try {
			this.isCheckingEmail = true;
			const isUsed = await this.authService.checkEmail(control.value);
			return isUsed ? { isUsed: true } : null;
		} catch (error) {
			this.errorMessage = new Message(error.message, 'danger');
		} finally {
			this.isCheckingEmail = false;
		}
	}
}
