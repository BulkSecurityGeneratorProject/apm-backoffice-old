import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';
import { ILabelValue } from 'app/shared/model/label-value.model';
import { LabelValueService } from './label-value.service';
import { ILabel } from 'app/shared/model/label.model';
import { LabelService } from 'app/entities/label';

@Component({
    selector: 'jhi-label-value-update',
    templateUrl: './label-value-update.component.html'
})
export class LabelValueUpdateComponent implements OnInit {
    labelValue: ILabelValue;
    isSaving: boolean;

    labels: ILabel[];
    creationDateDp: any;
    updateDateDp: any;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected labelValueService: LabelValueService,
        protected labelService: LabelService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ labelValue }) => {
            this.labelValue = labelValue;
        });
        this.labelService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<ILabel[]>) => mayBeOk.ok),
                map((response: HttpResponse<ILabel[]>) => response.body)
            )
            .subscribe((res: ILabel[]) => (this.labels = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.labelValue.id !== undefined) {
            this.subscribeToSaveResponse(this.labelValueService.update(this.labelValue));
        } else {
            this.subscribeToSaveResponse(this.labelValueService.create(this.labelValue));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ILabelValue>>) {
        result.subscribe((res: HttpResponse<ILabelValue>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackLabelById(index: number, item: ILabel) {
        return item.id;
    }
}
