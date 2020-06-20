import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort, Sort } from '@angular/material';
import * as _ from 'lodash'

export function openSnackBar(snackBar: MatSnackBar, message: string, action: string) {
    snackBar.open(message, action, {
        duration: 2000,
        verticalPosition: 'top',
        panelClass: ['mat-toolbar', 'mat-accent'],
    });
}

export function sortedData(dataSource, sort: Sort) {
    dataSource.data = dataSource.data.sort((a, b) => {
        const isAsc = sort.direction === 'asc';
        return _compare(a[sort.active], b[sort.active], isAsc);
    });
}

export function _compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

export function empty(object) {
    return _.isEmpty(object)
}

export function filter(dataSource, filterString: string) {
    dataSource.filter = filterString.trim().toLowerCase();
}

