import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.locks.ReentrantLock;

// The class for storing objects in a data base
public class DataBase {

	// HashMap for storing keys and values
	private ConcurrentHashMap<String, MyContainer> myHash;
	ReentrantLock lock;
	
	// Put the value, we use self-made container for storing time stamps and life times, I assume the lifetime is given in seconds so we multiply it
	boolean put(String key, Object obj, long lifetime){
		
		// Tmp object to store to hashmap and compare with return valus
		MyContainer tmp = new MyContainer(obj, System.currentTimeMillis(), (lifetime * 1000));
		
		myHash.put(key, tmp);
		return true;
		
	}
	
	// Get the Object associated with key
	Object get(String key){
		
		MyContainer tmp = myHash.get(key);
		
		if(tmp == null) return null;
		
		long current = System.currentTimeMillis();
		
		// If 0 - we return as it lives forever
		if(tmp.getHowLong() == 0){
			return tmp.getData();
		}
		// If the time has been exceeded - we remove the object
		else if(current > ( tmp.getTimeStamp() + tmp.getHowLong() ) ){
			myHash.remove(key);
			return null;
		}
		
		// If not - we return the object
		return tmp.getData();
	}
	
	
	
	public DataBase(){
		this.setMyHash(new ConcurrentHashMap<String, MyContainer>());
	}

	public ConcurrentHashMap<String, MyContainer> getMyHash() {
		return myHash;
	}

	public void setMyHash(ConcurrentHashMap<String, MyContainer> myHash) {
		this.myHash = myHash;
	}
}
