import {
    getChangeDetectorRef,
    attachChangeDetectorRef,
} from "./internal/change-detector-provider";
import { createKey } from "./internal/key-by-property";

export function UpdateImmediately(): PropertyDecorator {
    return function (target, property): TypedPropertyDescriptor<any> {
        attachChangeDetectorRef(target);

        const key = createKey(property);

        return {
            get(this: any) {
                return this[key];
            },

            set(this: any, nextValue: any) {
                this[key] = nextValue;

                getChangeDetectorRef(this)?.detectChanges();
            },
        };
    };
}
