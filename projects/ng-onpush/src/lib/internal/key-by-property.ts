export function createKey(property: string | symbol): symbol {
    const description = createDescription(
        typeof property === "string" ? property : property.description,
    );

    return Symbol(description);
}

function createDescription(source: string | undefined): string {
    const propertyName = source || "unknown";

    return `property: ${propertyName}`;
}
