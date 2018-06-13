


$.ajax({
  url: "http://localhost:3000/users"
}).done(function(res) {
	renderNames(res);
});

function renderNames(listOfPeople) {
	var html = '';
	for (var i = listOfPeople.length - 1; i >= 0; i--) {
		html += makePerson(listOfPeople[i].id, listOfPeople[i].firstName, listOfPeople[i].lastName);
	}

	$('.names').append(html);

	attachHandlers();
}


function makePerson(id, firstName, lastName) {
	var fName = firstName + ' ' + lastName;
	return "<li id='" + id + "'>" + fName + "</li>";
}

function attachHandlers() {


	$('#back').on('click', function() {
		$('.details').hide();
		$('.names').show();
		$('#back').hide();

	});

	$('.names li').on('click', function() {

		var id = $($(this)[0]).attr('id');

		$.ajax({
			url: "http://localhost:3000/user/" + id,
		}).done(function(res) {
			if (res == null) return null;

			$('.names').hide();
			$('#back').show();
			renderDetails(res);
		});
	})
}


function renderDetails(person) {
	var html = makeDetails(person.firstName, person.lastName, person.nationality, person.age);
	$('body').append(html);
}


function makeDetails(firstName, lastName, nationality, age) {
	return ['<div class="details">',
				'<p><label>First Name:</label>',
				'<span>' + firstName + '</span></p>',
				'<p><label>Last Name:</label>',
				'<span>' + lastName + '</span></p>',
				'<p><label>Nationality:</label>',
				'<span>' + nationality + '</span></p>',
				'<p><label>Age:</label>',
				'<span>' + age + '</span></p>',
			'</div>'].join('');
}

