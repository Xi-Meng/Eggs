import java.util.Scanner;

//TIP 要<b>运行</b>代码，请按 <shortcut actionId="Run"/> 或
// 点击装订区域中的 <icon src="AllIcons.Actions.Execute"/> 图标。
public class Main {
    public static void main(String[] args) {
        Scanner in=new Scanner(System.in);
        int n=in.nextInt();
        int []start=new int[n];
        int []finish=new int[n];
        for (int i = 0; i <n ; i++) {
            start[i]=in.nextInt();
            finish[i]=in.nextInt();
        }
        //建立小顶堆
       int []heap=new int[10000];
        int size=0;
        for (int i = 0; i <n ; i++) {
            insert(finish[i],heap,size);
        }
        //开始判断
        int answer=0;
        //推出来头
        int top=pop(heap,size);
        answer++;
        int temp=0;
        while (size!=0){
            temp=pop(heap,size);
            if (temp)
        }
    }
    public static void insert(int a,int []heap,int size){
        heap[size++]=a;
        int b=size;
        while (b!=0){
            if (heap[b/2]>a){
                //交换
                int temp= heap[b/2];
                heap[b]=temp;
                heap[b/2]=a;
                b=b/2;
            }
            else break;
        }
    }
    public static int pop(int []heap,int size){
        int x=heap[0];
        //交换头尾
        heap[0]=heap[size];
        heap[size--]=x;
        int b=0;
        while (b!=(size+1)){
            //判断左右儿子哪个大
            if (heap[b*2]<heap[b*2+1]&&heap[b]>heap[b*2]){
                int temp= heap[b*2];
                heap[b]=temp;
                heap[b*2]=x;
                b=b*2;
            }
            else if (heap[b*2]>=heap[b*2+1]&&heap[b]>heap[b*2+1]){
                int temp= heap[b*2+1];
                heap[b]=temp;
                heap[b*2+1]=x;
                b=b*2+1;
            }
            else {
                break;
            }

        }
    }
}
