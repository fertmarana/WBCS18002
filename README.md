# WBCS18002
Official repository for the WBCS18002 Web Engineering Project.

## Report

The report is the file Report.md with the overview of the Web app.

## Useful Links:
Here's a list of useful links regarding the API so far.

[Interactive API Docs](http://trvl.hopto.org:8000/docs/)

[DRF Browsable API](http://trvl.hopto.org:8000/api/)

Web App is Local.

## Group 26

# Case Study Description
The Web app to be developed helps users to decide which carriers (airlines) and
which airports to use in the USA for their air travel needs. It builds on the
Airline delays dataset made available by the CORGIS dataset project, itself a
curated version of the data published by the Bureau of Transporation Statistics
of the US Government. Both a JSON and a CSV version of the dataset are
available. It contains statistics for all reported delays per carrier per airport per month in the USA from 2003 to 2016
The goal of this project is to deliver to users both basic and advanced features
based on this dataset as a Web app. It comes with a minimum set of
requirements on what features are to be delivered, and fosters creativity on the
app developer side by allowing for identification of further features proposed
and implemented by each group.

# API Documentation

# Introduction
 This documentation describes each API call possibilities following the template bellow (author: https://gist.github.com/iros/3426278).

## Template

**Title**
----
  <_Additional information about your API call. Try to use verbs that match both request type (fetching vs modifying) and plurality (one vs multiple)._>

* **URL**

  <_The URL Structure (path only, no root url)_>

* **Method:**
  
  <_The request type_>

  `GET` | `POST` | `DELETE` | `PUT`
  
*  **URL Params**

   <_If URL params exist, specify them in accordance with name mentioned in URL section. Separate into optional and required. Document data constraints._> 

   **Required:**
 
   `id=[string(unique)]`

   **Optional:**
 
   `photo_id=[alphanumeric]`

* **Data Params**

  <_If making a post request, what should the body payload look like? URL Params rules apply here too._>

* **Success Response:**
  
  <_What should the status code be on success and is there any returned data? This is useful when people need to to know what their callbacks should expect!_>

  * **Code:** 200 <br />
    **Content:** `{ id : 12 }`
 
* **Error Response:**

  <_Most endpoints will have many ways they can fail. From unauthorized access, to wrongful parameters etc. All of those should be liste d here. It might seem repetitive, but it helps prevent assumptions from being made where they should be._>

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "Log in" }`

  OR

  * **Code:** 422 UNPROCESSABLE ENTRY <br />
    **Content:** `{ error : "Email Invalid" }`

* **Sample Call:**

  <_Just a sample call to your endpoint in a runnable format ($.ajax call or a curl request) - this makes life easier and more predictable._> 

* **Notes:**

  <_This is where all uncertainties, commentary, discussion etc. can go. I recommend timestamping and identifying oneself when leaving comments here._> 

# API 

**Airports**
----
  Returns json/csv list of **All airports available in the USA** codes,names and links to the available airports in the USA.

* **URL**

  `/airports`

* **Method:**
  
  `GET`
       
* **Success Response:**
  
  * **Code:** 200 <br />
    **Content:** 
      
      ```javascript
        [
          {
              "airport": {
                  "code": "PHL",
                  "name": "Philadelphia, PA: Philadelphia International",
                  "url": "/airports/PHL"
              },
          {
              "airport": {
                  "code": "AHR",
                  "name": "American Hour Rapid",
                  "url": "/airports/AHR"
          }
          .
          .
          .
        ]
    ```
   
 
* **Error Response:**
  * **Code:** 404 NOT FOUND  <br />
    **Content:** `{ error : "Invalid date" }`

  * **Code:** 422 UNPROCESSABLE ENTRY <br />
    **Content:** `{ error : "Invalid date format" }`
  
  * **Code:** 405 METHOD NOT ALLOWED <br />
    **Content:** `{ error : "Invalid method" }`
  

* **Sample Call:**

  ```curl -H "Accept: application/json" 'http://server/airports```
  
  ```javascript
    $.ajax({
      url: "/airports",
      type : "GET",
      dataType: "csv",
      success : function(r) {
        console.log(r);
      }
    });
  ```
* **Notes:**

  * User should also use the Accept header for specifying the extension of the response (json or csv). The default is json.
  
**Carriers**
----
  Returns json/csv list **all carriers operating in US airports** codes, names and links to the available.

* **URL**

  `/carriers`

* **Method:**
  
  `GET`
      
* **Success Response:**
  
  * **Code:** 200 <br />
    **Content:** 
      
      ```javascript
      [
        {
        "carrier": {
            "code": "AA",
            "name": "American Airlines Inc.",
	          "url": "/carriers/AA"
        },
        {
         "carrier": {
            "code": "AS",
            "name": "Alaska Airlines Inc.",
   	        "url": "/carriers/AS"
        },
        .
        .
        .
      ]
    ```
    

* **Error Response:**
  * **Code:** 404 NOT FOUND  <br />
    **Content:** `{ error : "Invalid date" }`

  * **Code:** 422 UNPROCESSABLE ENTRY <br />
    **Content:** `{ error : "Invalid date format" }`
  
  * **Code:** 405 METHOD NOT ALLOWED <br />
    **Content:** `{ error : "Invalid method" }`
  

* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/carriers",
      type : "GET",
      dataType: 'csv'
      success : function(r) {
        console.log(r);
      }
    });
  ```
* **Notes:**
  * User should also use the Accept header for specifying the extension of the response (json or csv). The default is json.



**Specific Airport Informations**
----
  Returns **all links to the carriers operating at a specific airport**, a link to the related statistics for each carrier and also a link to the airport routes. 

* **URL**

`/airports/:id`


* **Method:**

`GET`
  
*  **URL Params**

   **Required:**
 
   `id=[code(ex: ATL)]`

* **Success Response:**

  ```javascript
  {
      "airport": {
        "code": "PHL",
        "name": "Philadelphia, PA: Philadelphia International",
        "url": "/airports/PHL"
      },
      "routes_link": "/airports/PHL/routes",
      "carriers": [
          {
            "code":
            "url": "/carriers/AA?airport_id=PHL",
            "statistics_url":"/carriers/AA/statistics?airport=PHL&statistics='minimal'"
          },
          .
          .
          .
        ]
  }
  ```


* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Invalid id" }`

  * **Code:** 405 METHOD NOT ALLOWED <br />
    **Content:** `{ error : "Invalid method" }`

* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/airports/:id",
      type : "GET",
      success : function(r) {
        console.log(r);
      }
    });
  ```


 **Specific Carrier Information**
----
  Returns **all links to the airports operating at a specific cairrier**, a link to the related statistics for each airport. 


* **URL**

  `/carriers/:id`

* **Method:**
  
  `GET`
  
*  **URL Params**

   **Required:** 
   
   `id=[string(unique)]`
    
* **Success Response:**
  
  * **Code:** 200 <br />
    **Content:** 
    

 If JSON  
 ```javascript

  {
    "carrier": {
      "code": "AR",
      "name": "American Airlines Inc.",
      "url": "/carriers/AR",
    }
  }  
```

* **Error Response:**
  * **Code:** 404 NOT FOUND  <br />
    **Content:** `{ error : "Invalid date" } { error : "Airport not found"}`

  * **Code:** 422 UNPROCESSABLE ENTRY <br />
    **Content:** `{ error : "Invalid date format" }`
  
  * **Code:** 405 METHOD NOT ALLOWED <br />
    **Content:** `{ error : "Invalid method" }`
  

* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/carriers/:id",
      type : "GET",
      success : function(r) {
        console.log(r);
      }
    });
  ```



**Statistics**
----
  Manipulates json or csv of **all statistics** in the current database.
  **This endpoint is used to feed data to the database.**

* **URL**

`/statistics`

* **Method:**
  `GET`| `POST` | `DELETE` | `PUT`
  
*  **URL Params**

   **Required for GET, DELETE, PUT:**
   
   `id=[string(unique)]`
   

* **Data Params**
		
	```javascript
    {
        "airport": "SEA",
        "carrier": "AA",
        "month": 1,
        "year": 2000,
        "flight": {
            "id": 42,
            "cancelled": 1,
            "on_time": 1,
            "total": 1,
            "delayed": 1,
            "diverted": 1
        },
        "delay_time": {
            "id": 15,
            "late_aircraft": 1,
            "weather": 1,
            "security": 1,
            "national_aviation_system": 1,
            "carrier": 1
        },
        "delay_count": {
            "id": 14,
            "late_aircraft": 11,
            "weather": 11,
            "security": 11,
            "national_aviation_system": 11,
            "carrier": 11
        }
    }  
  ```
    

* **Success Response:**
  
  * **Code:** 200 <br />
    **Content:** 
    
    If JSON:
	```javascript
      {
          "url": "http://localhost:8000/api/statistics/13/",
          "airport": "SEA",
          "carrier": "AA",
          "month": 1,
          "year": 2000,
          "flight": {
              "id": 42,
              "cancelled": 1,
              "on_time": 1,
              "total": 1,
              "delayed": 1,
              "diverted": 1
          },
          "delay_time": {
              "id": 15,
              "late_aircraft": 1,
              "weather": 1,
              "security": 1,
              "national_aviation_system": 1,
              "carrier": 1
          },
          "delay_count": {
              "id": 14,
              "late_aircraft": 11,
              "weather": 11,
              "security": 11,
              "national_aviation_system": 11,
              "carrier": 11
          }
      }
    ```	   
 
* **Error Response:**
  
  * **Code:** 404 NOT FOUND  <br />
    **Content:** `{ error : "Airport not found" }
    { error : "Carrier not found" }`

  * **Code:** 422 UNPROCESSABLE ENTRY <br />
    **Content:** `{ error : "Invalid statistics type" }`
	
   * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : "Invalid data in POST/PUT" }`


* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/statistics/192",
      type : "GET",
      dataType: "csv",
      success : function(r) {
        console.log(r);
      }
    });
  ```

* **Notes:**

  The /statistics endpoint is specific for database feeding purposes if you want specific/friendly statistics about specific aiports and carriers please check the endpoint below.


**Carrier Statistics**
----
  Returns json or csv of **all statistics about flights of a carrier from/to a US airport**,**number of on-time, delayed, and cancelled flights of a carrier from/to a US airport**, **number of minutes of delay per carrier attributed to carrier-specific reasons/all reasons** for a given month or all months available. If no type are specified all the statistics are returned.

* **URL**

`/carriers/:id/statistics`
*list of possible querys*
`/carriers/:id/statistics?type=:type_name`
`/carriers/:id/statistics?airport=:airpot_id`
`/carriers/:id/statistics?month=:mm&year=:yyyy`
`/carriers/:id/statistics?type=:type_name&airport=:airpot_id&month=:mm&year=:yyyy`

* **Method:**
  `GET`| `POST` | `DELETE` | `PUT`
  
*  **URL Params**

   **Required:**
   
   `id=[string(unique)]`
   
    
   **Optional:**
   `carrier_id=[string(unique)]`

   `type_name=['flights'|'minimal'|'delay_minutes'|'delay_count']`

   `mm=[integer]`
   `yyyy=[integer]`
    

* **Success Response:**
  
  * **Code:** 200 <br />
    **Content:** 
    
    If JSON:
	```javascript
    "airport": {
        "code": "PHL",
        "name": "Philadelphia, PA: Philadelphia International",
        "url": "/airports/PHL"
    },
    "carrier": {
        "code": "AA",
        "name": "American Airlines Inc.",
        "id": 124,
        "url": "/carriers/124",
    },
    "flights_statistics": {
        "cancelled": 5,
        "on time": 561,
        "total": 752,
        "delayed": 186,
        "diverted": 0
        "url": "/carriers/:id/statistics?airport=PHL&month=6&year=2003"
    },
    "date": {
        "year": 2003,
        "month": 6
    }
    ```	   
 
* **Error Response:**
  
  * **Code:** 404 NOT FOUND  <br />
    **Content:** `{ error : "Airport not found" }
    { error : "Carrier not found" }`

  * **Code:** 422 UNPROCESSABLE ENTRY <br />
    **Content:** `{ error : "Invalid statistics type" }`


* **Sample Call:**

  ```curl -H "Accept: application/json" http://server//airports/123/statistics?carrier=1234&type='flights'```
  
  ```javascript
	$.ajax({
      type: 'GET',
      url: "/carriers/:id/statistics?airport=PHL&month=6&year=2003",
      dataType: "json",
      success: function(resultData) {}
	});
  ```
* **Notes:**

     If the user wishes to retrieve data from a specific airport or on specific month or attributed to carrier-specific reasons then he should pass the optional parameter data in the valid format.
  In this case, there would be a query on the URL such as the example below:

  ```/carriers/AR/statistics?airport_id=PHL&month=6&year=2003&reasons=all```



**Show airport routes.**
----
  Returns a json/csv response containing links to the routes that the specified airport does.

* **URL**
`/airports/:id/routes`

* **Method:**
  `GET`
  
*  **URL Params**

   **Required:**
   
   `id=[string(unique)]`
    
   **Optional:**
   
   `from=[month/year]`
   
   `to=[month/year]`  

* **Success Response:**
  
  * **Code:** 200 <br />
    **Content:** 
    
  
	```javascript
    "airport": {
        "code": "PHL",
        "name": "Philadelphia, PA: Philadelphia International",
        "id": 123,
        "url": "/airports/123"
    },
    "routes": [{
          "code": "AHR",
	        "name": "American Hour Rapid",
	        "destination_url": "/airports/133",
	        "route": "/airports/123/routes?destination=133&from=from&to=to"
        },
	],
    ```   
 
* **Error Response:**
  
  * **Code:** 404 NOT FOUND  <br />
    **Content:** `{ error : "Airport not found"}` 
  * **Code:** 422 UNPROCESSABLE ENTRY <br />
    **Content:** `{ error : "Invalid date" }`

* **Sample Call:**

  ```curl -H "Accept: application/json" http://server//airports/123/routes```
  
  ```javascript
      $.ajax({
      	url: "/airports/123/routes,
      	type : "GET",
      	dataType: "csv",
      	success : function(r) {
        	console.log(r);
      	}
    	});
  ```
* **Notes:**

   * User also should use the Accept header for specifying the extension of the response (json or csv) the default is json.
   
 

**Show route between two airports**
----
  Returns **descriptive statistics (mean, median, standard deviation) for carrier-specific delays (as above) for a flight between any two airports in the USA for a specific carrier or for all carriers serving this route**.
  
* **URL**

`/airports/:id/routes?destination=:airport_id`
or
`/airports/:id/routes?destination=:airport_id&carrier=:carrier_id`

* **Method:**

`GET`
  
*  **URL Params**

   **Required:**
 
   `id=[string(unique)]`
   
    `airport_id=[string(unique)]`

   **Optional:**
 
   `carrier_id=[string(unique)]`

* **Success Response:**
  
  If JSON and All Carriers:
      
```javascript  
{
    "airport": {
        "code": "PHL",
        "name": "Philadelphia, PA: Philadelphia International",
        "id": 123,
        "link": "/airports/123"
    },
    "destination": {
        "code": "AHR",
        "name": "American Hour Rapid",
        "id": 125,
        "url": "/airports/125"
    },
    "route": "/airports/125/routes?destination=125",
    "root_url": "/airports/123/routes",
    "carriers": [{
            "code": "AA",
            "name": "American Airlines Inc.",
            "id": 124,
            "url": "/carriers/124",
            "route": "/airports/125/routes?destination=125&carrier=124",
            "statistics": {
                "url": "/airports/123/statistics?carrier=124&type='flights'&minimal=true",
                "# of delays": {
                    "late aircraft": {
                        "mean": 18,
                        "median": 17,
                        "standard_deviation": 3
                    },
                    "carrier": {
                        "mean": 34,
                        "median": 32,
                        "standard_deviation": 5
                    }
                },
                "minutes delayed": {
                    "late aircraft": {
                        "mean": 1269,
                        "median": 1200,
                        "standard_deviation": 100
                    },
                    "carrier": {
                        "mean": 1367,
                        "median": 1300,
                        "standard_deviation": 150
                    }
                },
            }
        },
        .
        .
        .
    ]
}
```

* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Invalid id" }`

  * **Code:** 405 METHOD NOT ALLOWED <br />
    **Content:** `{ error : "Invalid method" }`

* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/airports/:id/routes?destination=:airport_id&carrier=:carrier_id",
      dataType: "json",
      type : "GET",
      success : function(r) {
        console.log(r);
      }
    });
  ```
* **Notes:**
	* If no carrier is specified then the information about all carriers related to the routes are returned else only information about the specific carrier are returned.
