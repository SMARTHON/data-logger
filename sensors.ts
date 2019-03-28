namespace Plant {    
    let light_variable = 0
    let temperature_variable = 0
	let pressure_variable = 0
	let altitude_variable = 0
	let humidity_variable = 0
	let soilMoisture_variable = 0
	
    // -------------- 1. Initialization ----------------
    //%blockId=initialize
    //%block="Initialize Smarthon multiple-sensor"
    //% weight=90	
    export function initializeWifi(): void {
        serial.redirect(SerialPin.P8, SerialPin.P12, BaudRate.BaudRate9600);

        serial.onDataReceived(serial.delimiters(Delimiters.NewLine), () => {
            let temp = serial.readLine()

            if (temp.charAt(0).compare("L") == 0) {

                light_variable = parseInt(temp.substr(1, temp.length-2))

            } else if (temp.charAt(0).compare("T") == 0) {

                temperature_variable = parseInt(temp.substr(1, temp.length-2))

            } else if (temp.charAt(0).compare("P") == 0) {

                pressure_variable = parseInt(temp.substr(1, temp.length-2))

            } else if (temp.charAt(0).compare("A") == 0) {

                altitude_variable = parseInt(temp.substr(1, temp.length-2))

            } else if (temp.charAt(0).compare("H") == 0) {

                humidity_variable = parseInt(temp.substr(1, temp.length-2))

            } else if (temp.charAt(0).compare("S") == 0) {

                soilMoisture_variable = parseInt(temp.substr(1, temp.length-2))

            } else {
                basic.showString(temp)
            }
        })

        basic.pause(5000);
    }

    //% blockId="smarthon_get_light" 
    //% block="Get light (Lx)"
    //% weight=80	

    export function getLight(): number {
        return light_variable;
    }

    //% blockId="smarthon_get_temperature" 
    //% block="Get temperature (°C)"
    //% weight=79

    export function getTemperature(): number {
        return temperature_variable;
    }
	
	//% blockId="smarthon_get_pressure" 
    //% block="Get pressure (hPa)"
    //% weight=78	

    export function getPressure(): number {
        return pressure_variable;
    }

	//% blockId="smarthon_get_altitude" 
    //% block="Get altitude (m)"
    //% weight=77	

    export function getAltitude(): number {
        return altitude_variable;
    }
	
	//% blockId="smarthon_get_humidity" 
    //% block="Get humidity"
    //% weight=76	

    export function getHumidity(): number {
        return humidity_variable;
    }
	
	//% blockId="smarthon_get_soilmoisture" 
    //% block="Get soil moisture"
    //% weight=75	

    export function getSoilmoisture(): number {
        return soilMoisture_variable;
    }
	
	//% blockId="smarthon_usb"
    //% block="Set LED grow light to intensity %intensity"
    //% intensity.min=0 intensity.max=1023
    //% weight=50	
	//%subcategory=More
	//% blockGap=7	
	
    export function TurnUSB(intensity: number): void {
			
		pins.analogWritePin(AnalogPin.P16, intensity);
    }
	
	//% blockId="smarthon_waterpump"
    //% block="Set Water pump to intensity %intensity"
    //% intensity.min=0 intensity.max=1023
    //% weight=49
	//%subcategory=More
	//% blockGap=7	
	
    export function TurnWaterpump(intensity: number): void {
			
		pins.analogWritePin(AnalogPin.P1, intensity);
    }
	
	//% blockId="smarthon_humdifier"
    //% block="Set Humdifier to intensity %intensity"
    //% intensity.min=0 intensity.max=1023
    //% weight=48	
	//%subcategory=More
	//% blockGap=7	
	
    export function TurnHumdifier(intensity: number): void {
			
		pins.analogWritePin(AnalogPin.P15, intensity);
    }
	
		
	//% blockId="smarthon_plantmotorfan_cw"
    //% block="Set Motor fan clockwisely to intensity %intensity"
    //% intensity.min=0 intensity.max=1023
    //% weight=47	
	//%subcategory=More
	//% blockGap=7	
	
    export function TurnMotorCW(intensity: number): void {
			
		pins.analogWritePin(AnalogPin.P13, intensity);
    }
	
	//% blockId="smarthon_plantmotorfan_acw"
    //% block="Set Motor fan anti-clockwisely to intensity %intensity"
    //% intensity.min=0 intensity.max=1023
    //% weight=46
	//%subcategory=More
	
    export function TurnMotorACW(intensity: number): void {
			
		pins.analogWritePin(AnalogPin.P14, intensity);
    }
	
	//% blockId="smarthon_plantservo"
    //% block="Set Servo to degree %degree"
    //% intensity.min=0 intensity.max=180
    //% weight=45	
	//%subcategory=More
	//% blockGap=7	
	
    export function TurnServo(intensity: number): void {
			
		pins.servoWritePin(AnalogPin.P2, intensity)
    }
	
			
	//% blockId="smarthon_plantled"
    //% block="Set LED to intensity %intensity"
    //% intensity.min=0 intensity.max=1023
    //% weight=44
	//%subcategory=More
	
    export function TurnLED(intensity: number): void {
			
		pins.analogWritePin(AnalogPin.P0, intensity);
    }

}