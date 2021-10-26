import { shared } from "./shared";

export function UpdateImmediately(): PropertyDecorator {
    return function (): TypedPropertyDescriptor<any> {
        const key = Symbol();

        return {
            get(this: any) {
                return this[key];
            },

            set(this: any, nextValue: any) {
                this[key] = nextValue;

                shared.changeDetectorRef?.detectChanges();
            },
        };
    };
}
