import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { ILabel } from 'app/shared/model/label.model';
import { LabelService } from './label.service';

@Component({
    selector: 'jhi-label-update',
    templateUrl: './label-update.component.html'
})
export class LabelUpdateComponent implements OnInit {
    label: ILabel;
    isSaving: boolean;
    creationDateDp: any;
    updateDateDp: any;

    constructor(protected labelService: LabelService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ label }) => {
            this.label = label;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.label.id !== undefined) {
            this.subscribeToSaveResponse(this.labelService.update(this.label));
        } else {
            this.subscribeToSaveResponse(this.labelService.create(this.label));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ILabel>>) {
        result.subscribe((res: HttpResponse<ILabel>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
