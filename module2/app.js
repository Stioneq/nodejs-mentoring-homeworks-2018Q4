import DirWatcher from "./dirwatcher/index";
import Importer from "./importer/index";


const dirWatcher = new DirWatcher();
const importer = new Importer(dirWatcher);
dirWatcher.watch('c:\\tmp\\data', 5000);


const stdin = process.stdin;
stdin.setEncoding('utf8');
stdin.on('data', function (chunk, key) {
    process.stdout.write('Get Chunk: ' + chunk + '\n');
    switch(+chunk){
        case 1:
            console.log(importer.importSync('c:\\tmp\\data'));
            break;
        case 2:
            importer.import('c:\\tmp\\data')
                .then(console.log);

    }
});