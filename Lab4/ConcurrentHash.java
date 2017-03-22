public class ConcurrentHash {

	final static int poolSize = 30;
	
	public static void main(String[] args) {
		
		DataBase test = new DataBase();
		
		Thread InserterPool[] = new Thread[poolSize]; 
		Thread DeleterPool[] = new Thread[poolSize]; 
		
		for(int i = 0; i < poolSize; i++){
			InserterPool[i] = new Thread(new HashTesterInserter(test, 1000, 3));	
			DeleterPool[i] = new Thread(new HashTesterGetter(test, 1000, 3));	
		}
		
		for(int i = 0; i < poolSize; i++){
			InserterPool[i].start();
			DeleterPool[i].start();
		}
		
		for(int i = 0; i < poolSize; i++){
			try{
				InserterPool[i].join();
				DeleterPool[i].join();
			} catch(InterruptedException e){
				e.printStackTrace();
			}
		}
		
	}
	
	

}
