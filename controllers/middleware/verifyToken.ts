const jwt = require('jsonwebtoken');


export const verifyToken = (req: any, res: any, next: any) => {
    const token = req.cookies.authToken

    if (!token) {
        req.tokenValid = false;
        return next();
    }

    try {
        const decoded = jwt.verify(token, 'secret'); //change later
        req.user = decoded;
        req.tokenValid = true;
        next();
    } catch (err) {
        req.tokenValid = false;
        next();
    }
};