export const state = () => ({
  token: localStorage.getItem('user-token') || '',
  authenticated: localStorage.getItem('isAuth') === 'true',
  id: parseInt(localStorage.getItem('user-id')) || null,
  type: parseInt(localStorage.getItem('user-type')) || -1
})

export const mutations = {
  auth (state, data) {
    state.id = data.id
    state.type = data.type
    state.token = localStorage.getItem('user-token') || ''
    state.authenticated = localStorage.getItem('isAuth') === 'true'
  }
}
