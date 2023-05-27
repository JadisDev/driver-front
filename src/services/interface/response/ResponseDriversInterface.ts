import DriverInterface from "../model/DriverInterface";
import ResposenDefaultInterface from "./ResponseDefaultInterface";

interface ResponseDriversInterface extends ResposenDefaultInterface {
    data: DriverInterface[] | null;
}

export default ResponseDriversInterface;