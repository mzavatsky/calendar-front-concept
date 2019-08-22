import {Component, Input, OnInit} from '@angular/core';
import {CoordsConverterInterface} from '@cal/interfaces/coords-converter.interface';

@Component({
    selector: 'app-calendar-grid',
    templateUrl: './grid.component.html',
    styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {
    @Input() coordsConverter: CoordsConverterInterface;

    ngOnInit(): void {
    }
}
