
const verifyEmailCode = async(req, res) => {
    try {
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({msg: 'Server Error'})
    }
}