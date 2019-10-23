export default {
  async showFlashMessage({commit}, message) {
    commit('setMessage', message); //mutationに値を渡す
  }
}
