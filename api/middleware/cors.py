class Cors:
    def __init__(self, get_response):
        self.get_response = get_response
        # One-time configuration and initialization.

    def __call__(self, request):
        # Code to be executed for each request before
        # the view (and later middleware) are called.

        response = self.get_response(request)
        response["Access-Control-Allow-Origin"] = ["*", 'localhost:3000']
        
        response['Access-Control-Allow-Credentials'] = 'false'

        # Code to be executed for each request/response after
        # the view is called.

        return response

    def process_response(self, req, response):
        response["Access-Control-Allow-Origin"] = "*"
        
        return response