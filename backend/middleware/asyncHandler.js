const asyncHandler = (fn) => (req, res, next) =>
    Promise.resolve(fn(req, res, next)).catch((err) => {
        console.warn(err);
        return next(err);
    });

export default asyncHandler;