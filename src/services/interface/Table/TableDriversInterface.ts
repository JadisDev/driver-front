interface TableDriversInterface {
    id: number;
    name: string;
    document: string;
    vehicle: {
        plate: string;
    }
}

export default TableDriversInterface;