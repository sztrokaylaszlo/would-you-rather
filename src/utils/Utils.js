
export function getUrlFromPath(pathname, position) {
    const pathArray = pathname.split('/');
    return pathArray[position];
}
