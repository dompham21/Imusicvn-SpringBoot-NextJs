export function formatTimeAudio(time){
    let fTime = Math.trunc(time);

    let minutes = "0" + Math.floor(fTime / 60);
    // @ts-ignore
    let seconds = "0" + (fTime - minutes * 60);
    let cur = minutes.substr(-2) + ":" + seconds.substr(-2);

    return cur;
}

export function isEmptyObject(obj) {
    return Object.keys(obj).length === 0;
}
