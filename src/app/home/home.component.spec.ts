import { HomeComponent } from './home.component';
import { TestBed } from '@angular/core/testing';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { MemoService } from '../shared/services/memo.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

describe('HomeComponent', () => {
	beforeEach(() => {
		// TestBed.resetTestEnvironment();
		TestBed.configureTestingModule({
			declarations: [HomeComponent],
			imports: [
				BrowserModule,
				HttpClientModule,
				SharedModule,
				FormsModule
			],
			providers: [
				MemoService,
				HttpClient
			],
		});
	});

	it('should render smth', () => {
		const fixture = TestBed.createComponent(HomeComponent);
		const component = fixture.debugElement.nativeElement;
		const innerText = component.querySelector('.summary span').textContent;
		expect(innerText).toContain('Level:');
	});
});
