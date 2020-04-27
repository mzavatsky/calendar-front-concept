import {Component, HostListener, Input, OnChanges, OnInit, SimpleChange} from '@angular/core';
import {addDays, addSeconds, format, getHours, getISODay, getMinutes, getSeconds} from 'date-fns';


@Component({
    selector: 'app-weekly-grid',
    templateUrl: './weekly-grid.component.html',
    styleUrls: ['./weekly-grid.component.scss']
})
export class WeeklyGridComponent implements OnInit, OnChanges {
    private static secondsPerDay = 24 * 3600;

    @Input() firstEventDate = new Date();
    @Input() isoWeekDayFirst = 1;
    @Input() gridStartSeconds = 0;
    @Input() gridEndSeconds = WeeklyGridComponent.secondsPerDay;
    @Input() cellDurationSeconds = 60 * 60;

    private weekDays = [];
    private timeCells = [];

    private selectedSlots: Set<number>[] = [];

    private selectionX0: number;
    private selectionY0: number;
    private selectionX: number;
    private selectionY: number;
    public isMouseDown = false;
    public isFinishingSelection = false;
    public modalLeft = '0px';
    public modalTop = '0px';

    public mouseX: number;
    public mouseY: number;

    private listenForChanges = false;

    private static clearSelection(items: Set<number>[]): void {
        for (let i = 0; i < 7; i++) {
            items[i] = new Set<number>();
        }
    }

    ngOnInit(): void {
        this.onReset();
        this.listenForChanges = true;
    }

    ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
        if (!this.listenForChanges) {
            return;
        }

        this.onReset();
    }

    onReset(): void {
        this.weekDays = [];
        this.timeCells = [];
        WeeklyGridComponent.clearSelection(this.selectedSlots);
        this.mouseX = -1;
        this.mouseY = -1;

        const firstEventIsoWeekday = getISODay(this.firstEventDate);

        for (let i = 0; i < 7; i++) {
            const isoWeekDay = 1 + (this.isoWeekDayFirst + i - 1) % 7;
            const cellDate = addDays(
                this.firstEventDate,
                firstEventIsoWeekday > isoWeekDay ? 7 + isoWeekDay - firstEventIsoWeekday : isoWeekDay - firstEventIsoWeekday
            );
            this.weekDays.push(cellDate);
        }

        let runningSeconds = 0;
        const runningDate = (new Date()).setHours(0, 0, 0, 0);

        let eventRange = this.gridEndSeconds - this.gridStartSeconds;
        if (eventRange <= 0) {
            eventRange += WeeklyGridComponent.secondsPerDay;
        }

        while (runningSeconds + this.cellDurationSeconds <= eventRange) {
            this.timeCells.push(addSeconds(runningDate, (runningSeconds + this.gridStartSeconds) % WeeklyGridComponent.secondsPerDay));
            runningSeconds += this.cellDurationSeconds;
        }
    }

    isCellSelected(x: number, y: number): boolean {
        return this.selectedSlots[x] && this.selectedSlots[x].has(y);
    }

    isInMouseSelectionX(x: number): boolean {
        if (this.selectionX >= this.selectionX0) {
            if (x > this.selectionX || x < this.selectionX0) {
                return false;
            }
        } else {
            if (x > this.selectionX0 || x < this.selectionX) {
                return false;
            }
        }

        return true;
    }

    isInMouseSelectionY(y: number): boolean {
        if (this.selectionY >= this.selectionY0) {
            if (y > this.selectionY || y < this.selectionY0) {
                return false;
            }
        } else {
            if (y > this.selectionY0 || y < this.selectionY) {
                return false;
            }
        }

        return true;
    }

    isInMouseSelection(x: number, y: number): boolean {
        if (!this.isInSelection) {
            return false;
        }

        return this.isInMouseSelectionX(x) && this.isInMouseSelectionY(y);
    }

    onMouseDown(x: number, y: number): void {
        this.isFinishingSelection = false;
        this.selectionX0 = x;
        this.selectionY0 = y;
        this.selectionX = x;
        this.selectionY = y;
        this.isMouseDown = true;
    }

    get isInSelection(): boolean {
        return this.isMouseDown || this.isFinishingSelection;
    }

    @HostListener('window:mouseup', ['$event'])
    onMouseUp(event) {
        this.isMouseDown = false;

        let checkedCount = 0;
        let uncheckedCount = 0;

        const x0 = Math.min(this.selectionX0, this.selectionX);
        const y0 = Math.min(this.selectionY0, this.selectionY);
        let x = 0;

        while (x <= Math.abs(this.selectionX - this.selectionX0)) {
            let y = 0;

            while (y <= Math.abs(this.selectionY - this.selectionY0)) {
                if (this.selectedSlots[x0 + x].has(y0 + y)) {
                    checkedCount++;
                } else {
                    uncheckedCount++;
                }
                y++;
            }
            x++;
        }

        if (checkedCount === 0) {
            this.checkSelected();
        } else if (uncheckedCount === 0) {
            this.uncheckSelected();
        } else {
            // selection
            this.calcModalCoords();
            this.isFinishingSelection = true;
        }
    }

    checkSelected(): void {
        const x0 = Math.min(this.selectionX0, this.selectionX);
        const y0 = Math.min(this.selectionY0, this.selectionY);
        let x = 0;

        while (x <= Math.abs(this.selectionX - this.selectionX0)) {
            let y = 0;

            while (y <= Math.abs(this.selectionY - this.selectionY0)) {
                this.selectedSlots[x0 + x].add(y0 + y);
                y++;
            }
            x++;
        }

        this.isFinishingSelection = false;
    }

    calcModalCoords(): void {
        this.modalTop = (this.selectionY * 20) + 'px';
        this.modalLeft = (50 + this.selectionX * 35) + 'px';
    }

    uncheckSelected(): void {
        const x0 = Math.min(this.selectionX0, this.selectionX);
        const y0 = Math.min(this.selectionY0, this.selectionY);
        let x = 0;

        while (x <= Math.abs(this.selectionX - this.selectionX0)) {
            let y = 0;

            while (y <= Math.abs(this.selectionY - this.selectionY0)) {
                this.selectedSlots[x0 + x].delete(y0 + y);
                y++;
            }
            x++;
        }

        this.isFinishingSelection = false;
    }

    onMouseEnter(x: number, y: number): void {
        this.mouseX = x;
        this.mouseY = y;

        if (!this.isMouseDown) {
            return;
        }

        this.selectionX = x;
        this.selectionY = y;
    }

    onMouseLeave(x: number, y: number): void {
        this.mouseX = -1;
        this.mouseY = -1;

        if (!this.isMouseDown) {
            return;
        }
    }

    uncheckAll(): void {
        WeeklyGridComponent.clearSelection(this.selectedSlots);
    }
}
