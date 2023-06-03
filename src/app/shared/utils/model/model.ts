export class JsendResponse<T> {


  readonly status: string;
  readonly message: string;
  readonly data: T;

  constructor(status: string, message: string, data: T) {
    this.status = status;
    this.message = message;
    this.data = data;
  }
}
export class Categoria{
  id?:number;
  nombre:string;
  estado:boolean;

  constructor(nombre:string,estado:boolean){
  this.nombre=nombre;
  this.estado=estado;
  }
}
export class Proceso{

  nombre:string;
  codigo:string;
  constructor(nombre:string, codigo:string){
    this.nombre=nombre;
    this.codigo=codigo;
  }

}

export class Rol{
  nombre:string;
  rolNombre:string;
  constructor(nombre:string,rol_nombre:string){
    this.nombre=nombre;
    this.rolNombre=rol_nombre;
  }
}
export class ProcessAndRol{
  rol:string;
  proceso:string;
  constructor(rol:string,proceso:string){
    this.rol=rol;
    this.proceso=proceso
  }
}

export class JwtDTO {
  token: string;
  type?: string;
  nombreUsuario?: string;
  authorities?: string[];
  constructor(token:string,type?:string,nombreUsuario?:string,authorities?:string[]){
    this.token=token;
    this.type=type;
    this.nombreUsuario=nombreUsuario;
    this.authorities=authorities;
  }
}

export class LoginUsuario{
  nombreUsuario:string;
  password:string;
  constructor(usuario:string,password:string){
    this.nombreUsuario=usuario;
    this.password=password
  }
}

export class Usuario{
  id?:number;
  nombre:string;
  apellido:string;
  nombreUsuario:string;
  email:string;
  password:string;
  identificacion:number;
  roles:number[]|any[];
  procesos:number[];
  constructor(nombre:string,apellido:string,nombreUsuario:string,identificacion:number,email:string,password:string,roles:number[],procesos:number[],id?:number){
    this.id=id;
    this.nombre=nombre;
    this.apellido=apellido;
    this.nombreUsuario=nombreUsuario;
    this.identificacion=identificacion;
    this.password=password;
    this.email=email;
    this.roles=roles;
    this.procesos=procesos
  }



}


// export class Compra{
//   id?:number;
//   cantidad: number;
//   descripcion?: string;
//   fecha: string;
//   marca?: string;
//   nombre: string;
//   peso: string;
//   proveedor?: number;
//   total: number;
//   unidad: number;
//   valor:number;
//   constructor(nom:string,des:string,fe:string,ma:string,can:number,)
// }

