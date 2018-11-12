import * as fs from 'fs';
import {promisify} from 'util';
import {convertToJSON} from "./csvConvertors";
import * as _ from "lodash";
import {normalize} from "path";

const read = promisify(fs.readFile);
export default class Importer {
    importedFiles = {};

    constructor(dirWatcher) {
        this.dirWatcher = dirWatcher;
        this.onInit();
    }


    onInit(){
        this.dirWatcher.on('dirwatcher:changed', (files) => {
            Promise.all(files.map(
                file => read(file)
                    .then(s => s.toString())
                    .then(convertToJSON)))
                .then((data) => {
                    this.importedFiles = data
                        .reduce((acc, cur, i) => {
                            return ({...acc, [files[i]]: cur});
                        }, this.importedFiles);
                });
        });
    }

    async import(path) {
        return this.importSync(path);
    }

    importSync(p) {
        return _.pickBy(this.importedFiles, (k,v) => {
            return v.startsWith(p);
        });
    }
}