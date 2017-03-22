public class MyContainer {
	
	private Object data;
	private long timeStamp;
	private long howLong;
	
	// Constructor for my object
	public MyContainer(Object d, long t1, long t2){
		this.setData(d);
		this.setTimeStamp(t1);
		this.setHowLong(t2);
	}

	// Overridden equals method
	public boolean equals(MyContainer other){
		if( this.getData().equals(other.getData()) && this.getTimeStamp() == other.getTimeStamp() && this.getHowLong() == other.getHowLong() ) return true;
		else return false;
		
	}
	
	// Standard setters and getter
	public Object getData() {
		return data;
	}


	public void setData(Object data) {
		this.data = data;
	}


	public double getTimeStamp() {
		return timeStamp;
	}


	public void setTimeStamp(long timeStamp) {
		this.timeStamp = timeStamp;
	}


	public long getHowLong() {
		return howLong;
	}


	public void setHowLong(long howLong) {
		this.howLong = howLong;
	}
	

}
