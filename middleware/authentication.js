export default function ({ store, redirect }) {
  if (!store.state.user.userid) { return redirect('/'); }
}
