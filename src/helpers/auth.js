import jwt from 'jsonwebtoken';

const JWT_SECRET = 'Kn$HGVmIG'

const generateToken = async (user) => {
  return jwt.sign({ user }, JWT_SECRET, { expiresIn: '1h' });
};

const extractToken = async(authToken) => {
	if (authToken) {
		const split = authToken.split(' ');
		if (split.length > 1) {
			return split[1];
		}
		else {
			return authToken;
		}
	}
	else {
		return authToken;
	}
};

const verifyToken = async(token) => {
	try {
		token = await extractToken(token);

		const user = jwt.verify(token, JWT_SECRET);

		return user;
	}
	catch(err) {
		throw {
			msg: "Invalid Token"
		};
	}
};

const refreshToken = async(payload) => {
	return jwt.sign(payload, JWT_SECRET);
};

const setResponseToken = (res, token) => {
	return res.set('authorization', token);
};

const generateHash = async (text)=> {
	const hash = await bcrypt.hash(text, saltRounds);
	return hash;
};

export { 
  verifyToken,
  generateToken,
  refreshToken
};