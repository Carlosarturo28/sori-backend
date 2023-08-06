'use strict';

/**
 * what-if router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::what-if.what-if');
