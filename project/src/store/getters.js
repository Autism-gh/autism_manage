const getters = {
    sidebar: state => state.app.sidebar,
    device: state => state.app.device,

    visitedViews: state => state.tagsView.visitedViews,
    cachedViews: state => state.tagsView.cachedViews,

    roles: state => state.user.roles,
    errorLogs: state => state.errorLog.logs
  }
  export default getters
  