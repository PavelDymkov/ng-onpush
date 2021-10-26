import { ChangeDetectorRef, Injectable } from "@angular/core";

import { shared } from "./shared";

@Injectable({ providedIn: "root" })
export class ChangeDetectionService {
    provideRootChangeDetectorRef(changeDetectorRef: ChangeDetectorRef): void {
        shared.changeDetectorRef = changeDetectorRef;
    }

    markForCheck(): void {
        shared.changeDetectorRef?.markForCheck();
    }
}
