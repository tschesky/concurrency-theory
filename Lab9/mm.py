import os, sys, re
from multiprocessing import Pool 

# Create queue of directories to walk (abs. paths)
def createFilePathQueue( root_path):
	# Result list, walk the tree
	out = list()
	folders = os.walk( root_path, topdown=True, onerror=None, followlinks=False)
	# Append folders
	for folder in folders:
		dirpath, dirnames, filenames = folder
		for filename in filenames:
			absolute_filepath = os.path.join( dirpath, filename)
			out.append( absolute_filepath)
	return out

# Seek regex in gives file, get filename and regex, return filename and result liness 
def seekInFile( args):
	search_regex, filename = args
	regex = re.compile( search_regex)
	fd = open( filename, 'r')
	content = fd.read()
	fd.close()
	matched_lines_numbers = list()
	for idx, line in enumerate( content.split('\n')):
		for match in regex.finditer( line):
			matched_lines_numbers.append( idx)
	return filename, matched_lines_numbers

# Main
if __name__ == '__main__':
	# Check args
	if len(sys.argv) == 3:
		# Get the absolute value of start path and regex
		root_path = os.path.abspath(sys.argv[1])
		search_regex = sys.argv[2]
		# Queue the directories
		filelist = createFilePathQueue(root_path)
		# Worker process pool
		pool = Pool(8)
		# Get the pool working
		results = pool.map( seekInFile , [ (search_regex, filename) for filename in filelist])
		# Print results
		for match in results:
			filename, lines = match
			if len(lines) != 0:
				print(filename)
				for line_number in lines:
					print( 'Match in line:', line_number)
	
	# Quit if wrong args
	else:
		print ("Usage: python", sys.argv[0], 'ROOT_PATH SEARCH_REGEX')
		sys.exit(1)