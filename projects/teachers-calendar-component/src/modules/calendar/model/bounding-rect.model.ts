export class BoundingRectModel {
    private _top: number;
    private _left: number;
    private _width: number;
    private _height: number;

    constructor(top: number, left: number, width: number, height: number) {
        this._top = top;
        this._left = left;
        this._width = width;
        this._height = height;
    }

    get top(): number {
        return this._top;
    }

    get left(): number {
        return this._left;
    }

    get width(): number {
        return this._width;
    }

    get height(): number {
        return this._height;
    }
}
