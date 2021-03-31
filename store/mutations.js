export default {
    increment(state) {
      state.counter++
    },
    setUserEmail(state, {text}) {
        state.userEmail = text;
    },
    setUserGithub(state, {text}) {
        state.userGithub = text;
    }
}