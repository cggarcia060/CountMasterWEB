import { HttpHeaders } from "@angular/common/http";

export class Constant {
  public static SUCCESS='success';
  public static success='success';
  public static SUPERADMIN='ROLE_SUPERADMIN';
  public static ADMIN='ROLE_ADMIN';
  public static TOKEN_KEY='AU7470K3N';
  public static USERNAME_KEY='AuthUserName';
  public static AUTHORITIES_KEY='AuthAutorities';
  public static AUTHORIZACION="AU76021Z1C10N";
  public static COMPONENTS="C0890N3N3735";
  public static PRP="PRP";

  public static PRC='9R0C3505';
  public static ARRAYMENU=[
  {key:'dashboard',logo:'dashboard',name:'Dashboard'},
  {key:'compras',logo:'shopping',name:'Compras' },
  {key:'ventas',logo:'fund-projection-screen',name:'Ventas'},
  {key:'categorias',logo:'group',name:'Categorias'},
  {key:'productos',logo:'profile',name:'Productos'},
  {key:'inventario',logo:'stock',name:'Inventario'},
  {key:'contabilidad',logo:'calculator',name:'Contabilidad'},
  {key:'proveedores',logo:'team',name:'Proveedores'},
  {key:'usuarios',logo:'user-add',name:'Usuario'},
  {key:'administracion',logo:'solution',name:'Administracion'},
  {key:'configuracion',logo:'setting',name:'Configuracion'}
];




  public static httpHeaders = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    }),
  };

}

