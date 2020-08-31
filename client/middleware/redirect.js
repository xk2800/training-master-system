export default ({ store, redirect }) => {
  // If the user is not authenticated
  if (store.state.session.authenticated) {
    console.log('Authenticated')
    return redirect('/u/home')
  }
}
