
export const DataTableOptions:DataTables.Settings = {
  pageLength:10,
  order: [[0 , 'asc' ]],
  lengthMenu:[5,10,15,20],
  scrollX:true,
  orderClasses: false,
  // width: 100%,
  // autoWidth: true,
  // responsive: true,
  language: {
    lengthMenu: 'Mostrar _MENU_ Entradas',
    zeroRecords: 'No se encontraron resultados',
    emptyTable: 'Ningún dato disponible en esta tabla',
    info: 'Mostrando  _START_ a _END_ de  _TOTAL_ entradas',
    infoEmpty: 'Mostrando 0 a 0 de 0 entradas',
    search: '',
    infoFiltered: 'Filtrado de un total de _MAX_ registros',
    paginate: {first:'primero', last:'ultimo',  next:'siguiente', previous:'anterior'},
    searchPlaceholder: 'Buscar',

  }
}

export const DataTableOptions2:DataTables.Settings = {
  pageLength:10,
  order: [[0 , 'asc' ]],
  lengthMenu:[5,10,15,20],
  orderClasses: false,
  // width: 100%,
  // autoWidth: true,
  // responsive: true,
  language: {
    lengthMenu: 'Mostrar _MENU_ Entradas',
    zeroRecords: 'No se encontraron resultados',
    emptyTable: 'Ningún dato disponible en esta tabla',
    info: 'Mostrando  _START_ a _END_ de  _TOTAL_ entradas',
    infoEmpty: 'Mostrando 0 a 0 de 0 entradas',
    search: '',
    infoFiltered: 'Filtrado de un total de _MAX_ registros',
    paginate: {first:'primero', last:'ultimo',  next:'siguiente', previous:'anterior'},
    searchPlaceholder: 'Buscar',

  }
}
