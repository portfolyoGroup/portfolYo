I will provide 3 architecture options, the 1st and the 2nd are using AWS due to its free tier.
I will elaborate on each in our next meeting.

## Option 1: (does not scale)
Serverless Application - when the client clicks on "execute" an ajax request fired to an API gatewaty that run an instance (server),
the server downloads the code from s3 bucket (bucket-like DB), (we need to think if the code is an artifact with a batch file or
something more complicated) and execute the code. the output needs to be redirected somehow to the client.

## Option 2: (does scale)
same stracture with one change, we are going to have a cluster of machines alive that auto-scale if needed (k8s or ecs).
the api gateway will redirect the request to the relevant cluster (Python, Java etc.) that will execute it on one of its nodes.
this option is more complicated but we should still consider it.

## Option 3:
non serverless - we will have a server that always waits for requests, does not scale, doesnt elegant - I dont see any adventages for 
this method, but the fact that it is probably the easiest - not in much.
