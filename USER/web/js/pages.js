


var pageHandling = function () {

	var refreshInterval,
	pvListFileName,
	pvNames,
        units,
	aspValueFileName,
	ajaxBusy,
	activeInputElement;

	/* wird vor dem Seitenwechsel aufgerufen */
	function pageBeforeShow(event, ui) {

		/* Umschaltung der ASP- Zugriffe */
		window.clearInterval(refreshInterval);
		pvListFileName = "";
		pvNames = new Array();
		aspValueFileName = "";
		ajaxBusy = false;

		var brtaglist = $(ui.toPage[0]).data("brpvlist");
		if (brtaglist !=
			undefined) {
			pvListFileName = brtaglist + ".json";
			/* Datei mit PV- Namen und
			Refreshzeit */
			aspValueFileName = brtaglist + ".asp";
			/* Datei mit ASP-
			Werten */
			$.getJSON(pvListFileName, function (data) {
				/* hole Tagnamen + Einheiten + Refreshzeit*/
				pvNames = data.pvars;
                                units = data.units;
                                //if (units == undefined ) { // es sind keine Einheiten angegeben
                                //  units = new Array();
                                //  for ( var i = 0; i < pvNames.length; ++i ) {
                                //    units[i] = "";
                                //  }
                                //}
				window.setInterval(refreshValues,
					data.refresh);
			});
		}

		stopBallAnimation();
		/* Canvas- Animation stoppen */

            switch (ui.toPage[0].id) {
               case "page1":
                  $("#browserInfo").html("<p>" + navigator.userAgent + "</p>" +
                     "<p>" + navigator.vendor + "</p>"
                  );
                  $.getJSON("client.asp", function(data)
                  {
                     $("#clientIPAddress").text( data.clientIP );
                  });   		  
               break;
            
               case "page2":
               break;
            
               case "page3":
               break;
            
               case "page4":
               initBallAnimation(); /* Canvas- Animation starten */
               break;
            
               case "page5":
                  
                    break;
            }
         }

	/* Initialisierungsroutine */
	function init() {

		$(document).on("pagecontainerbeforeshow", pageBeforeShow);
		$(document).on("pagecontainershow", pageShow);

		$(document).on("focus", "input[data-brpv]", "", inputFocus);
		/* delegated
		event */
		$(document).on("change", "input[data-brpv]", "", inputChange);
		/* delegated event */
		$(document).on("change", "select[data-brpv]", "",
			selectChange);
		/* delegated event */

		$(document).on("mousedown", "#btnMinus", function () {
			writePV("WebPV.btnMinus", 1);
		});

		$(document).on("mouseleave", "#btnMinus", function () {
			writePV("WebPV.btnMinus", 0);
		});

		$(document).on("mouseup", "#btnMinus", function () {
			writePV("WebPV.btnMinus", 0);
		});

		$(document).on("mousedown", "#btnPlus", function () {
			writePV("WebPV.btnPlus", 1);
		});

		$(document).on("mouseleave", "#btnPlus", function () {
			writePV("WebPV.btnPlus", 0);
		});

		$(document).on("mouseup", "#btnPlus", function () {
			writePV("WebPV.btnPlus", 0);
		});

		initNumpad();
	}

	/* Initialisiere Soft- Keyboard */
	function initNumpad() {
		var pvData,
		numpad,
		numpadEdit,
		field;

		$("#numpad").panel({
			open : function (event, ui) {
				numpadEdit = $("#numpadEdit");
				numpad = $("#numpad");
				field = $(activeInputElement);

				pvData = $(activeInputElement).data("brpv");
				numpadEdit.val(
					$(activeInputElement).val());
			}
		});

		function validate(value) {
			value = parseFloat(value);
			if (isNaN(value)) {
				value = 0.0;
			}

			if (value > pvData.max) {
				value = pvData.max;
			} else if (value < pvData.min) {
				value = pvData.min;
			}
			return value + "";
		}

		$("#numpad input[type=button]").on("mouseup",
			function () {
			if ($(this).hasClass("enterKey"))
				/* Enter */
			{
				var value = numpadEdit.val();
				field.val(value);
				writePV(
					pvData.pvname, parseFloat(value));
				numpad.panel("close");
			} else if ($(this).hasClass("cancelKey"))
				/* Abbruch */
			{
				numpad.panel("close");
			} else if ($(this).hasClass("digitKey"))
				/* Zifferneingabe */
			{
				var text = numpadEdit.val() + $(this).val();
				text =
					validate(text);
				numpadEdit.val(text);
			} else if ($(this).hasClass("alphaKey"))
				/* Zeicheneingabe */
			{
				var text = numpadEdit.val() + $(this).val();
				numpadEdit.val(
					text);
			} else if ($(this).hasClass("delKey"))
				/* loescht ein Zeichen von rechts */
			{
				var text = numpadEdit.val();
				text = validate(text.substring(
							0, text.length - 1));
				numpadEdit.val(text);
			} else if ($(this).hasClass("signChangeKey"))
				/* Vorzeichenwechsel */
			{
				var number = -parseFloat(numpadEdit.val());
				text =
					validate(number);
				fnumpadEdit.val(text);
			} else if ($(this).hasClass("commaKey"))
				/* Komma */
			{
				var text = numpadEdit.val();
				comma = text.indexOf(".");

				if (comma < 0)
					/* noch kein Komma ? */
				{
					text += '.';
					numpadEdit.val(text);
				}
			}
		});
	}

	/* wird aufgerufen, nachdem Seite sichtbar ist */
	function pageShow(event, ui) {
		refreshControls();
	}

	/* wird aufgerunfen, wenn <input>- Elemente den Focus bekommen */
	function inputFocus(e) {
		activeInputElement = document.activeElement;
		activeInputElement.blur();
		$("input").blur();
		$("#numpad").panel("open");

	}

	/* wird aufgerufen, wenn <input>- Elemente eine Wertaenderung melden */
	function inputChange(e) {
		var brpv = $(this).data("brpv");
		writePV(brpv.pvname, $(this).val());
	}

	/* wird aufgerufen, wenn <select>- Elemente eine Wertaenderung melden */
	function selectChange(e) {
		var brpv = $(this).data("brpv");
		writePV(brpv.pvname, $(this).val());
	}

	/* wird zyklisch augerufen, um Variablenwerte zu holen und zu verteilen */
	function refreshValues() {
		if (!ajaxBusy) {
			ajaxBusy = true;
			$.getJSON(aspValueFileName, function (data) {
				$("input[data-brpv]").filter(":visible").each(
					function (index, element) {
					var brpv = $(element).data("brpv");
					var i = pvNames.indexOf(brpv.pvname);
                                        if ( units != undefined ) {
                                          unit = units[i];
                                          if ( unit != "") {
                                            $(element).val(data[i] + " " + unit );
                                          }
                                          else
                                          {
                                            $(element).val(data[i]);
                                          }                                          
                                        }
                                        else
                                        {
                                          $(element).val(data[i]);
                                        }
					
				});

				ajaxBusy = false;
			});
		}
	}

	/* wird beim Seitenwechsel aufgerufen, um einmalig die Steuerelemente zu
	/* setzen */
	function refreshControls() {
		$.getJSON(aspValueFileName, function (data) {
			$("select[data-brpv]").each(function (index, element) {
				var brpv = $(element).data("brpv");
				var i =
					pvNames.indexOf(brpv.pvname);
				try {
					$(element).val(data[i]).flipswitch("refresh");
				} catch (e) {};
			});

		});
	}

	// PV schreiben
	function writePV(pv, value) {
		//$.post( "goform/ReadWrite", $.param({"redirect" : "/response.asp",
		//"variable" : pv, "value" : value, "write" : "1"}) );
		$.post("goform/ReadWrite", $.param({
				"redirect" : "index.html",
				"variable" : pv,
				"value" : value,
				"write" : "1"
			}), refreshValues);
	}

	return ({
		init : init
	})
}
();

//$( document ).on( "mobileinit", pageHandling.init );
$(document).ready(pageHandling.init);