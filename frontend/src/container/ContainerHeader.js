import { connect } from 'react-redux'
import Header from '../components/layout/Header'
import { AuthManager } from '../services/AuthManager';

const mapStateToProps = (state) => ({
  logged: state.user.logged,
  username: AuthManager.getUsername()
})

export default connect(
  mapStateToProps
)(Header)
