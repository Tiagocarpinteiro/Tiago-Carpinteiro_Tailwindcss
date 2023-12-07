const comparisonOperations = {
    'equal': (a, b) => a === b,
    'notEqual': (a, b) => a !== b,
    'greaterThan': (a, b) => a > b,
    'greaterThanOrEqual': (a, b) => a >= b,
    'lessThan': (a, b) => a < b,
    'lessThanOrEqual': (a, b) => a <= b
};

const maybeConvertToInteger = (str) => {
    const value = parseInt(str, 10);
    return isNaN(value) ? str : value;
}

const setModelFilters = (that) => {
    that.$el.querySelectorAll('[x-model^="filter."]').forEach(function (item) {
        let modelName = item.getAttribute('x-model');
        let key = that.getFilterKey(modelName);
        that.filter[key] = item.value;
        that.filters[key] = {
            compare: item.dataset.filterCompare || 'equal',
            keyValue: item.dataset.filterValue || ''
        };
    });
}

const setDatas = (that, data) => {
    that.datas = that.filteredDatas = that.baseDatas = data;
    that.filterTable();
}

export default function FlightTable(datas) {
    return {
        currentPage: 1,
        perPage: 5,
        filters: [],
        filter: [],
        filteredDatas: [],
        totalPages: 0,
        distanceMax: 10000,
        datas: [],
        baseDatas: [],
        init() {
            setModelFilters(this);
            fetch(datas)
                .then(response => response.json())
                .then(data => setDatas(this, data))
                .catch(error => console.error('Erreur de chargement:', error));
        },
        countTotalPages() {
            this.totalPages = Math.ceil(this.filteredDatas.length / this.perPage);
        },
        fromValues() {
            return [...new Set(this.baseDatas.map(data => data.from))].sort();
        },
        toValues() {
            return [...new Set(this.baseDatas.map(data => data.to))].sort();
        },
        getFilterKey(modelName) {
            return modelName.split('.')[1];
        },
        filterTable() {
            this.filteredDatas = this.baseDatas.filter(data =>
                Object.keys(this.filters).every(key => {
                    const { keyValue, compare } = this.filters[key];
                    const filterValue = maybeConvertToInteger(this.filter[key]) || false;
                    const dataValue = maybeConvertToInteger(data[keyValue]);
                    return !filterValue || comparisonOperations[compare](dataValue, filterValue);
                })
            );
            this.paginateTable();
        },
        setCurrentPage(page) {
            this.currentPage = page;
            this.paginateTable();
        },
        paginateTable() {
            this.countTotalPages();
            let offset = (this.currentPage - 1) * this.perPage;
            this.datas = this.filteredDatas.slice(offset, offset + this.perPage);
        }
    }
}
