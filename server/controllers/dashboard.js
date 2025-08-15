export const dashboard = async(req, res) => {
    try {
        const user = getUserById(req.user.id);
        return res.status(200).json({msg: 'Here is the Dashboard Data'})
    } catch (error) {
        
    }
}