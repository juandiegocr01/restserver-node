const Role = require('../models/role');
const Usuario = require('../models/usuario');
const Categoria = require('../models/categoria');

const esRoleValido = async(rol='')=>{
    const existeRole = await Role.findOne({rol});
    if(!existeRole){
           throw new Error('El rol que desea ingresar no existe en la base de datos');
    }
}

const emailExiste = async (correo='') =>{
    const emailE = await Usuario.findOne({correo});
    if (emailE) {
        throw new Error('El correo ya está registrado');
    }
}


const existeUsuarioPorId = async (id) =>{
    const existeUsuario = await Usuario.findById(id);
    if (!existeUsuario) {
        throw new Error('El usuario con el ID ingresado no existe');
    }
}


const existeCategoriaPorId = async (id) =>{
    const existeCategoria = await Categoria.findById(id);
    if(!existeCategoria){
        throw new Error('La categoría con ese ID no existe');
    }
}

module.exports = {esRoleValido, emailExiste, existeUsuarioPorId, existeCategoriaPorId }