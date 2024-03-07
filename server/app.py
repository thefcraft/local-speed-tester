from flask import Flask, Response, request
import numpy as np
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.before_request
def handle_preflight():
    if request.method == "OPTIONS":
        res = Response()
        res.headers['X-Content-Type-Options'] = '*'
        return res

def generate_data(size_in_mb):
    chunk_size = 256 * 1024 * 1024  # 256 MB chunk size
    size_in_bytes = size_in_mb * 1024 * 1024
    
    # Generate a chunk of 256MB zero data
    current_chunk_size = min(chunk_size, size_in_bytes)
    zero_data_chunk = np.zeros(current_chunk_size, dtype=np.uint8)
    
    
    # Generate and send data in chunks
    while size_in_bytes > 0:
        # Calculate the size of the current chunk
        current_chunk_size = min(chunk_size, size_in_bytes)
        # Generate a chunk of zero data
        if current_chunk_size != chunk_size:    
            zero_data_chunk = np.zeros(current_chunk_size, dtype=np.uint8)
        # Send the chunk as part of the response
        yield zero_data_chunk.tobytes()
        # Update the remaining size
        size_in_bytes -= current_chunk_size


@app.route('/api/data/<int:size_in_mb>')
def check_speed(size_in_mb):
    # Send the binary data as a response
    return Response(generate_data(size_in_mb), mimetype='application/octet-stream', headers={'Content-Disposition': f'attachment; filename=zeros.bytes'})


@app.route('/api/ping/')
def ping():
    return {"data": True}

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)