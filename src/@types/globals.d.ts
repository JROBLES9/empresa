export interface Proyecto {
    id_proyecto: number;
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

export interface Alerta {
    id_alertas: number;
    nombre: string;
    dias: number;
    id_proyectos: number;
}