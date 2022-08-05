export type Image = {
    id: number;
    idPaciente: number;
    caminho: string;
    tipo: string;
    aquisicao: Date;
    arquivado: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}