package com.exampleProject.exampleProject.services;

import com.exampleProject.exampleProject.Repository.UserRepository;
import com.exampleProject.exampleProject.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class UserServices {

    @Autowired
    private UserRepository userRepository;

    public User createNewUser(User user){
        try{
            User newUser = userRepository.save(user);
            return newUser;
        }catch(RuntimeException e){
            throw new RuntimeException("Some error occurred :"+e.getMessage());
        }
    }

    public List<User> getAllUsers(){
        try{
            List<User> UserList = userRepository.findAll();
            return UserList;
        }catch (RuntimeException e){
            throw new RuntimeException("Some error  occurred :"+e.getMessage());
        }
    }

    public User getUserByNameAndDob(String name, LocalDate dob){
        try{
            Optional<User> user = userRepository.findByNameAndDob(name, dob);
            if(user.isPresent()){
                return user.get();
            }else{
                throw new RuntimeException("User not found");
            }
        }catch(RuntimeException e){
            throw new RuntimeException("Somme error occurred :"+e.getMessage());
        }
    }


    public User updateUserByNameAndDobService(String name, LocalDate dob, User updatedUser){
        try{
            User existingUser  = getUserByNameAndDob(name, dob);
            if(updatedUser.getName() != null){
                existingUser.setName(updatedUser.getName());
            }
            if(updatedUser.getDob() != null){
                existingUser.setDob(updatedUser.getDob());
            }
            if(updatedUser.getDoj() != null){
                existingUser.setDoj(updatedUser.getDoj());
            }
            if(updatedUser.getMobile() != null){
                existingUser.setMobile(updatedUser.getMobile());
            }
            if(updatedUser.getAddress() != null){
                existingUser.setAddress(updatedUser.getAddress());
            }
            if(updatedUser.getAge() != 0){
                existingUser.setAge(updatedUser.getAge());
            }
            if(updatedUser.getCity() != null){
                existingUser.setCity(updatedUser.getCity());
            }
            if(updatedUser.getState() != null){
                existingUser.setState(updatedUser.getState());
            }
            if(updatedUser.getCountry() != null){
                existingUser.setCountry(updatedUser.getCountry());
            }

            return userRepository.save(existingUser);

        }catch(RuntimeException e){
            throw new RuntimeException("Error in updating the User: "+e.getMessage());
        }
    }

    public void deleteUserByNameAndDobService(String name, LocalDate dob){
        try{
            getUserByNameAndDob(name, dob);
            userRepository.deleteByNameAndDob(name, dob);
        }catch(RuntimeException e){
            throw new RuntimeException("Error in deleting the User : "+e.getMessage());
        }
    }



}
