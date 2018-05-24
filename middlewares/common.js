module.exports = {
  requireOption: function (objectRepository, propertyName) {
    if (objectRepository && objectRepository[propertyName]) {
      return objectRepository[propertyName];
    }
    throw new TypeError(propertyName + ' required');
  },
  states: {
    enRoute: 'Úton',
    waiting: 'Telephelyen várakozik'
  }
};