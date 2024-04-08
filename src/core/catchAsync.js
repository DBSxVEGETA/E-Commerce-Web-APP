function catchAsync(callback) {
    return function (req, res, next) {
        callback(req, res, next)
            .catch((err) => {
                res.status(500).render('error', { err: err.message });
                next(err);
            });
    }
}

module.exports = catchAsync;