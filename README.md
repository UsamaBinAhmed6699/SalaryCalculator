# SalaryCalculatorApp

This project is created to to calculate the Salary based on the given tax slabs .Project is also serve as a boiler plate for the new project and its a ready to go client side implementation.

##Project Description
Salary Calculator App project is created to calculate the salary based on some business rules provided as requirement by Adfenix team . The project is created, keeping in mind that is should provide a scalable architecture with high level of separation of concerns between the components and modules . Mainly there are three folders created :-
Core (Conatin the core parts of the project required during implementation of scalable project)
Shared (Conatins th components which are being shared and used between the other components )
Features (Comprises of all the functionality requirements of the applciation)
Multiple JSON files are added for business rules to make the rules configurable and calculations are performed based on those rules.

## Multilingual 
Multiple languages are supported in the application . For now only two languages are added (English and Swedish) .

## Tools and Technologies
The Project is created using Angular version 14 (14.1.0) .
The IDE used to create the application is VS Code.
Packages used are 
-Angular Material Components 
-Bootstrap  
-ngx-translate

## How to Install and Run the Project
Open the project in VS Code or any supporting IDE , run the following commands 
$npm install
$ng build
$ng server

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.


## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests
Multiple Unit tests are added specifically to calculator component . Testablity is taken under consideration during the project implementation . 
Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).


