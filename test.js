    $('#btnFromHtmlToPDF').click(function () {
        var width = 1000;
        var height = $(window).height();


        $('#tableToPrint').prepend('<table id="tblDynamicPadding"  style="padding-top:100px;visibility:hidden;"><tr><td><span></span></td></tr></table>');

        var pdf = new jsPDF('l', 'pt', /* 'letter' */ [width, height]);
        addNewPage(pdf);
    });

    var count = 0;

    function addNewPage(pdf) {
        pdf.html(
            $('#tableToPrint')[0], {
                callback: function () {
                    if (count == 0) {
                        $('#tblDynamicPadding').remove();
                        pdf.text(20, 40, 'RP');
                    } else
                        pdf.addPage();

                    pdf.setPage(count + 1);
                    pdf.text('Page ' + (count + 1), 20, 300);


                    if (count < 1) {                            
                        addNewPage(pdf);
                        count++;
                    } else
                        // pdf.save();
                        window.open(pdf.output('bloburl'));
                }
            }
        );
    }