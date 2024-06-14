/* 
public class App {
   void display(){

    System.out.print("This is a demo program from display method.");
   }

public static void main(String[] args){
        
    System.out.print("This is a demo program from main method.");
    App obj= new App();
    
}
}

import java.util.Scanner;  
public class App {   
      public static void main(String[] args) 
      {       
          Scanner input = new Scanner(System.in);    
                        System.out.print("Enter the length of the rectangle: ");     
                            double length = input.nextDouble();             
                                 System.out.print("Enter the breadth of the rectangle: ");    
                                      double breadth = input.nextDouble();             
                                           double area = length * breadth;        
                                            double perimeter = 2 * (length + breadth);     
                                                         System.out.println("Area of the rectangle is: " + area);    
                                                              System.out.println("Perimeter of the rectangle is: " + perimeter);
                                                              input.close();

      }
    }

import java.util.Scanner;

class Main {
  public static void main(String[] args) {

    // create an object of Scanner class
    Scanner input = new Scanner(System.in);

    // take input from users
    System.out.print("Enter the principal: ");
    double principal = input.nextDouble();

    System.out.print("Enter the rate: ");
    double rate = input.nextDouble();

    System.out.print("Enter the time: ");
    double time = input.nextDouble();

    double interest = (principal * time * rate) / 100;

    
    System.out.println("Simple Interest: " + interest);

    input.close();
  }
}

import java.util.Scanner;

public class App{

   int a,b,s;

   App(){

       Scanner sc=new Scanner(System.in);

       System.out.print("Enter first number: ");

       a=sc.nextInt();

       System.out.print("Enter second number: ");

       b=sc.nextInt();

       sc.close();

   }

   void add(){

       s=a+b;

   }

   void display(){

       System.out.println("Sum of two numbers: "+s);

   }

   public static void main(String s[]){

       App obj=new App();

       obj.add();

       obj.display();

   }

}

import java.util.Scanner;

public class App {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.print("Enter your age: ");
        try {
            int age = scanner.nextInt();
            if (age < 18) {
                
                System.out.println("You are not eligible to vote.");
            } else {
                System.out.println("You are eligible to vote.");
            }
            // Close scanner only if age was successfully read
            scanner.close();
        } catch (Exception e) {
            System.out.println("Invalid input. Please enter a valid age as a number.");
        }
    }
}

// Java Program to Use catch to handle the exception

// Importing generic Classes/Files

import java.util.Scanner;



public class App {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.print("Enter your age: ");
        try {
            int age = scanner.nextInt();


			// Using nextInt function to read integer
			
			if (age <= 18) {
				MyException me = new MyException();
                scanner.close();
				throw me;
				// If age is less than equal to 18 then the
				// object of MyException class will be throw
				// here
			}
			else

			// If age is greater than 18 i.e no exception is
			// there then try block will execute
			{
				
				System.out.println("Eligible age as it is:" + age);
			}
            
		}
		catch (MyException e)
		// If the exception will occur then the object that
		// throw in the try block will be copied in to this
		// object
		{
			System.out.println(e);
		}
       
	}
}
// User defined MyException class
class MyException extends RuntimeException {
	public String toString()
	{
		// toString method will get Override here
		return "Age must be greater than 18";
	}
}

class App extends Exception  
{  
    public App (String str)  
    {  
        // calling the constructor of parent Exception  
        super(str);  
    }  
}  
    
// class that uses custom exception InvalidAgeException  
public class TestCustomException1  
{  
  
    // method to check the age  
    static void validate (int age) throws App{    
       if(age < 18){  
  
        // throw an object of user defined exception  
        throw new App("age is not valid to vote");    
    }  
       else {   
        System.out.println("welcome to vote");   
        }   
     }    
  
    // main method  
    public static void main(String args[])  
    {  
        try  
        {  
            // calling the method   
            validate(13);  
        }  
        catch (App ex)  
        {  
            System.out.println("Caught the exception");  
    
            // printing the message from InvalidAgeException object  
            System.out.println("Exception occured: " + ex);  
        }  
  
        System.out.println("rest of the code...");    
    }  
}  

import java.util.Scanner;

public class  App{
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        try {
            System.out.print("Enter your age: ");
            int age = scanner.nextInt();
            checkEligibility(age);
        } catch (AgeInputException e) {
            System.out.println("Invalid input: " + e.getMessage());
        } finally {
            if (scanner != null) {
                scanner.close();
            }
        }
    }

    public static void checkEligibility(int age) throws AgeInputException {
        if (age < 0) {
            throw new AgeInputException("Age cannot be negative.");
        } else if (age < 18) {
            throw new AgeInputException("You are not eligible to vote.");
        } else {
            System.out.println("You are eligible to vote.");
        }
    }
}

class AgeInputException extends Exception {
    public AgeInputException(String message) {
        super(message);
    }
}
*/
// Java program to Demonstrate Polymorphism 

// This class will contain 
// 3 methods with same name, 
// yet the program will 
// compile & run successfully 
import java.util.Scanner;
public class App { 

	// Overloaded sum(). 
	// This sum takes two int parameters 
	public int sum(int x, int y) 
	{ 
		return (x + y); 
	} 

	// Overloaded sum(). 
	// This sum takes three int parameters 
	public int sum(int x, int y, int z) 
	{ 
		return (x + y + z); 
	} 

	// Overloaded sum(). 
	// This sum takes two double parameters 
	public double sum(double x, double y) 
	{ 
		return (x + y); 
	} 

	// Driver code 
	public static void main(String args[]) 
	{ 
		App s = new App(); 
		System.out.println(s.sum(10, 20)); 
		System.out.println(s.sum(10, 20, 30)); 
		System.out.println(s.sum(10.5, 20.5)); 
	} 
} 
