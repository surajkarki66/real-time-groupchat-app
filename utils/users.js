const users = [];

/**
 * Add a user to the chat.
 * @param {string} id - The unique ID of the user.
 * @param {string} name - The name of the user.
 * @param {string} room - The room to which the user belongs.
 * @returns {Object} The user object that was added.
 */
function userJoin(id, name, room) {
  if (!id || !name || !room) {
    throw new Error('All parameters (id, name, room) are required.');
  }

  const user = { id, name, room };
  users.push(user);

  return user;
}

/**
 * Get the current user by ID.
 * @param {string} id - The unique ID of the user.
 * @returns {Object|undefined} The user object if found, otherwise undefined.
 */
function getCurrentUser(id) {
  return users.find(user => user.id === id);
}

/**
 * Remove a user from the chat.
 * @param {string} id - The unique ID of the user.
 * @returns {Object|undefined} The user object that was removed, or undefined if no user was found.
 */
function userLeave(id) {
  const index = users.findIndex(user => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
}

/**
 * Get all users in a specific room.
 * @param {string} room - The room name.
 * @returns {Array} An array of user objects in the specified room.
 */
function getRoomUsers(room) {
  return users.filter(user => user.room === room);
}

module.exports = {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers
};
