import { TestServer } from "./test-server";
import { casesDirectory, port } from "./config";

const server = new TestServer({
    staticRoot:
        require("../angular.json").projects.test.architect.build.options
            .outputPath,
    casesDirectory,
    port,
});

module.exports = {
    mochaGlobalSetup() {
        return server.run();
    },

    mochaGlobalTeardown() {
        return server.shutdown();
    },
};
