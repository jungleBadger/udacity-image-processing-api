"use strict";


export default {
	validateImageParams(req: any, res: any, next: any) {

		let imageId: String;
		let width: Number;
		let height: Number;

		if (!req.query.imageId) {
			return res.status(400).send("Can't proceed without Image ID");
		} else {
			imageId = req.query.imageId as String;
		}

		if (req.query.width && req.query.width <= 0) {
			return res.status(400).send(`Invalid "width" value: ${req.query.width}`);
		} else {
			width = Number(req.query.width) as Number;
		}

		if (req.query.height && req.query.height <= 0) {
			return res.status(400).send(`Invalid "height" value: ${req.query.height}`);
		} else {
			height = Number(req.query.width) as Number;
		}

		res.locals.imageId = imageId;
		res.locals.width = width;
		res.locals.height = height;
		next();
	}
};