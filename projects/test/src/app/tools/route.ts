import { RouterModule } from "@angular/router";

export function route(component: any) {
    return RouterModule.forChild([
        {
            path: "",
            component,
        },
    ]);
}
