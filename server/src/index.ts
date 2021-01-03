"use strict";


import * as dotenv from "dotenv";
dotenv.config();

import * as fs from "fs";
import * as https from "https";
import * as http from "http";
import * as express from "express";
import * as debug from "debug";
import * as helmet from "helmet";
import * as morgan from "morgan";

const log = debug("app:main");
const httpLog = debug("app:endpoint");
const app = express();
let server;

log("Main dependencies loaded");

{
	if (process.env.LOCAL_HTTPS) {
		server = https.createServer({
			"key": fs.readFileSync("./root/certificates/local/localhost-privkey.pem"),
			"cert": fs.readFileSync("./root/certificates/local/localhost-cert.pem"),
			"rejectUnauthorized": false
		}, app);
	} else {
		server = http.createServer(app);
	}

	if (httpLog.enabled) {
		app.use(
			morgan(
				"combined",
				{
					"stream": {
						"write": msg => httpLog(msg.trimEnd())
					}
				}
			)
		);
	}

	app.use(express.urlencoded({
		"extended": true,
		"limit": "3mb"
	}));

	app.use(express.json({"limit": "3mb"}));

	app.use(helmet({
		"contentSecurityPolicy": false
	}));

	app.use("/docs/api", express.static(__dirname + "/docs/api/swagger-ui-dist"));
}

log("Express' plugins loaded");


app.get("/", (req, res) => {
	return res.status(200).send("oiii");
})

server.listen(process.env.APP_PORT, async function () {

	if (process.env.LOCAL_HTTPS) {
		log(`HTTPS Server up and running at https://localhost:${process.env.APP_PORT}`);
	} else {
		log(`HTTP Server up and running at port ${process.env.APP_PORT}`);
	}

});