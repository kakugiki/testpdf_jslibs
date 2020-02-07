import jsPDF from './jspdf.debug';

function download() {
    let pdf = new jsPDF('p', 'pt', 'a4');
    pdf.html(document.body, {
        callback: function (pdf) {
            pdf.output('dataurlnewwindow');
        }
    });
}