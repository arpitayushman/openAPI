import java.util.*;

class test {
    // public static void main(String[] args) {
    // Scanner scn = new Scanner(System.in);
    // int n = scn.nextInt();
    // int[] arr = new int[n];
    // for (int i = 0; i < n; i++)arr[i] = scn.nextInt();

    // String ans[] = new String[n];
    // for (int i = 0; i < ans.length; i++) {
    // String a = dtob(arr[i]) + "";
    // a = a.replaceAll("0", "2");
    // a = a.replaceAll("1", "0");
    // a = a.replaceAll("2", "1");
    // ans[i] = a;
    // }
    // for(int i = 0;i<ans.length;i++){
    // int a = btod(Integer.parseInt(ans[i]));
    // System.out.print(a+" ");
    // }

    // System.out.println(nun(5));
    // }

    // public static void main(String[] args) {

    // Scanner scn = new Scanner(System.in);
    // String line = scn.nextLine();
    // int n = scn.nextInt();
    // String words[] = line.split(" ");
    // HashMap<String, Integer> map = new HashMap<>();
    // for(String word : words){
    // if(map.containsKey(word)){
    // map.put(word, map.get(word)+1);
    // }else{
    // map.put(word, 1);
    // }
    // }
    // for(String w : map.keySet()){
    // if(map.get(w) >= n)System.out.print(w+" ");
    // }

    // }
        static int x =4 ;
    public static void main(String[] args) {
        // StringJoiner mystring = new StringJoiner(",", "(",")");
        for(int x = 5;x<10;x++){
            x++;
        }
        System.out.println(x--);
    }
    static boolean isVowel(char c) {
        return (c == 'a' || c == 'A' || c == 'e'|| c == 'E' || c == 'i' || c == 'I'|| c == 'o' || c == 'O' || c == 'u'|| c == 'U');
    }
   

    public static int nun(int n) {
        if (n == 0 || n == 1) {
            return 1;
        } else {
            return n * nun(n - 1);
        }
    }

    public static int dtob(int n) {
        int rv = 0;
        int p = 1;
        while (n > 0) {
            int d = n % 2;
            n = n / 2;
            rv += p * d;
            p = p * 10;
        }
        return rv;
    }

    static int btod(int n) {
        int num = n;
        int dValue = 0;
        int b = 1;
        int temp = num;
        while (temp > 0) {
            int last_digit = temp % 10;
            temp = temp / 10;
            dValue += last_digit * b;
            b = b * 2;
        }
        return dValue;
    }

    static int charity(int input1) {
        int ans = 0;
        for (int i = 1; i <= input1; i++) {
            ans += (int) Math.pow(i, 2);
        }
        return ans;

    }


    static int sum(int input1, int[] input2){
        Arrays.sort(input2);
        return input2[0]+input2[input1-1];
    }




    static int maxArray(int input1, int[] input2){
        int maxf = Integer.MIN_VALUE, maxe = 0;
        for (int i = 0; i < input1; i++)
        {
            maxe = maxe + input2[i];
            if (maxf < maxe) maxf = maxe;
            if (maxe < 0)maxe = 0;
        }
        return maxf;
    }
}