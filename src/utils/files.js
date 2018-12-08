const defaultErrorCB = (e) => {
    console.error('Error: ', e);
}

const requestFileSystem = ({ fileName = "newPersistentFile.txt", onSuccess, onError } = {}) => {
    /* eslint-disable */
    //Taking care of the browser-specific prefix
    window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;

    // The first parameter defines the type of storage: persistent or temporary
    // Next, set the size of space needed (in bytes)
    // initFs is the success callback
    // And the last one is the error callback
    // for denial of access and other errors. 
    window.requestFileSystem(window.PERSISTENT, 0, (fs) => {
        
        // Displaying result in the console
        console.debug('file system open: ' + fs.name);
        const errorCB = !onError ? defaultErrorCB : onError;

        // Opening/creating the file
        fs.root.getFile(fileName, { create: true, exclusive: false }, (fileEntry) => {
    
            // Display in the console
            console.log("fileEntry is file? ", fileEntry.isFile.toString());
            onSuccess && onSuccess(fileEntry);

        }, errorCB);
    }, onError);
    
    /* eslint-enable */
};

const FileHelper = {
    writeFile: ({ fileEntry, data, onSuccess, onError, }) => {
        // Create a FileWriter object for our FileEntry (log.txt).
        fileEntry.createWriter(function (fileWriter) {
            try {           
                // If data object is not passed in,
                // create a new Blob instead.
                let dataObj = '';

                if (!data) {
                    const jsonStr = JSON.stringify(data);
                    dataObj = new Blob([jsonStr], {type: "application/json"});
                } else {
                    throw new Error('No data to be saved.')
                }

                fileWriter.write(dataObj);

                fileWriter.onwriteend = function() {
                    console.debug("Successful file write...");
                    onSuccess && onSuccess('File write successful!');
                };

                fileWriter.onerror = function (e) {
                    console.error("Failed file write: " + e.toString());
                }; 
            } catch(e) {
                console.error('WriteFile', e);
            }

        });
    },
    readFile: ({ fileEntry, onSuccess, onError, }) => {
        // Get the file from the file entry
        const errorCB = !onError ? defaultErrorCB : onError;

        fileEntry.file((file) => {
            
            // Create the reader
            const reader = new FileReader();
            reader.readAsText(file);

            reader.onloadend = () => {

                console.debug("Successful file read: ", this.result, JSON.parse(this.result));
                console.debug("file path: " + fileEntry.fullPath);
                
                const result = !this.result ? {} : JSON.parse(this.result);
                onSuccess && onSuccess(result)

            };

        }, errorCB);
    },
    requestFileSystem,
};


export default FileHelper;