const {admin,db, serviceAccount} = require('./admin');

var NodeRSA = require('node-rsa');
var jwt = require('jsonwebtoken');

exports.FBAuthCustom = (req, res, next) => {
    let idToken;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')){
        idToken = req.headers.authorization.split('Bearer ')[1];
    } else {
        console.error('No token found');
        return res.status(403).json({error : 'Unauthorized'})
    }

    const publicKey = new NodeRSA().importKey(serviceAccount.private_key, "pkcs8-private-pem").exportKey("pkcs8-public-pem")

    jwt.verify(idToken, publicKey, {
            algorithms: ["RS256"]
        }, (err, decoded) => {
        if (err) {
            console.error('Error while verifying the token', err);
            return res.status(403).json(err);
        } else {
            req.user = decoded;
            return db.collection('users')
                .where('userId', '==', decoded.uid)
                .limit(1)
                .get()
                .then(data => {
                    req.user.userId = data.docs[0].data().userId;
                    return next();
                })
        }
    })
}