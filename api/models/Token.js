module.exports = {
  
  autoCreatedAt: false,
  autoUpdatedAt: false,
  attributes: {

    id: {
      type: 'integer',
      primaryKey: true
    },
    string: {
      type: 'text'
    },
    type: {
      type: 'text'
    },
    player: {
      model: 'player'
    },
    expired: {
      type: 'boolean'
    }

  }
};