import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {EventModel} from '@cal/model/event.model';

@Component({
    selector: 'app-calendar-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
    @Input() event: EventModel;

    @Output() close = new EventEmitter<any>();

    ngOnInit(): void {
    }

    handleClose() {
        this.close.emit();
    }
}
