const path  = require('path');
const fs    = require('fs');
const { v4:uuidv4 } = require('uuid');
const cloudinary = require('cloudinary').v2;


cloudinary.config( process.env.CLOUDINARY_URL);

const uploadLocalFile = ( files, extensionsAllowed = ['jpn', 'jpg', 'jpeg','png'], nameFolder = ''  ) => {

    return new Promise( (resolve, reject) => {

        const { profile } = files;
    
        const nameCut = profile.name.split('.');
        const extension = nameCut[ nameCut.length -1 ];
    

        if( !extensionsAllowed.includes(extension)){
            return reject(`File extension is not allowed, try with this extensions ${extensionsAllowed}`);
            
        }
    
        const temporalName = uuidv4()+'.'+extension;
        
        /** Define path where image will be moved on server */
        const uploadPath = path.join(__dirname, '../uploads/', nameFolder,  temporalName);
        
        /** Remove file uploadeed to specific path */
        profile.mv( uploadPath, ( error ) => {
            if( error ){
                return reject(error);
            }
        });
    
        resolve( {temporalName, uploadPath} );
    });

}


const removeLocalFile = ( file, collection ) => {

    if( file === undefined ) return
    
    const pathFile = path.join(__dirname, '../uploads',collection, file);

    if( !fs.existsSync( pathFile )) return

    fs.unlinkSync(pathFile)

}

const removeCloudinaryFile = async( url ) => {

    if( url === undefined || url === '' ) return;
    
    try{

        const pathSplit     = url.split('/');
        if ( pathSplit.length === 1 ) return;

        const name          = pathSplit[pathSplit.length -1];
        const [ public_id ] = name.split('.');
        await cloudinary.uploader.destroy( public_id );
    }catch(error)
    {
        throw error
    }
}

const uploadCloudinaryFile = async( path ) => {

    if ( path === undefined || path === '' ) return;

    try {

        const { secure_url } = await cloudinary.uploader.upload( path );

        return  secure_url;
        
    } catch (error) {
        throw error
    }
    


}

module.exports = {
    uploadLocalFile,
    removeLocalFile,
    removeCloudinaryFile,
    uploadCloudinaryFile
}