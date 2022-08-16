import {
    assets,
    badge,
    BadgeType,
    git,
    npmPackagr,
    npx,
    Pipe,
    publish,
    test,
} from "npm-packagr";

const project = require("./package.json").name;

npmPackagr({
    sourceDirectory: getRootDirectory(project),
    pipeline: [
        npx(`ng build ${project}`),

        test(),

        badge(BadgeType.Test),

        createAngularVersionBadge(),

        badge(BadgeType.License),

        ({ exec, packageDirectory, sourceDirectory }) => {
            exec("npm version prerelease", { cd: sourceDirectory });
            exec("npm version prerelease", { cd: packageDirectory });
        },

        assets("LICENSE", "README.md"),

        git("commit", project),
        git("push"),

        publish({
            login: { account: "paveldymkov", email: "dymkov86@gmail.com" },
        }),
    ],
});

function getRootDirectory(project: string): string {
    const { projects } = require("./angular.json");

    return projects[project].root;
}

function createAngularVersionBadge(): Pipe {
    const { version } = require("@angular/core/package.json");

    return badge("ng-version", {
        label: "tests with angular",
        message: String(version),
    });
}
