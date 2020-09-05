export const state = () => ({
  authenticated: false,
  token: null,
  id: null,
  type: -1
})

export const mutations = {
  auth (state, data) {
    state.id = data.id
    state.token = data.token
    state.authenticated = true
    state.type = data.type
  }
}
