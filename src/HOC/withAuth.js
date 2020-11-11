import { useAuth } from '../costomHooks/index';



const WithAuth = props => useAuth(props) && props.children;

export default WithAuth;