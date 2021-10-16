const Message = require('../Db/models/mensaje');



const getLastMessages = async(req,res)=>{


    try {
        
        const uid     = req.uid;
        const otherUi = req.params.de;

        const last30 = await Message.find({
            $or:[
                {de:uid,para:otherUi},
                {de:otherUi,para:uid},
            ]})
            .sort({createdAt:'asc'})
            .limit(30);


        res.json({
            ok:true,            
            last30,
        });


    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok:false,
            error:"error getting messages"
        });
    }



}

module.exports = {getLastMessages}