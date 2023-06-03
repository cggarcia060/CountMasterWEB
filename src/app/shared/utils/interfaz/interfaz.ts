
export interface IUsuario{
  nombre:string;
  apellido:string;
  nombreUsuario:string;
  email:string;
  password:string;
  roles:string[];
  procesos:string[];
  identificacion?:string;
}
export interface DataId{
  id:number;
}
export interface Data{
  data:string;
}
export interface IMensaje{
  mensaje:string;
}
export interface IProceso extends ProcesoDto{
  id:number;
}
export interface ProcesoDto{
  nombre:string;
  codigo:string;
}
export interface IRol extends IRolDto{
  id:number;
}
export interface IRolDto{
  nombre:string;
  rolNombre:string;
}
export interface IPermiso extends IPermisoDto{
  id:number
}
export interface IPermisoDto  {
  proceso:IProceso;
  rol:IRol;
  dashboard: boolean;
  compras: boolean;
  ventas: boolean;
  categorias: boolean;
  productos: boolean;
  inventario: boolean;
  contabilidad: boolean;
  usuarios: boolean;
  configuracion: boolean;
  proveedores: boolean;
  administracion: boolean;

}

export interface Unidad {
  id:number,
  nombre:string;
  valor?:string;
}
export interface Proveedor{
id: number,
nombre_empresa: string,
nit_empresa: number,
direccion:string,
descripcion?:string,
telefono:string
}
export interface Compra{
  id?:number,
  cantidad: number,
  descripcion?: string,
  fecha: string,
  marca?: string,
  nombre: string,
  peso: string,
  proveedor?: number,
  total: number,
  unidad: number,
  valor:number
}
export interface Venta{
  id?:number,
  producto: any[],
  marca?: string,
  fecha: Date,
  cantidad?: number,
  valor?:number
  descripcion?: string,
  usuario?: string,
  tipo?:number,
  total?: number,
}
export interface Categoria{
  id?:number,
  nombre:string,
  estado:boolean
}

