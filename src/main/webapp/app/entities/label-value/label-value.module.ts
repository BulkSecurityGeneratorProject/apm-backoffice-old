import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ApmBackofficeSharedModule } from 'app/shared';
import {
    LabelValueComponent,
    LabelValueDetailComponent,
    LabelValueUpdateComponent,
    LabelValueDeletePopupComponent,
    LabelValueDeleteDialogComponent,
    labelValueRoute,
    labelValuePopupRoute
} from './';

const ENTITY_STATES = [...labelValueRoute, ...labelValuePopupRoute];

@NgModule({
    imports: [ApmBackofficeSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        LabelValueComponent,
        LabelValueDetailComponent,
        LabelValueUpdateComponent,
        LabelValueDeleteDialogComponent,
        LabelValueDeletePopupComponent
    ],
    entryComponents: [LabelValueComponent, LabelValueUpdateComponent, LabelValueDeleteDialogComponent, LabelValueDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ApmBackofficeLabelValueModule {}
