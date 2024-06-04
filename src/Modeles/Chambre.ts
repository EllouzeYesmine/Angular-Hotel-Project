import { Reservation } from "./Reservation";

export interface Chambre {
    id: string;
    numero: string;
    type: string;
    prix: string;
    image: string;
    description: string;
    available: boolean;
}