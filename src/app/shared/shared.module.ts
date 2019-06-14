import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ModalModule } from 'ngx-bootstrap/modal';

import { AddMemoComponent } from './modals/add/add.component';
import { ConfirmComponent } from './modals/confirm/confirm.component';
import { FinishComponent } from './modals/finish/finish.component';
import { LoaderComponent } from './components/loader/loader.component';
import { MessageComponent } from './components/message/message.component';
import { SwitcherComponent } from './components/switcher/switcher.component';
import { ClickOutsideDirective } from './directives/click-outside.directive';

import { EditableComponent } from './modals/find/editable/editable.component';
import { ViewModeDirective } from './modals/find/editable/view-mode.directive';
import { EditModeDirective } from './modals/find/editable/edit-mode.directive';
import { EditableOnEnterDirective } from './modals/find/editable/edit-on-enter.directive';

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
        SwitcherComponent,
        ClickOutsideDirective,

        EditableComponent,
		ViewModeDirective,
		EditModeDirective,
		EditableOnEnterDirective
    ],
    exports: [
        AddMemoComponent,
        ConfirmComponent,
        FinishComponent,
        LoaderComponent,
        MessageComponent,
        SwitcherComponent,
        ClickOutsideDirective,

        EditableComponent,
		ViewModeDirective,
		EditModeDirective,
		EditableOnEnterDirective
    ],
    entryComponents: [
		AddMemoComponent,
		FinishComponent,
        ConfirmComponent,
	]
})
export class SharedModule { }