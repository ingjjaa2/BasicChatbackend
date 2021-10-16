const {Schema,model} = require('mongoose');


const MesageSchema = Schema({

    de:{type:Schema.Types.ObjectId,ref:'Usuario',require:true},
    para:{type:Schema.Types.ObjectId,ref:'Usuario',require:true},
    message:{type:String,require:true}

},{
    timestamps:true
});

MesageSchema.method('toJSON',function(){
    const {__v,...object} = this.toObject();
    object.uid = object._id;
    return object;
});


module.exports = model('Mesage',MesageSchema);