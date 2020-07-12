profile:
    get - we give id and get user data.
    
    post - we give email and password, and get an id.
    route:'/profile', 'POST', {email, password}

    set - we give id and data,(not including password and email)
    and the server saves this data for the id.

project:
    get
    post
    set


