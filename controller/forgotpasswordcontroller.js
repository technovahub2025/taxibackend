const User = require('../model/registermodel');
const bcrypt = require('bcryptjs');

exports.forgotPassword = async (req, res) => {
    const { email, oldPassword, newPassword } = req.body;

    if (!email || !oldPassword || !newPassword) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'User does not exist' });
        }

        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Old password is incorrect' });
        }

        if (oldPassword === newPassword) {
            return res.status(400).json({ msg: 'New password must be different from old password' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedNewPassword = await bcrypt.hash(newPassword, salt);

        user.password = hashedNewPassword;
        await user.save();

        res.status(200).json({ msg: 'Password updated successfully' });

    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server error' });
    }
};
