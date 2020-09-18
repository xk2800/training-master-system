export const state = () => ({
  token: localStorage.getItem('user-token') || '',
  authenticated: localStorage.getItem('isAuth') === 'true',
  id: parseInt(localStorage.getItem('user-id')),
  type: parseInt(localStorage.getItem('user-type'))
})

export const mutations = {
  auth (state, data) {
    state.id = data.id
    state.type = data.type
    state.token = localStorage.getItem('user-token') || ''
    state.authenticated = localStorage.getItem('isAuth') === 'true'
  }
}
