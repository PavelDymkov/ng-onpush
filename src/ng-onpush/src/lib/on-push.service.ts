import { ChangeDetectorRef, Injectable } from "@angular/core";

import { shared } from "./shared";

@Injectable({ providedIn: "root" })
export class OnPushService {
    provideRootChangeDetectorRef(changeDetectorRef: ChangeDetectorRef): void {
        shared.changeDetectorRef = changeDetectorRef;
    }
}
