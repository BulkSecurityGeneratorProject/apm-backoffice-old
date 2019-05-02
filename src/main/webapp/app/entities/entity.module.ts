import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'label',
                loadChildren: './label/label.module#ApmBackofficeLabelModule'
            },
            {
                path: 'label-value',
                loadChildren: './label-value/label-value.module#ApmBackofficeLabelValueModule'
            }
            /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
        ])
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ApmBackofficeEntityModule {}
