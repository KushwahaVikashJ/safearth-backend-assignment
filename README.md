# PhoneBook
Operations User can perform  
  - Add a contact 
  - Remove a contact 
  - Update a contact 
  - Search contact 
    - By name

For jsonPrivateKey do the following in terminal
  - export phonebookKey=(whatever key user want to provide as a digital signature)

API Documentation
  
  1. For Creating Users:
     - POST http://localhost:3000/user
     
  2. For Login
     - POST http://localhost:3000/auth
     
  3. For Contacts (CRUD)
     - GET    http://localhost:3000/phonebook       (To get all the contacts)
     - GET    http://localhost:3000/phonebook/:name (To get the contact of a specified name)
     - POST   http://localhost:3000/phonebook       (To create a contact)
     - PUT    http://localhost:3000/phonebook/:name (To update a specified contact)
     - DELETE http://localhost:3000/phonebook/:name (To delete a specified contact)
     
  
