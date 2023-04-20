const users = [
    { id: 2, username: 'john', password: 'password1' },
    { id: 3, username: 'jane', password: 'password2' },
  ];
  
  function getUserFromDatabase(userId) {
    return users.find((user) => user.id === userId);
  }
  
  module.exports = {
    users,
    getUserFromDatabase,
  };
  