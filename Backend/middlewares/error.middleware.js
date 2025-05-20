const errorMiddleware = (err, req, res, next) => {
    try {
        let error = {...err};

        error.message = err.message;

        console.error(err);

        // cast error (bad objectId)
        if (error.name === "CastError") {
            const message = `Resource not found with id of ${err.value}`;
            error = new Error(message);
            error.status = 404;
        }

        // duplicate key
        if (error.code === 11000) {
            const message = "Duplicate field value entered";
            error = new Error(message);
            error.status = 400;
        }

        // mongoose validation error
        if (error.name === "ValidationError") {
            const message = Object.values(err.errors).map(val => val.message);
            error = new Error(message.join(", "));
            error.status = 400;
        }

        res.status(error.status || 500).json({
            success: false,
            error: error.message || "Server Error"
        })
    } catch (error) {
        next(error)
    }
}

export default errorMiddleware