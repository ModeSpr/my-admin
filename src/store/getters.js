const getters = {
  token: state => state.user.accessToken,
  avatar: state => state.user.avatar,
  name: state => state.user.username,
  roles: state => state.user.roles,
  permission_routes: state => state.permission.routes
}
export default getters
