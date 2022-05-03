export default class Helpers {

    emptyOrRows(rows: Object) {
        if (!rows) {
            return [];
        }
        return rows;
    }

    static getOffset(currentPage: number, listPerPage: number) {
        return (currentPage - 1) * listPerPage;
    }

    static formatDate(date: Date): string {
        return [
            date.getFullYear(),
            date.getMonth(),
            date.getDate()
        ].join('/');
    }
}
