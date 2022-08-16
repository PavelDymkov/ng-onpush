import { CommonModule } from "@angular/common";
import { AfterViewInit, Component, NgModule } from "@angular/core";
import { WatchChanges } from "ng-onpush";

import { route } from "../tools/route";

@Component({
    selector: "app-page",
    template: `
        <ng-container *ngIf="show">
            <div class="test">Success</div>
        </ng-container>
    `,
})
export class WatchChangesComponent implements AfterViewInit {
    @WatchChanges()
    show = false;

    ngAfterViewInit(): void {
        setTimeout(() => {
            this.show = true;
        });
    }
}

@NgModule({
    imports: [CommonModule, route(WatchChangesComponent)],
    declarations: [WatchChangesComponent],
})
export class WatchChangesModule {}
