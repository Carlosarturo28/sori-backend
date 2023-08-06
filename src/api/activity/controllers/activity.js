"use strict";
/**
 *  [collection-name] controller
 */
const { createCoreController } = require("@strapi/strapi").factories;
module.exports = createCoreController(
  "api::activity.activity",
  ({ strapi }) => ({
    async find(ctx) {
      // Calling the default core action
      const { data, meta } = await super.find(ctx);
      const query = strapi.db.query("api::activity.activity");
      await Promise.all(
        data.map(async (item, index) => {
          const foundItem = await query.findOne({
            where: {
              id: item.id,
            },
            populate: ["cover", "author"],
          });

          data[index].attributes.cover = {
            id: foundItem.cover.id,
            url: foundItem.cover.formats.medium.url,
          };
          data[index].attributes.author = {
            id: foundItem.cover.id,
            name: foundItem.author.name,
          };
        })
      );
      return { data, meta };
    },
    async findOne(ctx) {
      const response = await super.findOne(ctx);

      response.data.attributes["cover"] = {
        id: response.data.attributes.cover.data.id,
        url: response.data.attributes.cover.data.attributes.formats.medium.url,
      };

      response.data.attributes["author"] = {
        id: response.data.attributes.author.data.id,
        name: response.data.attributes.author.data.attributes.name,
      };

      return response;
    },
  })
);
