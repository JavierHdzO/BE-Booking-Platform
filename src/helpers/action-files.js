const path  = require('path');
const fs    = require('fs');
const { v4:uuidv4 } = require('uuid');
const { collection } = require('../models/user');
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

/**
 * 
 * @param {*} path String that contains the path file where is saved
 * @returns String that contains public url from cloudinary
 */
const uploadCloudinaryFile = async( path ) => {

    if ( path === undefined || path === '' ) return;

    try {

        const { secure_url } = await cloudinary.uploader.upload( path );

        return  secure_url;
        
    } catch (error) {
        throw error
    }
    


}

/**
 * 
 * @param {*} files (Object) It is getting from request (request.files).
 * @param {*} extensionsAllowed (Array) It contains extension files allowed.
 * @param {*} nameFolder (String) It is name folder inside of upload directory where files will save
 * @returns (Array) that contains per position two vales (temporalNameFile, uploadedPathFile)
 */

const uploadLocalFiles = ( files, extensionsAllowed = ['jpn', 'jpg', 'jpeg','png'], nameFolder = '' ) => {
    return new Promise( (resolve, reject )=>{

        if( Object.keys(files).length != 4){
            reject("Must be 4 image files");
        }

        const images = Object.entries(files);

        let nameCut;
        let extension;
        let temporalName;
        //Verify file extension
        images.forEach( (value, key) => {
            /**
             * value[0] is key of object files
             * value[1] is the data of object file
             */

            nameCut = value[1].name.split('.');
            extension = nameCut[ nameCut.length -1 ];

            if(!extensionsAllowed.includes(extension)){
                return reject(`${key} file extension is not allowed, try with this extensions ${extensionsAllowed}`);
            }
        });

        //Upload local server
        const imagesArray = [];
        images.forEach((value, key)=>{
            
            nameCut = value[1].name.split('.');
            extension = nameCut[ nameCut.length -1 ];

            temporalName = `${uuidv4()}.${extension}`;

            const uploadPath = path.join(__dirname, '../uploads', nameFolder, temporalName);

            files[value[0]].mv(uploadPath, ( error ) =>{
                reject(error);
            });

            imagesArray.push([temporalName, uploadPath]);

        });

        resolve( imagesArray );

    });
}


const removeLocalFiles = ( filesArray ) => {

    if( filesArray.length === 0 )
        return;
    
    filesArray.forEach(( file )=>{
        
    })

}

module.exports = {
    uploadLocalFile,
    removeLocalFile,
    removeCloudinaryFile,
    uploadCloudinaryFile,
    uploadLocalFiles
}