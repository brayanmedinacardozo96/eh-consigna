import { Component, OnInit, Input } from '@angular/core';
declare var $: any;
import * as moment from 'moment';

@Component({
  selector: 'app-generate-excel',
  templateUrl: './generate-excel.component.html',
  styleUrls: ['./generate-excel.component.scss']
})
export class GenerateExcelComponent implements OnInit {

  @Input() dataHeader = [];
  @Input() data = [];
  @Input() nameDocument = 'Documento';
  constructor() { }

  ngOnInit(): void {
  }

  generateExcel(){
    var normalize = (function() {
      var from = "ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç", 
          to   = "AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc",
          mapping = {};
     
      for(var i = 0, j = from.length; i < j; i++ )
          mapping[ from.charAt( i ) ] = to.charAt( i );
     
      return function( str ) {
          var ret = [];
          for( var i = 0, j = str.length; i < j; i++ ) {
              var c = str.charAt( i );
              if( mapping.hasOwnProperty( str.charAt( i ) ) )
                  ret.push( mapping[ c ] );
              else
                  ret.push( c );
          }      
          return ret.join( '' ).replace( /[^-A-Za-z0-9]+/g, '-' ).toLowerCase();
      }
     
    })();

    let element = document.createElement('a');    
    let dateFormat = moment().format('YYYY/MM/DD h:mm a');
    let siteUrl = 'http://www.electrohuila.com.co/Portals/0/logo.png';
    let htmlHeader = '<img src="'+siteUrl+'" width="25%">';
    htmlHeader += '<table>';
    htmlHeader += '<tr><td></td><td></td><td></td><td colspan="6"><h1>'+this.nameDocument+'</h1></td></tr>';
    htmlHeader += '<tr><td></td><td></td><td></td><td colspan="6"><h3> Fecha de generación: ' + dateFormat + '</h3></td></tr>';
    htmlHeader += '</table>';

    this.nameDocument = normalize(this.nameDocument);

    let table = '<br><table border="1px solid">';
    let tableHeader = '<thead><tr>';
    for(let value of this.dataHeader){
      tableHeader += '<th>'+value.name+'</th>';
    }
    tableHeader += '</tr></thead>';

    let tableBody = '<tbody>';
    for(let value of this.data){
      tableBody += '<tr>';
      for(let column of this.dataHeader){
        tableBody += '<td>';
        if(value[column.nameColumn] != null && value[column.nameColumn] != 'null'){
          if(column.name.toLowerCase().includes('fecha')){
            tableBody += moment(value[column.nameColumn]).format('YYYY/MM/DD');
          }else{
            tableBody += value[column.nameColumn];
          }
        }
        tableBody += '</td>';
      }
      tableBody += '</tr>';
    }
    tableBody += '</tbody>';
    
    table += tableHeader+tableBody+'</table>';

    let html = htmlHeader +table;
    html = this.getFormatHtml(html);
    element.setAttribute('href', 'data:application/vnd.ms-excel,' + encodeURIComponent(html));
    element.setAttribute('download', this.nameDocument+'.xls');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }

  /**
     * Función que se encargará de convertir las tildes en formato HTML
     * @param html
     * @returns {any}
     */
    getFormatHtml(html) {
      // Modificar tildes
      while (html.indexOf('á') !== -1) {
          html = html.replace('á', '&aacute;');
      }
      while (html.indexOf('Á') !== -1) {
          html = html.replace('Á', '&Aacute;');
      }
      while (html.indexOf('é') !== -1) {
          html = html.replace('é', '&eacute;');
      }
      while (html.indexOf('É') !== -1) {
          html = html.replace('É', '&Eacute;');
      }
      while (html.indexOf('í') !== -1) {
          html = html.replace('í', '&iacute;');
      }
      while (html.indexOf('Í') !== -1) {
          html = html.replace('Í', '&Iacute;');
      }
      while (html.indexOf('ó') !== -1) {
          html = html.replace('ó', '&oacute;');
      }
      while (html.indexOf('Ó') !== -1) {
          html = html.replace('Ó', '&Oacute;');
      }
      while (html.indexOf('ú') !== -1) {
          html = html.replace('ú', '&uacute;');
      }
      while (html.indexOf('Ú') !== -1) {
          html = html.replace('Ú', '&Uacute;');
      }
      while (html.indexOf('º') !== -1) {
          html = html.replace('º', '&ordm;');
      }
      while (html.indexOf('Ñ') !== -1) {
          html = html.replace('Ñ', '&Ntilde;');
      }
      while (html.indexOf('ñ') !== -1) {
          html = html.replace('ñ', '&ntilde;');
      }

      return html;

  }

}
