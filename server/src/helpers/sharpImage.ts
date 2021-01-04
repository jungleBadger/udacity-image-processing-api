"use strict";

import * as fs from "fs";
import * as fsAsync from "fs/promises";
import * as sharp from "sharp";

const FULL_IMAGES_PATH: String = "./images/full";
const PROCESSED_IMAGES_PATH: String = "./images/processed"



export default {
	"imageId": "" as String,
	"width": 0 as Number,
	"height": 0 as Number,
	getStockImagePath() {
		return `${FULL_IMAGES_PATH}/${this.imageId}`;
	},
	getImagePath() {
		return (this.isOriginal ?
			this.getStockImagePath() :
			`${PROCESSED_IMAGES_PATH}/${this.width}x${this.height}/${this.imageId}`
		);
	},

	/**
	 * Create a Sharp Image instance based on a stock image and return the file path.
	 * If the transformed image already exists, it will be served from cache instead.
	 *
	 * @constructor
	 * @method init
	 * @async
	 * @param {String} imageId - The image ID.
	 * @param {Number} [width=0] - The image desired width.
	 * @param {Number} [height=0] - The image desired height.
	 * @throws It will throw a `400 - Bad request` error if the `imageId` parameter is not available.
	 * @throws It will throw a `404 - Not found` error if the `imageId` could not be found within the stock image folder.
	 */
	"init": async function Constructor(imageId: String, width: Number = 0, height: Number = 0) {
		if (!imageId) {
			throw new Error(JSON.stringify({
				"status": 400,
				"message": "Invalid image parameters."
			}));
		}

		this.imageId = imageId;
		this.width = width || 0;
		this.height = height || 0;

		try {
			let imageStream = await fsAsync.open(this.getImagePath(), "r");

			console.log(imageStream);
			//image exists do something with it

		} catch (e) {

			// create folder if needed
			await fsAsync.mkdir(
				`${PROCESSED_IMAGES_PATH}/${this.width}x${this.height}`,
				{ "recursive": true }
			);

			let fileData = await fsAsync.open(this.getImagePath(), "w");

			await fileData.write(
				await sharp(
					this.getStockImagePath()
				).resize(
					width, height
				).toBuffer()
			);

			console.log(fileData);

		}

		return this;

	}
}