export interface Reservation {
  id: number;
  nom: string;
  prenom: string;
  numtel: string;
  dateArrivee: Date;
  dateDepart: Date;
  typeChambre: string;
  available: boolean;
  idChambre: string;
}
