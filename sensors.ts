namespace Plant {    

	//BH1750
	pins.i2cWriteNumber(35, 0x10, NumberFormat.UInt8BE)
	
    let light_variable = 0
    let temperature_variable = 0
	let pressure_variable = 0
	let altitude_variable = 0
	let humidity_variable = 0
	let soilMoisture_variable = 0
	
    // -------------- 1. Initialization ----------------
    //%blockId=initialize
    //%block="Initialize SMARTHON DATA LOGGER"
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
	
	/**
     * get ambient light data (lx)
     */
    //% blockId="smarthon_get_light" 
    //% block="Get light intensity (Lx)"
    //% weight=80
	//% blockGap=7		

    export function getLight(): number {
        return Math.idiv(pins.i2cReadNumber(35, NumberFormat.UInt16BE) * 5, 6)
    }

    //% blockId="smarthon_get_temperature" 
    //% block="Get temperature (°C)"
    //% weight=79
	//% blockGap=7	

    export function getTemperature(): number {
        return temperature_variable;
    }
	
	//% blockId="smarthon_get_pressure" 
    //% block="Get pressure (hPa)"
    //% weight=78	
	//% blockGap=7	

    export function getPressure(): number {
        return pressure_variable;
    }

	//% blockId="smarthon_get_altitude" 
    //% block="Get altitude (m)"
    //% weight=77	
	//% blockGap=7	

    export function getAltitude(): number {
        return altitude_variable;
    }
	
	//% blockId="smarthon_get_humidity" 
    //% block="Get humidity"
    //% weight=76	
	//% blockGap=7	

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
    //% weight=74	
	//% blockGap=7	
	
    export function TurnUSB(intensity: number): void {
			
		pins.analogWritePin(AnalogPin.P16, intensity);
    }
	
	//% blockId="smarthon_waterpump"
    //% block="Set Water pump to intensity %intensity"
    //% intensity.min=0 intensity.max=1023
    //% weight=73
	//% blockGap=7	
	
    export function TurnWaterpump(intensity: number): void {
			
		pins.analogWritePin(AnalogPin.P1, intensity);
    }
	
	//% blockId="smarthon_humdifier"
    //% block="Set Humdifier to intensity %intensity"
    //% intensity.min=0 intensity.max=1023
    //% weight=72	
	//% blockGap=7	
	
    export function TurnHumdifier(intensity: number): void {
			
		pins.analogWritePin(AnalogPin.P15, intensity);
    }
	
		
	//% blockId="smarthon_plantmotorfan_cw"
    //% block="Set Motor fan clockwisely to intensity %intensity"
    //% intensity.min=0 intensity.max=1023
    //% weight=71	
	//% blockGap=7	
	
    export function TurnMotorCW(intensity: number): void {
			
		pins.analogWritePin(AnalogPin.P13, intensity);
    }
	
	//% blockId="smarthon_plantmotorfan_acw"
    //% block="Set Motor fan anti-clockwisely to intensity %intensity"
    //% intensity.min=0 intensity.max=1023
    //% weight=70
	//% blockGap=7	
	
    export function TurnMotorACW(intensity: number): void {
			
		pins.analogWritePin(AnalogPin.P14, intensity);
    }
	
	//% blockId="smarthon_plantservo"
    //% block="Set Servo to degree %degree"
    //% intensity.min=0 intensity.max=180
    //% weight=69	
	
    export function TurnServo(intensity: number): void {
			
		pins.servoWritePin(AnalogPin.P2, intensity)
    }
	
	// -------------- 1. WiFi ----------------
    //% blockId=smarthon_set_wifi
	//% block="Set wifi to ssid %ssid| pwd %pwd"   
	//% weight=45
	//%subcategory=More	
    export function setWifi(ssid: string, pwd: string): void {
        serial.writeLine("(AT+wifi?ssid="+ssid+"&pwd="+pwd+")"); 
    }

	// -------------- 2. Cloud ----------------
    //% blockId=smarthon_set_thingspeak
	//% block="Send Thingspeak key* %key|field1 %field1|field2 %field2|field3 %field3"
	//% weight=44
	//% blockGap=7
	//%subcategory=More
    export function sendThingspeak(key: string, field1: number, field2: number, field3: number): void {
        serial.writeLine("(AT+thingspeak?key=" + key+"&field1="+field1+"&field2="+field2+"&field3="+field3+")"); 
    }
	
	// -------------- 3. Connect Azure Cloud ----------------
    //% blockId=smarthon_connect_azure
	//% block="Connect Microsoft Azure IoT Central Scope ID %scopeid|Device ID %deviceid|Primary Key %primarykey"
	//% weight=43
	//% blockGap=7
	//%subcategory=More
    export function connectAzure(scopeid: string, deviceid: string, primarykey: string): void {
        serial.writeLine("(AT+connectAzure?scopeid=" + scopeid+"&deviceid="+deviceid+"&primarykey="+primarykey+")"); 
    }
	
	// -------------- 4. Upload data to Azure Cloud ----------------
    //% blockId=smarthon_upload_azure
	//% block="Upload data to Microsoft Azure IoT Central field1 %field1|field2 %field2|field3 %field3|field4 %field4|field5 %field5"
	//% weight=42
	//% blockGap=7
	//%subcategory=More
    export function uploadDataAzure(field1: number, field2: number, field3: number, field4: number, field5: number): void {
        serial.writeLine("(AT+uploadAzure?field1=" + field1+"&field2="+field2+"&field3="+field3+"&field4="+field4+"&field5="+field5+")"); 
    }
	

}