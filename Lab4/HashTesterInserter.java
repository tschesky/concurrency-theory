class HashTesterInserter implements Runnable {

	private DataBase data;
	private int count;
	private RandomString gen;
	
	// Parameter is the number of objects to be deleted
	 public HashTesterInserter(DataBase d, int c, int l) {
		this.data = d;
		this.count = c;
		this.gen = new RandomString(l);
	 }

	 @Override
	 public void run() {
		 for(int i = 1; i <= count; i++){
			 data.put(gen.nextString() , new Object(), i % 20);
		 }
	 }
}