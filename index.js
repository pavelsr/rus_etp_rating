function createTable(tableData, callback) {

	var table = $('table#jquery-table');

	col_names_to_skip = [
		"web-scraper-order",
		"web-scraper-start-url",
		"pagination"
	];

	var thead_tr = $('<tr>');
	$.each(tableData.meta.fields, function(x, col_h) {
			if ( col_names_to_skip.includes(col_h) ) { return true; }
			else { $('<td>').text(col_h).appendTo(thead_tr); }
	});
	table.append( $('<thead>').append(thead_tr) );

	var tbody = $('<tbody>');
	$.each(tableData.data, function(x, row) {
	    var tr = $('<tr>');
	    $.each(row, function(col_name, col_data) {
					if ( col_names_to_skip.includes(col_name) ) { return true; }
	        else { tr.append( $('<td>').text(col_data) ); }
	    });
	    tbody.append(tr);
	});

	table.append(tbody);
	callback();
}

function TableSort() {
	$("#jquery-table").tablesorter({
		theme: 'blue',
		widthFixed: true,
		widgets: ['zebra', 'stickyHeaders', 'filter'],
		showProcessing: true,
	});
	console.log("tablesorter finished");
}

Papa.parse('data.csv', {
	download: true,
	header: true,
	skipEmptyLines: true,
	complete: function(results) {
		console.log("Parsing complete:", results.data);
		createTable(results, TableSort);
	}
});
