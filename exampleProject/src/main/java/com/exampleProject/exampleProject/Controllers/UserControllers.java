package com.exampleProject.exampleProject.Controllers;

import com.exampleProject.exampleProject.models.User;
import com.exampleProject.exampleProject.services.UserServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:5173")
public class UserControllers {

    @GetMapping("/health")
    public String healthCheck(){
        return "OK";
    }

    @Autowired
    private UserServices userServices;

    @GetMapping
    public ResponseEntity<?> getAllUsersController(){
        try{
            List<User> listOFEmployees = userServices.getAllUsers();
            return ResponseEntity.status(HttpStatus.OK).body(listOFEmployees);
        }catch(RuntimeException e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Unable to get the employees list"+e.getMessage());
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal server error");
        }
    }

    @GetMapping("/{name}/{dob}")
    public ResponseEntity<?> getEmployeeById(@PathVariable String name, @PathVariable LocalDate dob){
        try{
            User employee = userServices.getUserByNameAndDob(name, dob);
            return ResponseEntity.status(HttpStatus.OK).body(employee);
        }catch(RuntimeException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal server error");
        }
    }

    @PostMapping
    public User saveNewUserController(@RequestBody User user){
        return userServices.createNewUser(user);
    }

    @PutMapping("/{name}/{dob}")
    public ResponseEntity<?> updateUser(@RequestBody User user, @PathVariable String name, @PathVariable LocalDate dob){
        try{
            User us = userServices.updateUserByNameAndDobService(name, dob, user);
            return ResponseEntity.status(HttpStatus.OK).body(us);
        }catch(RuntimeException e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal server error");
        }
    }

    @DeleteMapping("/{name}/{dob}")
    public ResponseEntity<String> deleteUser(@PathVariable String name, @PathVariable LocalDate dob){
        try{
            userServices.deleteUserByNameAndDobService(name, dob);
            return ResponseEntity.status(HttpStatus.OK).body("Deleted thee employee:");
        }catch(RuntimeException e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Inetrnal server error");
        }
    }
}
