import { ChangeDetectionStrategy, Component, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";

@Component({
    selector: "app-root",
    template: `<router-outlet></router-outlet>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}

@NgModule({
    imports: [
        BrowserModule,
        RouterModule.forRoot([
            {
                path: "watch-changes",
                loadChildren: () =>
                    import("./pages/watch-changes").then(
                        (m) => m.WatchChangesModule,
                    ),
            },
            {
                path: "update-immediately",
                loadChildren: () =>
                    import("./pages/update-immediately").then(
                        (m) => m.UpdateImmediatelyModule,
                    ),
            },
        ]),
    ],
    declarations: [AppComponent],
    bootstrap: [AppComponent],
})
export class AppModule {}
