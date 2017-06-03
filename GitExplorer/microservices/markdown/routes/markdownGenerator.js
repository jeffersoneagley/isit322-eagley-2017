/**
 * Created by fish on 6/2/17.
 * This is a utility object which generates markdown from gist data.
 */
function markdownGenerator() {
    let gistBuildHeader = (gistData) => {
        return '# ' + gistData.id || 'invalid gist id' + '</ br>' +
            gistData.description || 'no description' + '</ br>';
    };

    let gistFileHandler = (fileData = '') => {
        console.log(fileData);
        return '### ' + fileData.filename || 'no filename given' + '</ br>' + fileData.content ||
            'no content' + '</ br>***</ br>';
    };

    let gistBuildFilesContent = (fileData) => {
        let result = '## Files</ br>';
        for (let file in fileData) {
            if (fileData.hasOwnProperty(file)) {
                result += gistFileHandler(fileData[file]);
            }
        }
        return result;
    };

    let fromGist = (gistData) => {
        gistData = typeof (gistData) === 'string' ? JSON.parse(gistData) : gistData;
        let result = '';
        result += gistBuildHeader(gistData);
        result += gistBuildFilesContent(gistData.files);
        return result;
    };

    return {
        fromGist: fromGist,
    };
};

module.exports = markdownGenerator;
