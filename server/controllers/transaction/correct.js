const { transactions, userCards } = require('./../../models');
const { isAuthorized } = require('./../tokenFunctions');

module.exports = async (req, res) => {
  const accessTokenData = await isAuthorized(req, res);
  if (!accessTokenData) {
    return res
      .status(401)
      .json({ data: null, message: 'Invalid access token!' });
  } else {
    const { id } = accessTokenData;
    let {
      year,
      month,
      day,
      category,
      newCategory,
      price,
      newPrice,
      outcomeIsCash,
      userCardId,
    } = req.body;
    let userCard;

    if (!outcomeIsCash && userCardId !== null) {
      userCard = await userCards.findOne({
        where: {
          cardId: userCardId,
          userId: id,
        },
      });
      userCard.dataValues.remainValue =
        userCard.dataValues.remainValue - price + newPrice;
      await userCards.update(
        {
          remainValue: userCard.dataValues.remainValue,
        },
        {
          where: {
            cardId: userCardId,
            userId: id,
          },
        },
      );
      await transactions.update(
        {
          year,
          month,
          day,
          category: newCategory,
          price: newPrice,
        },
        {
          where: {
            year,
            month,
            day,
            category,
            price,
            userId: id,
            userCardId,
          },
        },
      );
      const correctDate = await transactions.findAll({
        where: {
          year,
          month,
          userId: id,
        },
      });
      const cardPrice = await transactions.findAll({
        where: {
          year,
          month: month - 1,
          userId: id,
          outcomeIsCash: false,
        },
      });
      res.status(200).json({ transaction: correctDate, cardPrice: cardPrice });
    } else {
      await transactions.update(
        { category: newCategory, price: newPrice },
        { where: { year, month, day, category, price, userId: id } },
      );
      const correctDate = await transactions.findAll({
        where: {
          year,
          month,
          userId: id,
        },
      });
      if (month === 1) {
        (year -= 1), (month = 13);
      }
      const cardPrice = await transactions.findAll({
        where: {
          year,
          month: month - 1,
          userId: id,
          outcomeIsCash: false,
        },
      });
      res.status(200).json({ transaction: correctDate, cardPrice: cardPrice });
    }
  }
};
