int i=0;
int jiju=0;
double ans=0;

char pattern60[] = input.toCharArray();

for(int ab=0; ab < pattern60.length; ab++)
    {
  if(pattern60[ab]=='+')
        {
    i= Integer.parseInt(input.substring(0,ab));
    jiju= Integer.parseInt(input.substring(ab+1,pattern60.length));
    ans = (double)i+jiju;
  }else if(pattern60[ab]=='-')
        {
    i= Integer.parseInt(input.substring(0,ab));
    jiju= Integer.parseInt(input.substring(ab+1,pattern60.length));
    ans = (double)i-jiju;
  }else if(pattern60[ab]=='/')
        {
    i= Integer.parseInt(input.substring(0,ab));
    jiju= Integer.parseInt(input.substring(ab+1,pattern60.length));
    ans = (double)i/jiju;
  }else if(pattern60[ab]=='*')
        {
    i= Integer.parseInt(input.substring(0,ab));
    jiju= Integer.parseInt(input.substring(ab+1,pattern60.length));
    ans = (double)i*jiju;
  }
}  

System.out.print(input+" = " + Math.round(ans));