(********************************************************************
 * COPYRIGHT -- Bernecker + Rainer
 ********************************************************************
 * Programm: webdata
 * Datei: webdata.st
 * Autor: hilchenbachc
 * Erstellt: 30. Januar 2015
 ********************************************************************
 * Implementierung des Programms webdata
 ********************************************************************)

PROGRAM _INIT

	DTGetTime_1.enable:=1;
	WebPV.test1 := 3.14;
	

END_PROGRAM


PROGRAM _CYCLIC
	(* aktuelle Uhrzeit *)
	DTGetTime_1();
	WebPV.cyclic.currentTime := DT_TO_UDINT(DTGetTime_1.DT1);
	

	WebPV.test2 := WebPV.test2 + 1.31;
	IF( WebPV.test2 > 100.0 ) THEN
		WebPV.test2 := -100;
	END_IF

	WebPV.array[0] := WebPV.array[0] + 1.422;
	
	FOR i:= 1 TO 19 DO
		WebPV.array[i] := WebPV.array[0] * i*2.1;
	END_FOR	

END_PROGRAM

