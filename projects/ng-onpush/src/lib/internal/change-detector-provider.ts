import {
    ChangeDetectorRef,
    ɵComponentDef as ComponentDef,
    ɵDirectiveDef as DirectiveDef,
    ɵNG_DIR_DEF as NG_DIR_DEF,
    ɵNG_COMP_DEF as NG_COMP_DEF,
    ɵɵdirectiveInject as directiveInject,
} from "@angular/core";

const NG_FACTORY = "ɵfac";

const changeDetectorRef = Symbol("ChangeDetectorRef");
const patched = new WeakSet<any>();

export function attachChangeDetectorRef(target: any): void {
    if (patched.has(target)) return;

    patched.add(target);

    const definition = getDefinition(target.constructor) as Definition;

    if (definition) {
        const factory: FactoryFn =
            definition.factory || target.constructor[NG_FACTORY];

        definition.factory = function (...args: any[]) {
            const instance = factory.call(this, ...args);

            instance[changeDetectorRef] = directiveInject(ChangeDetectorRef);

            return instance;
        };
    }
}

export function getChangeDetectorRef(
    component: any,
): ChangeDetectorRef | undefined {
    return component[changeDetectorRef];
}

function getDefinition(
    source: any,
): ComponentDef<any> | DirectiveDef<any> | null {
    const componentDef: ComponentDef<any> | undefined = source[NG_COMP_DEF];
    const directiveDef: DirectiveDef<any> | undefined = source[NG_DIR_DEF];

    return componentDef || directiveDef || null;
}

type FactoryFn = NonNullable<Definition["factory"]>;

interface Definition {
    factory: (ComponentDef<any> & DirectiveDef<any>)["factory"];
}
