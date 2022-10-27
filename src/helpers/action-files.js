const path  = require('path');
const fs    = require('fs');
const { v4:uuidv4 } = require('uuid');


const uploadFile = ( files, extensionsAllowed = ['jpn', 'jpg', 'jpeg','png'], nameFolder = ''  ) => {

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
    
        resolve( temporalName );
    });

}


const removeFile = ( file, collection ) => {

    if( file === undefined ) return
    
    const pathFile = path.join(__dirname, '../uploads',collection, file);

    if( !fs.existsSync( pathFile )) return
    
    fs.unlinkSync(pathFile)

}

module.exports = {
    uploadFile,
    removeFile
}