var glob = require('glob');
var getEntry = function getEntry(globPath) {
    var entries = {};
    if (typeof(globPath) != "object") {
        globPath = [globPath]
    }
    globPath.forEach((itemPath) => {

        glob.sync(itemPath).forEach(function(entry) {
            entries[entry.substring(13, entry.lastIndexOf('.'))] = entry; // 13代表'./src/module/'
        });
    });

    return entries;
};
module.exports = {
    getEntry: getEntry
}