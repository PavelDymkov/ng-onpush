import { CommonModule } from "@angular/common";
import {
    AfterViewInit,
    Component,
    ElementRef,
    NgModule,
    OnInit,
    ViewChild,
} from "@angular/core";
import { UpdateImmediately } from "ng-onpush";

import { route } from "../tools/route";

@Component({
    selector: "app-page",
    template: `
        <div #source>{{ text }}</div>
        <div #target></div>
    `,
})
export class UpdateImmediatelyComponent implements OnInit, AfterViewInit {
    @UpdateImmediately()
    text = "initial";

    @ViewChild("source", { static: true })
    source!: ElementRef<HTMLElement>;

    @ViewChild("target", { static: true })
    target!: ElementRef<HTMLElement>;

    ngOnInit(): void {
        this.text = "foo"; // should not throw an error
    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            this.text = "Success";

            const source = this.source.nativeElement;
            const target = this.target.nativeElement;

            target.textContent = source.textContent;
            target.className = "test";
        });
    }
}

@NgModule({
    imports: [CommonModule, route(UpdateImmediatelyComponent)],
    declarations: [UpdateImmediatelyComponent],
})
export class UpdateImmediatelyModule {}
