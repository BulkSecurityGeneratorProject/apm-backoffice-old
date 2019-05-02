import { Moment } from 'moment';
import { ILabelValue } from 'app/shared/model/label-value.model';

export interface ILabel {
    id?: number;
    code?: string;
    creationDate?: Moment;
    updateDate?: Moment;
    labelValues?: ILabelValue[];
}

export class Label implements ILabel {
    constructor(
        public id?: number,
        public code?: string,
        public creationDate?: Moment,
        public updateDate?: Moment,
        public labelValues?: ILabelValue[]
    ) {}
}
