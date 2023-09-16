"use strict";

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap({ strapi }) {
    strapi.db.lifecycles.subscribe({
      models: ["api::post.post"],
      afterCreate: async ({ result }) => {
        const { id, createdAt, updatedAt, createdBy } = result;
        await strapi.service("api::notification.notification").create({
          data: {
            status: true,
            createdAt,
            updatedAt,
            post: [id],
            users_permissions_users: createdBy,
          },
        });
      },
    });
  },
};
