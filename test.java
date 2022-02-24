import java.util.*;
// import java.util.jar.Attributes.Name;

class test {
    abstract class Holder{
        abstract void viewQuote();
    }
    abstract class Broker extends Holder{
        abstract void getQuote();
    }
    abstract class Exchange extends Broker{
        abstract void setQuote();
    }

    class Stock extends Exchange {
        void viewQuote() {
            System.out.println("view quote");
        }

        void getQuote() {
            System.out.println("get quote");
        }

        void setQuote() {
            System.out.println("get quote");
        }
    }
    
    public static void main(String[] args) {
        Exchange n = new Stock();
    }
}