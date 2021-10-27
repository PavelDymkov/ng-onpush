import { shared } from "./shared";

export function UpdateImmediately(): PropertyDecorator {
    return function (target: any): TypedPropertyDescriptor<any> {
        const key = Symbol();

        const afterViewInitOrigin = target.ngAfterViewInit as Function;
        let ready = false;

        target.ngAfterViewInit = function () {
            ready = true;

            if (afterViewInitOrigin) afterViewInitOrigin.apply(this, arguments);
        };

        return {
            get(this: any) {
                return this[key];
            },

            set(this: any, nextValue: any) {
                this[key] = nextValue;

                if (ready) shared.changeDetectorRef?.detectChanges();
            },
        };
    };
}
