const permit = (...roles) => {
    return (req, res, next) => {
        if (!req.user) res.status(401).send({'message': 'unauthenticated'});

        if ((!roles.includes(req.user.role))) res.status(403).send({'message': 'unauthorized'});

        next();
    };
};

module.exports = permit;