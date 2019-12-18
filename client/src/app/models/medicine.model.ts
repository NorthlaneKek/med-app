const NOT_DATA = 'Нет данных';

export class Medicine {
    _id = null;
    numberRegistr = NOT_DATA;
    dateRegistr = NOT_DATA;
    dateEndRegistr = NOT_DATA;
    dateNull = NOT_DATA;
    faceMainCompany = NOT_DATA;
    faceMainCountry = NOT_DATA;
    mainName = NOT_DATA;
    internationalName = NOT_DATA;
    form = NOT_DATA;
    stepsManufacturing = NOT_DATA;
    codePack = NOT_DATA;
    documentationL = NOT_DATA;
    farmGroup = NOT_DATA;

    constructor(cfg = {}) {
        try {
            Object.keys(cfg).forEach(prop => {
                if (this.hasOwnProperty(prop)) this[prop] = cfg[prop];
            });
        } catch (e) {
            console.error(`Неправильные данные в Medicine: ${e.message}`);
        }
    }
}
