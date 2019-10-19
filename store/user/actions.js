export default {
  async setUsername({commit}, user) {
    commit('SET_USERNAME', user);
  },
  async setUserid({commit}, user) {
    commit('SET_USERID', user);
  },
}
