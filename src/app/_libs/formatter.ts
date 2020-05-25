export class Formatter {

 /**
   * 
   * @param date 
   * @param format 1 = dd/mm/yyyy
   * @param format 2 = yyyy-mm-dd
   * @param format 3 = dd-mm-yyyy
   * @param format 4 = ddmmyyyy
   */
  setTanggalToStr(date: Date, format = 1) {
    let d = ("0" + date.getDate()).slice(-2)
    let m = ("0" + (date.getMonth() + 1)).slice(-2)
    let y = date.getFullYear()
    if (d != "aN" || m != "aN" ) {
      if (format == 1) {
        return d + '/' + m + '/' + y
      } else if (format == 2) {
        return y + '-' + m + '-' + d
      } else if (format == 3) {
        return d + '-' + m + '-' + y
      } else if (format == 4) {
        return d + m + y
      } else if (format == 5) {
        return y + m + d
      }
    } else{
      return "";
    }
  }

  /**
   * 
   * @param date 
   * @param format 1 = dd/mm/yyyy
   * @param format 2 = yyyy-mm-dd
   * @param format 3 = dd-mm-yyyy
   * @param format 4 = ddmmyyyy
   * @param type 0 = 00:00
   * @param type 1 = 23:59
   */
  setTanggalShift(date: Date, format = 1, type){
    let waktu = type == '0' ? '00:00' : '23:59'
    let d = ("0" + date.getDate()).slice(-2)
    let m = ("0" + (date.getMonth() + 1)).slice(-2)
    let y = date.getFullYear()
    if (d != "aN" || m != "aN" ) {
      if (format == 1) {
        return d + '/' + m + '/' + y + ' ' + waktu
      } else if (format == 2) {
        return y + '-' + m + '-' + d + ' ' + waktu
      } else if (format == 3) {
        return d + '-' + m + '-' + y + ' ' + waktu
      } else if (format == 4) {
        return d + m + y + ' ' + waktu
      } else if (format == 5) {
        return y + m + d + ' ' + waktu
      }
    } else{
      return "";
    }
  }

}