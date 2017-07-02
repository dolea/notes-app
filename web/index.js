'use strict';

class Application {

    constructor() {
        this.Database = require('../config').Database;
        this.Server = require('./server');
        this.serverConnection = null;
    }

    async startApplicationWith({Port, DatabaseUrl}) {
        const databaseConnection = await this.Database.connect(DatabaseUrl);
        this.serverConnection = await this.Server.listen(Port);

        return {DatabaseConnection: databaseConnection, ServerConnection: this.serverConnection};
    }

    async stopApplication(cleanUp) {
        await cleanUp(this.Database);
        await this.serverConnection.close();
        await this.Database.disconnect();
    }

}

module.exports = Application;