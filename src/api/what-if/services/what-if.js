'use strict';

/**
 * what-if service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::what-if.what-if');
