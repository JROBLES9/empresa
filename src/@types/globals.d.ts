export interface Proyecto {
    id_proyecto: number;
    nombre_proyecto: string;
    descripcion: string;
    fecha_inicio: Date;
    fecha_fin: Date;
    porcentaje_completado: number;
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