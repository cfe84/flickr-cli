const td = require("testdouble");
const album = require("../src/commands/album");

describe("Album command", () => {
    it("should list albums with title by default", async () => {
        const albums = [
            { title: "test", id: "123123" },
            { title: "second", id: "456456"}
        ];
        const flickr = {
            listAlbums: async () => albums
        };
        const config = { logger : td.object(["log"]) };

        await album({ command: "list" }, config, flickr);

        for(let album of albums) {
            td.verify(config.logger.log(album.title));
        }
    });

    it("should list albums with included fields", async () => {
        const albums = [
            { title: "test", id: "123123" },
            { title: "second", id: "456456"}
        ];
        const flickr = {
            listAlbums: async () => albums
        };
        const config = { logger : td.object(["log"]) };

        await album({ command: "list", include: ["title", "id"] }, config, flickr);

        for(let album of albums) {
            td.verify(config.logger.log(`${album.title}\t${album.id}`));
        }
    });

    it("should list albums with all fields", async () => {
        const albums = [
            { title: "test", id: "123123" },
            { title: "second", id: "456456"}
        ];
        const flickr = {
            listAlbums: async () => albums
        };
        const config = { logger : td.object(["log"]) };

        await album({ command: "list", include: ["*"] }, config, flickr);

        td.verify(config.logger.log("title\tid"), {times: 0});
        for(let album of albums) {
            td.verify(config.logger.log(`${album.title}\t${album.id}`));
        }
    });

    it("should list albums with headers when fields are listed", async () => {
        const albums = [
            { title: "test", id: "123123", description: "prout" },
            { title: "second", id: "456456", description: "pouet"}
        ];
        const flickr = {
            listAlbums: async () => albums
        };
        const config = { logger : td.object(["log"]) };

        await album({ command: "list", include: ["title", "id"], headers: true }, config, flickr);

        td.verify(config.logger.log("title\tid"));
        for(let album of albums) {
            td.verify(config.logger.log(`${album.title}\t${album.id}`));
        }
    });

    it("should list albums with headers with all fields", async () => {
        const albums = [
            { title: "test", id: "123123", description: "prout" },
            { title: "second", id: "456456", description: "pouet"}
        ];
        const flickr = {
            listAlbums: async () => albums
        };
        const config = { logger : td.object(["log"]) };

        await album({ command: "list", include: ["*"], headers: true }, config, flickr);

        td.verify(config.logger.log("title\tid\tdescription"));
        for(let album of albums) {
            td.verify(config.logger.log(`${album.title}\t${album.id}\t${album.description}`));
        }
    });
});