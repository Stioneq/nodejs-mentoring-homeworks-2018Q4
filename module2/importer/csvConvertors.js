import  {EOL} from 'os';


function extractKeys(line) {
    if(line && typeof line === 'string'){
        return line.split(',');
    }
}

export function convertToJSON(content){
    content = content.split(EOL);
    const keys = extractKeys(content[0]);
    return content
        .slice(1)
        .filter(s => !!s)
        .map(s => s.split(',')
            .map((v,i) => ({[keys[i]]:v}))
            .reduce((res, cur) => ({...res, ...cur}), {}));

}