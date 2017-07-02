'use strict';

module.exports = async db => {
    const collectionsUsed = await db.connection.db.collections();
    for (let collection of collectionsUsed) {
        if(collection.s.name !== 'system.indexes') {
            await db.connection.db.dropCollection(collection.s.name);
        }
    }
};