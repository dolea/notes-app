'use strict';

class Application {

    constructor() {
        this.Database = require('../config').Database;
        this.Server = require('./server');
        this.serverConnection = null;
    }

    async startApplicationWith({port, databaseUrl}) {
        const databaseConnection = await this.Database.connect(databaseUrl);
        this.serverConnection = await this.Server.listen(port);

        return {DatabaseConnection: databaseConnection, ServerConnection: this.serverConnection};
    }

    async stopApplication(cleanUp) {
        await cleanUp(this.Database);
        await this.serverConnection.close();
        await this.Database.disconnect();
    }

}

module.exports = Application;