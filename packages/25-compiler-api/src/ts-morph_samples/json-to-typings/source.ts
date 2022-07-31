export interface IStruct {
    name: string;
    age: number;
    sex: string;
    favors: (string | number)[];
    job: IJob;
    pets: IStructPets[];
}

export interface IJob {
    name: string;
    stack: string;
    company: string;
}

export interface IStructPets {
    id: number;
    type: string;
}
