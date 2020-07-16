profile:
    get - we give id and get user data.
    
    set - we give id and data,(not including password and email)
    and the server saves this data for the id.
    If there's no pic, put a default one.
    (I've put it in  client/src/resources, take it wherever you want.)

user:
    post - we give email and password, and get an id.
    route:'/user', 'POST', {email, password}
    
    get - we give email and password - you give id.
     route:'/user', 'GET', {email, password}

project:
    get
    post
    set


