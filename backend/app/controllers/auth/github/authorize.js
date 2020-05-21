import { Api_github } from "../../../services/Api_github"

const authorize = (req, res) => {
    const uri = Api_github.createRedirectURI();
    res.redirect(uri);
}

export default authorize;