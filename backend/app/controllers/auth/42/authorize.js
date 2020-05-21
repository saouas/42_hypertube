import { Api_42 } from "../../../services/Api_42"

const authorize = (req, res) => {
    const uri = Api_42.createRedirectURI();
    res.redirect(uri);
}

export default authorize;