export const endpoint = process.env.ENDPOINT || 'http://localhost:8080';

const config = {
    // user
    session: `${endpoint}/user`, // get ? 
    lang: `${endpoint}/user/lang`, //post
    mail: `${endpoint}/user/mail`, // post email 
    password: `${endpoint}/user/password`, // post old_password/ new_password
    full_name: `${endpoint}/user/full_name`, // post first_name/ last_name
    profile: `${endpoint}/user/get`, // get {username=username}
    pic: `${endpoint}/user/pic`, // post 

    // auth 
    signup: `${endpoint}/auth/basic/register`, // post username/mail/first_name/ last_name/ password/ pic
    signin: `${endpoint}/auth/basic/login`, // post username/ password
    auth_42: `${endpoint}/auth/42/authorize`, // get
    token_42: `${endpoint}/auth/42/token`, // get
    auth_github: `${endpoint}/auth/github/authorize`, //get
    token_github: `${endpoint}/auth/github/token`, // get
    ask: `${endpoint}/auth/forgot/ask_password`, // post username
    reset: `${endpoint}/auth/forgot/reset_password`, // post token/password

    //  movies
    movie: `${endpoint}/movies/movie`, // get {id = id}
    comment: `${endpoint}/movies/comment`, // post id/ content
    comments: `${endpoint}/movies/comments`, // get id
    popular: `${endpoint}/movies/popular`, // get

    // steaming
    stream: `${endpoint}/stream`, // get {id = id}
    search: `${endpoint}/movies/search`,
}

export default config;