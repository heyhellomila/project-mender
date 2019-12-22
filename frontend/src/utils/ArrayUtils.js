export function chunk(arr, chunkSize) {
    let R = [];
    for (let i=0,len=arr.length; i<len; i+=chunkSize)
        R.push(arr.slice(i,i+chunkSize));
    return R;
}
