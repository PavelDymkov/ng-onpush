import { ChangeDetectorRef } from "@angular/core";

export const shared: { changeDetectorRef: ChangeDetectorRef | null } = {
    changeDetectorRef: null,
};
