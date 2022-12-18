

const response = (statusCode, message, data, res) => {
    res.status(statusCode).json([
        {
            message: message,
            payload: data,
        },
    ])
}

export default response;