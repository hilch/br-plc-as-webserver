(********************************************************************
 * COPYRIGHT -- Bernecker + Rainer
 ********************************************************************
 * Package: WebServer
 * File: WebServer.typ
 * Author: hilchenbachc
 * Created: February 02, 2015
 ********************************************************************
 * Data types of package WebServer
 ********************************************************************)

TYPE
	WebPVCyclicTyp : 	STRUCT 
		currentTime : UDINT;
	END_STRUCT;
	WebPVTyp : 	STRUCT 
		cyclic : WebPVCyclicTyp;
		test1 : REAL;
		test2 : REAL;
		bool1 : BOOL;
		bool2 : BOOL;
		range1 : REAL;
		btnPlus : BOOL;
		btnMinus : BOOL;
		array : ARRAY[0..19]OF REAL;
	END_STRUCT;
END_TYPE
