import {
    getChangeDetectorRef,
    attachChangeDetectorRef,
} from "./internal/change-detector-provider";
import { createKey } from "./internal/key-by-property";

export function WatchChanges(): PropertyDecorator {
    return function (component, property): TypedPropertyDescriptor<any> {
        attachChangeDetectorRef(component);

        const key = createKey(property);

        return {
            get(this: any) {
                return this[key];
            },

            set(this: any, nextValue: any) {
                this[key] = nextValue;

                getChangeDetectorRef(this)?.markForCheck();
            },
        };
    };
}
