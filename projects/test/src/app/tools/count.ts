export function Count(limit?: number): PropertyDecorator {
    return (target, property) => {
        const { name } = target.constructor;

        let counter = 0;

        Object.defineProperty(target, property, {
            get() {
                console.log("render", name, ++counter);

                return "";
            },
        });
    };
}
