function durationToString(duration) {
    var s = "";
    if (duration.years()) {
        s += Math.abs(duration.years()) + " year" + (Math.abs(duration.years()) == 1 ? "" : "s") + ", "
    }
    if (duration.months()) {
        s += Math.abs(duration.months()) + " month" + (Math.abs(duration.months()) == 1 ? "" : "s") + ", "
    }
    if (duration.days()) {
        s += Math.abs(duration.days()) + " day" + (Math.abs(duration.days()) == 1 ? "" : "s") + ", "
    }
    if (duration.hours()) {
        s += Math.abs(duration.hours()) + " hour" + (Math.abs(duration.hours()) == 1 ? "" : "s") + ", "
    }
    if (duration.minutes()) {
        s += Math.abs(duration.minutes()) + " minute" + (Math.abs(duration.minutes()) == 1 ? "" : "s") + ", "
    }
    if (duration.seconds()) {
        s += Math.abs(duration.seconds()) + " second" + (Math.abs(duration.seconds()) == 1 ? "" : "s") + ", "
    }
    s = s.slice(0, s.length - 2);
    if (duration < 0) {
        s += " from now";
    } else {
        s += " ago"
    }
    return s;
}

$( document ).ready(function() {
    var params = window.location.search.substr(1);
    if (params) {
        params = params.split("&");
        var values = [];
        $.each(params, function() {
            values.push(this.split("=")[1]);
        })
        var string = values[0] + "-" + values[1].padStart(2, '0') + "-" + values[2].padStart(2, '0') + " " + values[3].padStart(2, '0') + ":" + values[4].padStart(2, '0');
        var datetime = moment(string);


        function updateValues() {
            var now = moment();
            var difference = moment.duration(now - datetime);
            var mirror = moment(now + difference);

            $("#datetime").html(datetime.format("dddd, MMMM Do YYYY, h:mm:ss a"));
            $("#delta").html(durationToString(difference));
            $("#mirror").html(mirror.format("dddd, MMMM Do YYYY, h:mm:ss a"));
        }

        updateValues(datetime);
        var intervalID = window.setInterval(updateValues, 1000);
    }

    var now = moment();
    for (var y = 1900; y < 2100; y++) {
        $('#year').append($('<option>', {value: y, text: y}));
    }
    for (var m = 1; m <= 12; m++) {
        $('#month').append($('<option>', {value: m, text: [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ][m - 1]}));
    }
    for (var d = 1; d <= 31; d++) {
        $('#day').append($('<option>', {value: d, text: d}));
    }
    for (var d = 0; d <= 23; d++) {
        $('#hour').append($('<option>', {value: d, text: d}));
    }
    for (var d = 0; d <= 59; d++) {
        $('#minute').append($('<option>', {value: d, text: d}));
    }
    $('#year').val(now.year()).prop('selected', true);
    $('#month').val(now.month() + 1).prop('selected', true);
    $('#day').val(now.date()).prop('selected', true);
});
