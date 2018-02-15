
// A very simple mocked data service with async methods
export default class SampleDataService {
    // Singleton array for in memory data
    private static _data: any;

    public static get() {
        const items = this.data.filter((obj: any) => !obj.deleted);
        return Promise.resolve(items);
    }

    public static getById(id: number) {
        const item = this.data.filter((item: any) => item.id === id && !item.deleted)[0];
        return Promise.resolve(item);
    }

    public static add(item: any) {
        item.id = this.data.length;
        this.data.push(item);
        return Promise.resolve(item);
    }

    public static update(item: any) {
        this.data[item.id] = item;
        return Promise.resolve(item);
    }

    public static remove(item: any) {
        item.deleted = true;
        this.data[item.id] = item;
        return Promise.resolve(true);
    }

    public static get data() {
        return this._data || (this._data = []);
    }

    public static set data(data) {
        this._data = data;
    }

}