export class DimensionsStyleModel {
    width: string;
    height: string;

    constructor(width: number, height: number) {
        this.width = `${width}px`;
        this.height = `${height}px`;
    }
}
