import { NgModule } from '@angular/core';

import { ApmBackofficeSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
    imports: [ApmBackofficeSharedLibsModule],
    declarations: [JhiAlertComponent, JhiAlertErrorComponent],
    exports: [ApmBackofficeSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class ApmBackofficeSharedCommonModule {}
