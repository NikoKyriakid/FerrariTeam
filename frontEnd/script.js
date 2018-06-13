



$.ajax({
  url: "localhost://3000",
  data: data
}).done(function(res) {
	renderNames(res);
});

function renderNames(listOfPeople) {
	var html = '';
	for (var i = listOfPeople.length - 1; i >= 0; i--) {
		html += makePerson(listOfPeople[i]);
	}

	$('.names').append(html);
}


function makePerson(id, name) {
	return "<li id='" + id + "'>" + name + "</li>";
}

function attachHandlers() {
	$('.names li').on('click', function() {

		var id = $(this).id;

		$.ajax({
			url: "localhost:3000/user/" + id,
		}).done(function(res) {
			if (res == null) return null;

			$('.names').hide();
			renderDetails();
		});
	})
}


function renderDetails(person) {
	var html = makeDetails(person.firstName, person.lastName, person.nationality, person.age);
	$('body').append(html);
}


function makeDetails(firstName, lastName, nationality, age) {
	return ['<div class="details">',
				'<label>First Name:</label>',
				'<span>' + firstName + '</span>',
				'<label>Last Name:</label>',
				'<span>' + lastName + '</span>',
				'<label>Nationality:</label>',
				'<span>' + nationality + '</span>',
				'<label>Age:</label>',
				'<span>' + age + '</span>',
			'</div>'].join('');
}

