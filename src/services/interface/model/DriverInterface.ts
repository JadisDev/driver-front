import VehicleInterface from "./VehicleInterface";

interface DriverInterface {
    id: number;
    name: string;
    document: string;
    vehicle_id: number;
    created_at: string | null;
    updated_at: string | null;
    vehicle: VehicleInterface
}

export default DriverInterface;