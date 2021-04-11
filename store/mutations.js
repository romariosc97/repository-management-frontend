export default {
    increment(state) {
      state.counter++
    },
    setGithubRepositories(state, array) {
        state.githubRepositories = array;
    },
    setGithubUsername(state, {text}) {
        state.githubUsername = text;
    },
    setUserEmail(state, {text}) {
        state.userEmail = text;
    },
    setToastState(state, {status}) {
        state.toastState = status;
    },
    setToastConf(state, configuration) {
        state.toastConf = configuration;
    },
}