interface TableDriversInterface {
    id: number;
    name: string;
    document: string;
    vehicle: {
        plate: string;
        model: string;
    }
}

export default TableDriversInterface;