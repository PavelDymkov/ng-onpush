import { path } from "node-path-tags";

import { casesDirectory } from "./config";

export = {
    spec: [path`${casesDirectory}/*.test.js`],
    parallel: true,
    require: [path`test/fixtures.js`, path`test/hooks.js`],
};
