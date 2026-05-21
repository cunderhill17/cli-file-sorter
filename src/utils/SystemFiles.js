const hiddenSystemFiles = new Set([
        "desktop.ini",
        "Thumbs.db",
        ".DS_Store",
        "NTUSER.DAT",
        "ntuser.dat.LOG1",
        "ntuser.dat.LOG2",
        "ntuser.ini"
]);


function isHiddenSystemFiles(name) {
    if (hiddenSystemFiles.has(name)) return true;

    // important: catch registry transaction garbage
    if (name.startsWith("NTUSER.DAT{")) return true;

    return false;
}


module.exports = {
    isHiddenSystemFiles
};