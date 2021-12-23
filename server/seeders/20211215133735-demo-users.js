'use strict';

const { test } = require('../config/config');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const cardId = await queryInterface.bulkInsert(
      'cards',
      [
        {
          name: '국민카드',
          phoneNumber: '1588-1688',
          address: 'https://www.kbcard.com',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: '신한카드',
          phoneNumber: '1544-7000',
          address: 'https://www.shinhancard.com',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: '하나카드',
          phoneNumber: '1800-1111',
          address: 'https://global.hanacard.com',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: '롯데카드',
          phoneNumber: '1588-8100',
          address: 'https://customer.kbcard.com',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: '비씨카드',
          phoneNumber: '1800-1111',
          address: 'https://bccard.com',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: '농협카드',
          phoneNumber: '1644-4000',
          address: 'https://card.nonghyup.com',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: '삼성카드',
          phoneNumber: '1588-8700',
          address: 'https://www.samsungcard.com',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: '현대카드',
          phoneNumber: '1577-6000',
          address: 'https://www.hyundaicard.com',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      { returning: ['id'] },
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
    await queryInterface.bulkDelete('cards', null, {});
    await queryInterface.bulkDelete('userCards', null, {});
    await queryInterface.bulkDelete('transactions', null, {});
  },
};
