import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ModalModule } from 'ngx-bootstrap/modal';

import { AddMemoComponent } from './modals/add/add.component';
import { ConfirmComponent } from './modals/confirm/confirm.component';
import { FinishComponent } from './modals/finish/finish.component';
import { LoaderComponent } from './components/loader/loader.component';
import { MessageComponent } from './components/message/message.component';
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { SwitcherComponent } from './components/switcher/switcher.component';

@NgModule({
    imports: [
        CommonModule,
        ModalModule.forRoot(),
        FormsModule
    ],
    declarations: [
        AddMemoComponent,
        ConfirmComponent,
        FinishComponent,
        LoaderComponent,
        MessageComponent,
        ClickOutsideDirective,
        SwitcherComponent
    ],
    exports: [
        AddMemoComponent,
        ConfirmComponent,
        FinishComponent,
        LoaderComponent,
        MessageComponent,
        SwitcherComponent
    ],
    entryComponents: [
		AddMemoComponent,
		FinishComponent,
        ConfirmComponent,
	]
})
export class SharedModule { }