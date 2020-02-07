function download() {
    let pdf = new jsPDF('p', 'pt', 'a4');

    pdf.html(document.getElementById('tbl'), {
        callback: function () {
            // pdf.save('test.pdf');
            window.open(pdf.output('bloburl')); // to debug
        }
    });
}