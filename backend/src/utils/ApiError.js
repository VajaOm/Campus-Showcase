class ApiError extends Error {
    constructor(
        statusCode, 
        message= "Something went wrong", 
        errors = [], 
        stack = ""
    ) {
        this.statusCode = statusCode;
        super(message);
        this.errors = errors;
        this.message = message;
        this.success = false;
        this.data = null;

        if(stack) {
            this.stack = stack;
        }
        else{
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export {ApiError};