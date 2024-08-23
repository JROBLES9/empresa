import { boolean } from "zod";

export interface Proyecto {
    idProyecto: number;
    nombreProyecto: string;
    descripcion: string;
    fechaInicio: Date;
    fechaFin: Date;
    porcentajeCompletado: number;
    estado: string;
}

export interface Empleado {
    id_empleado: number;
    nombre: string;
    apellido: string;
    fechaNacimiento: Date;
    direccion: string;
    telefono: string;
    email: string;
    fechaContratacion: Date;
    salario: number;
    cargo: string;
    idProyecto: number;
}