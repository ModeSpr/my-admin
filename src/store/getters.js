const getters = {
  token: state => state.user.accessToken,
  avatar: state => state.user.avatar,
  name: state => state.user.username
}
export default getters
