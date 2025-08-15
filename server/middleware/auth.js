import jwt from 'jsonwebtoken';
export const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    // const authHeader = req.headers['authorization'];
    // const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ msg: 'Access token required' });
    try {
        const decode_token =  jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decode_token;
        next();
    } catch (error) {
        return res.status(403).json({ msg: 'Invalid or expired token' });
    }
}