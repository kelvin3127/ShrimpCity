import { useAdminAuth } from '../costomHooks/index'

const WithAdminAuth = props => useAdminAuth(props) && props.children

export default WithAdminAuth;