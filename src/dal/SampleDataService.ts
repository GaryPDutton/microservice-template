import NotFoundError from '../errors/NotFoundError';

const testData = [{ id: 0 , name: 'Gary Dutton'}, { id: 1 , name: 'Bill Smith'}];

// A very simple mocked data service with async methods
export default class SampleDataService {
    // Singleton array for in memory data
    private static _data: any;

    private static getIndex(item: any): number {
        let index;

        let i;
        for (i = 0; i < this.data.length; i += 1) {
            if (this.data[i].id === parseInt(item.id)) {
                index = i;
                break;
            }
        }

        return index;
    }

    public static get() {
        const items = this.data.filter((obj: any) => !obj.deleted);
        return Promise.resolve(items);
    }

    public static getById(id: number) {
        const foundItem = this.data.filter((item: any) => item.id === id)[0];
        console.log('Item:', foundItem);
        return foundItem ? Promise.resolve(foundItem) : Promise.reject(new NotFoundError());
    }

    public static add(item: any) {
        item.id = this.data.length;
        this.data.push(item);
        return Promise.resolve(item);
    }

    public static update(item: any) {
        console.log('Item:', item);
        const index = this.getIndex(item);

        if (index !== undefined) {
            this.data[index] = Object.assign({}, item);
            return Promise.resolve(item);
        }

        return Promise.reject(new NotFoundError());
    }

    public static remove(item: any) {
        const index = this.getIndex(item);
        item.deleted = true;

        if (index !== undefined) {
            this.data[index] = Object.assign({}, item);
            return Promise.resolve(true);
        }

        return Promise.reject(new NotFoundError());
    }

    public static get data() {
        return this._data || (this._data = [...testData]);
    }

    public static set data(data) {
        this._data = data;
    }

}