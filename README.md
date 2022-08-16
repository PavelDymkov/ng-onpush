# NgOnpush

![test: passed](https://raw.githubusercontent.com/PavelDymkov/ng-onpush/master/badges/test.svg)
![tests with angular: 14.1.2](https://raw.githubusercontent.com/PavelDymkov/ng-onpush/master/badges/ng-version.svg)
![license: ](https://raw.githubusercontent.com/PavelDymkov/ng-onpush/master/badges/license.svg)

## Usage

Set the OnPush strategy to the root component.

```ts
@Component({
    selector: "app-root",
    template: `...`,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
```

Now, if some property is updated on a request or on a timer, just decorate it.

```ts
@Component({
    selector: "my-component",
    template: "{{ value }}",
})
export class WatchChangesComponent implements AfterViewInit {
    @WatchChanges()
    value = "";

    ngAfterViewInit(): void {
        setTimeout(() => {
            this.value = "message";
        });
    }
}
```

It's the same as

```ts
@Component({
    selector: "my-component",
    template: "{{ value }}",
})
export class MyComponent implements AfterViewInit {
    value = "";

    constructor(private changeDetectorRef: ChangeDetectorRef) {}

    ngAfterViewInit(): void {
        setTimeout(() => {
            this.value = "message";
            this.changeDetectorRef.markForCheck();
        });
    }
}
```

Use the UpdateImmediately decorator to detect changes.

```ts
@Component({
    selector: "my-component",
    template: "{{ text }}",
})
export class MyComponent implements AfterViewInit {
    @UpdateImmediately()
    text = "initial";

    constructor(private hostRef: ElementRef<HTMLElement>) {}

    ngAfterViewInit(): void {
        setTimeout(() => {
            const message = "foo";

            this.text = message;

            this.hostRef.nativeElement.textContent === message; // true
        });
    }
}
```

It's the same as

```ts
@Component({
    selector: "my-component",
    template: "{{ text }}",
})
export class MyComponent implements AfterViewInit {
    @UpdateImmediately()
    text = "initial";

    constructor(
        private changeDetectorRef: ChangeDetectorRef,
        private hostRef: ElementRef<HTMLElement>,
    ) {}

    ngAfterViewInit(): void {
        setTimeout(() => {
            const message = "foo";

            this.text = message;
            this.changeDetectorRef.detectChanges();

            this.hostRef.nativeElement.textContent === message; // true
        });
    }
}
```
