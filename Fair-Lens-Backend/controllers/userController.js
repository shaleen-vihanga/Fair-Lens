import User from '../models/User.js';
import bcrypt from 'bcrypt';

export function getUser(req, res) {
    User.find().then(users => {
        res.json(users);
    });
}

export function createUser(req, res) {
    const data = req.body;
    const hashedPassword = bcrypt.hashSync(data.password, 10);
    // console.log(req.body);
    const user = new User({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: hashedPassword,
        role: data.role,
        specialization: data.specialization,
        imageUrl: data.imageUrl,
    });
    user.save().then(() => {
        res.json({
            message: 'User created successfully'
        });
    });
}

export function deleteUser(req, res) {
    res.json({
        message: 'Delete user endpoint' + req.body.name,
    });
}

export function updateUser(req, res) {
    res.json({
        message: 'Update user endpoint' + req.body.name,
    });
}

export function loginUser(req, res) {
    const email = req.body.email;
    const password = req.body.password;

    User.find({ email: email }).then((users) => {
        if (users[0] == null) {
            res.status(404).json({
                message: 'User not found',
            });
        } else {
            const user = users[0]
            if (user.isBlocked) {
                res.status(403).json({
                    message: 'User is blocked. Contact admin for more details.',
                });
                return
            }
            // res.json(user)
            const isPasswordCorrect = bcrypt.compareSync(password, user.password);
            if (isPasswordCorrect) {
                const payload = {
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    role: user.role,
                    specialization: user.specialization,
                    isEmailVerified: user.isEmailVerified,
                    imageUrl: user.imageUrl,
                };

                const token = jwt.sign(payload, 'your_secret_key', {
                    expiresIn: '1h',
                });

                res.json({
                    message: 'Login successful',
                    token: token,
                    role: user.role,
                });

            } else {
                res.status(401).json({
                    message: 'Invalid credentials',
                });
            }
        }
    });
}