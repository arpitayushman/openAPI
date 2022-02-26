#include<bits/stdc++.h>
using namespace std;
int main(){
    int x = 5, y = 6;
    int ans = 0;
    while(y!=0){
        ans =ans+x;
        y -=1;
    }
    cout<<ans;
    return 0;
}