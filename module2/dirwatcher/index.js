import * as fs from 'fs';
import {join} from 'path';
import {EventEmitter} from 'events';
import {promisify} from 'util';
import * as _ from "lodash";


const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);


export default class DirWatcher extends EventEmitter{

    watchedFiles = {};

    watch(path = '.', delay = 5000) {
        this.watchedFiles = {};
        setInterval(() => {
            readdir(path)
                .then(files => {
                    return Promise.all(files.map(fName => {
                        const fPath = join(path, fName);
                        return stat(fPath).then(fstat => {
                            return {filePath: fPath, mtime: fstat.mtime};
                        });
                    }));
                }).then(result => {
                const modifiedFiles = _.filter(result, file => this.fileWasModified(file));
                this.updateWatchedFiles(modifiedFiles);
                if (modifiedFiles && modifiedFiles.length > 0) {
                    this.emit('dirwatcher:changed', modifiedFiles.map(res => res.filePath));
                }
                return result;
            }).catch(err => {
                console.log(err);
            })

        }, delay);

    }

    /**
     * Checks if file was modified
     * @param file {filePath, mtime}
     */
    fileWasModified(file) {
        return !(file.filePath in this.watchedFiles) || file.mtime > this.watchedFiles[file.filePath];
    }

    /**
     * Writes modifed files to the already been watched cache
     * @param modifiedFiles array of modified files
     */
    updateWatchedFiles(modifiedFiles) {
        modifiedFiles.forEach(res => {
            this.watchedFiles = {...this.watchedFiles, [res.filePath]: res.mtime};
        });
    }
}