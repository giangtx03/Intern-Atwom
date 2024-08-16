export default class Search{
    keySearch?: string
    limit: number
    offset: number
    page: number
    timer: number

    constructor(keySearch: string, limit: number, offset: number, page: number, timer: number) {
        this.keySearch = keySearch;
        this.limit = limit;
        this.offset = offset;
        this.page = page;
        this.timer = timer;
    }
}