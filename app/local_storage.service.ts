import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {

    set(key: string, value: string) {
        return localStorage.setItem(key, value);
    }

    get(key: string) {
        return localStorage.getItem(key);
    }

    remove(key: string) {
        return localStorage.removeItem(key);
    }
}
