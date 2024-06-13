export const Validatie = (req, res, next) => {
    const {naam} = req.body
    const errors = []

    if(!naam.length){
        errors.push({name: "name", message:"naam is te kort"})
    }
    if (errors.length){
        return res.status(400).json({
            status:"fail",
            message: errors
        })
    }
    next()
}