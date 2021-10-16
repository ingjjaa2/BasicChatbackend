const {Schema,model} = require('mongoose');


const UsuarioSchema = Schema({

    nombre:{type:String,require:true},
    email:{type:String,require:true,unique:true},
    password:{type:String,require:true},
    online:{type:Boolean,require:false,default:false}

});

UsuarioSchema.method('toJSON',function(){
    const {__v,_id,...object} = this.toObject();
    object.uid = this.toObject()._id;
    return object;
});


module.exports = model('Usuario',UsuarioSchema);